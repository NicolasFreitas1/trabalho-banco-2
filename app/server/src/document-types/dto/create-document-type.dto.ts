import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateDocumentTypeDto {
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    name: string;

    @IsString()
    @MinLength(3)
    description: string;
}
