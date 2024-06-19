import { $Enums, User } from '@prisma/client';

export class UserEntity implements User {
    /**
     * Id do usuário
     */
    id: number;

    /**
     * Nome do usuário
     */
    name: string;

    /**
     * Email do usuário
     */
    email: string;

    /**
     * Senha do usuário
     */
    password: string;

    /**
     * Data de criação
     */
    createdAt: Date;

    /**
     * Tipo do usuário
     * @example ADMIN | USER
     */
    type: $Enums.UserType;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
