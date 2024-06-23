import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { PrismaService } from 'src/database/prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDescriptionDto } from './dto/update-document-decription.dto';

@Injectable()
export class DocumentsService {
    constructor(private prisma: PrismaService) {}

    async create(
        createDocumentDto: CreateDocumentDto,
        file: Express.Multer.File,
    ) {
        const { description, typeId, ownerId } = createDocumentDto;

        const { originalname, path } = file;

        /**
         *  INSERT INTO documento (nome, descricao, caminho_arquivo, dt_criacao, dt_modificacao, id_propretario, id_tipo_documento)
         *  VALUES ($1, $2, $3, NOW(), NOW(), $4, $5)
         *  RETURNING *;
         *
         */
        const document = await this.prisma.document.create({
            data: {
                description,
                name: originalname,
                path,
                typeId: Number(typeId),
                ownerId: Number(ownerId),
            },
        });

        return document;
    }

    async findAll() {
        /**
         * SELECT * FROM documento;
         */
        return this.prisma.document.findMany();
    }

    async findOne(id: number) {
        /**
         *  SELECT d.*
         *  FROM documento d
         *  WHERE d.id_documento = $1;
         */
        const document = await this.prisma.document.findUnique({
            where: { id },
        });

        if (!document) {
            throw new NotFoundException(`Document with id ${id} not found`);
        }

        const filePath = path.join(process.env.SAVED_PATH, document.path); // Substitua 'path_para_os_arquivos' pelo caminho correto
        const base64File = fs.readFileSync(filePath, { encoding: 'base64' });

        return {
            ...document,
            base64File,
        };
    }

    async update(
        id: number,
        createDocumentDto: CreateDocumentDto,
        file: Express.Multer.File,
    ) {
        /**
         *  SELECT d.*
         *  FROM documento d
         *  WHERE d.id_documento = $1;
         */
        const document = await this.prisma.document.findUnique({
            where: {
                id,
            },
        });

        if (!document) {
            throw new NotFoundException(`Document with id ${id} not found`);
        }

        /**
         *  SELECT *
         *  FROM versao
         *  WHERE id_documento = $1;
         */
        const documentVersions = await this.prisma.version.findMany({
            where: {
                documentId: document.id,
            },
        });

        const documentNumberVersions = documentVersions.map(
            (d) => d.versionNumber,
        );

        const { path } = file;

        const newVersion = await this.prisma.version.create({
            data: {
                documentId: document.id,
                description: createDocumentDto.description,
                path,
                versionNumber: Math.max(...documentNumberVersions),
            },
        });

        return newVersion;
    }

    async updateDescription(
        id: number,
        updateDocumentDescriptionDto: UpdateDocumentDescriptionDto,
    ) {
        const documentExists = await this.prisma.document.findUnique({
            where: {
                id,
            },
        });

        if (!documentExists) {
            throw new NotFoundException(`Document with id ${id} not found`);
        }

        /**
         *  UPDATE documento
         *  SET descricao = $1
         *  WHERE id_documento = $2
         *  RETURNING *;
         */
        return this.prisma.document.update({
            data: {
                description: updateDocumentDescriptionDto.description,
            },
            where: {
                id,
            },
        });
    }

    async remove(id: number) {
        const document = await this.prisma.document.findUnique({
            where: { id },
        });

        if (!document) {
            throw new NotFoundException(`Document with ID ${id} not found.`);
        }

        const filePath = path.join(process.env.SAVED_PATH, document.path); // Sub
        try {
            fs.unlinkSync(filePath); // Remove o arquivo sincronamente
        } catch (error) {
            console.error(`Error deleting file ${filePath}:`, error);
        }

        /**
         *  DELETE FROM documento
         *  WHERE id_documento = $1
         *  RETURNING *;
         */

        await this.prisma.document.delete({
            where: { id },
        });
    }
}
