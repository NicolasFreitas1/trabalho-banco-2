import { Document } from '@prisma/client';

export class DocumentEntity implements Document {
    /**
     * Id do documento
     */
    id: number;

    /**
     * Nome do documento
     */
    name: string;

    /**
     * Descrição do documento
     */
    description: string;

    /**
     * Caminho do arquivo do documento
     */
    path: string;

    /**
     * Data de criação do documento
     */
    createdAt: Date;

    /**
     * Data de atualização do documento
     */
    updatedAt: Date;

    /**
     * Id do proprietário do documento
     */
    ownerId: number;

    /**
     * Id do tipo do documento
     */
    typeId: number;
}
