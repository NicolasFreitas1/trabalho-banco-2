import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';
import { UpdateDocumentTypeDto } from './dto/update-document-type.dto';
import { PrismaService } from 'src/database/prisma.service';
import { DocumentTypeEntity } from './entities/document-type.entity';

@Injectable()
export class DocumentTypesService {
    constructor(private prisma: PrismaService) {}

    async create(
        createDocumentTypeDto: CreateDocumentTypeDto,
    ): Promise<DocumentTypeEntity> {
        return this.prisma.documentType.create({
            data: createDocumentTypeDto,
        });
    }

    async findAll(): Promise<DocumentTypeEntity[]> {
        return this.prisma.documentType.findMany();
    }

    async findOne(id: number): Promise<DocumentTypeEntity> {
        const documentType = await this.prisma.documentType.findUnique({
            where: { id },
        });

        if (!documentType) {
            throw new NotFoundException(`DocumentType with id ${id} not found`);
        }

        return documentType;
    }

    async update(id: number, updateDocumentTypeDto: UpdateDocumentTypeDto) {
        const documentTypeExists = await this.prisma.documentType.findUnique({
            where: { id },
        });

        if (!documentTypeExists) {
            throw new NotFoundException(`DocumentType with id ${id} not found`);
        }

        return this.prisma.documentType.update({
            where: { id },
            data: updateDocumentTypeDto,
        });
    }

    async remove(id: number) {
        const documentTypeExists = await this.prisma.documentType.findUnique({
            where: { id },
        });

        if (!documentTypeExists) {
            throw new NotFoundException(`DocumentType with id ${id} not found`);
        }

        return this.prisma.documentType.delete({
            where: { id },
        });
    }
}
