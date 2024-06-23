import { PartialType } from '@nestjs/swagger';
import { CreateTagDto } from './create-tag.dto';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateTagDto extends PartialType(CreateTagDto) {
    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    name: string;
}
