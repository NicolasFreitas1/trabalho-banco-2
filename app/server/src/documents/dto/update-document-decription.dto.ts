import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateDocumentDto } from './create-document.dto';

export class UpdateDocumentDescriptionDto extends PartialType(
    CreateDocumentDto,
) {
    @IsOptional()
    @IsString()
    description: string;
}
