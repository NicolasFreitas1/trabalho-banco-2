import { DocumentType } from '@prisma/client';

export class DocumentTypeEntity implements DocumentType {
    /**
     * Id do tipo de documento
     */
    id: number;

    /**
     * Nome do tipo de documento
     */
    name: string;

    /**
     * Descrição do tipo de documento
     */
    description: string;

    constructor(partial: Partial<DocumentTypeEntity>) {
        Object.assign(this, partial);
    }
}
