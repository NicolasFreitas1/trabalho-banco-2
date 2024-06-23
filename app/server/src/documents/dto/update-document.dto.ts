import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDocumentDto } from './create-document.dto';

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {
    @ApiProperty({ description: 'Descrição do documento' })
    description?: string;

    @ApiProperty({ description: 'Id do dono do documento' })
    ownerId?: number;

    @ApiProperty({ description: 'Id do tipo do documento' })
    typeId?: number;
}
