import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentDto {
    @ApiProperty({ description: 'Descrição do documento' })
    description: string;

    @ApiProperty({ description: 'Id do dono do documento' })
    ownerId: number;

    @ApiProperty({ description: 'Id do tipo do documento' })
    typeId: number;
}
