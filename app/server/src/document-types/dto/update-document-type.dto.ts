import { PartialType } from '@nestjs/swagger';
import { CreateDocumentTypeDto } from './create-document-type.dto';
import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class UpdateDocumentTypeDto extends PartialType(CreateDocumentTypeDto) {
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    name: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    description: string;
}
