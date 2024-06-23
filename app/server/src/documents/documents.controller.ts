import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDescriptionDto } from './dto/update-document-decription.dto';
import { DocumentEntity } from './entities/document.entity';

@Controller('documents')
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) {}

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
                description: {
                    type: 'string',
                },
                ownerId: {
                    type: 'number',
                },
                typeId: {
                    type: 'number',
                },
            },
        },
    })
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
            }),
        }),
    )
    async create(
        @Body() createDocumentDto: CreateDocumentDto,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<DocumentEntity> {
        return this.documentsService.create(createDocumentDto, file);
    }

    @Get()
    findAll() {
        return this.documentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.documentsService.findOne(+id);
    }

    @Put(':id/new-version')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
                description: {
                    type: 'string',
                },
                ownerId: {
                    type: 'number',
                },
                typeId: {
                    type: 'number',
                },
            },
        },
    })
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
            }),
        }),
    )
    updateVersion(
        @Param('id') id: string,
        @Body() createDocumentDto: CreateDocumentDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.documentsService.update(+id, createDocumentDto, file);
    }

    @Patch(':id/description')
    update(
        @Param('id') id: string,
        @Body() updateDocumentDescriptionDto: UpdateDocumentDescriptionDto,
    ) {
        return this.documentsService.updateDescription(
            +id,
            updateDocumentDescriptionDto,
        );
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.documentsService.remove(+id);
    }
}
