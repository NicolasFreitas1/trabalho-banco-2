import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    // Criando tags
    await prisma.tag.createMany({
        data: [
            { name: 'Tag1' },
            { name: 'Tag2' },
            { name: 'Tag3' },
            { name: 'Tag4' },
            { name: 'Tag5' },
            { name: 'Tag6' },
            { name: 'Tag7' },
            { name: 'Tag8' },
            { name: 'Tag9' },
            { name: 'Tag10' },
        ],
    });

    // Criando tipos de documentos
    await prisma.documentType.createMany({
        data: [
            { name: 'Tipo1', description: 'Descricao Tipo1' },
            { name: 'Tipo2', description: 'Descricao Tipo2' },
            { name: 'Tipo3', description: 'Descricao Tipo3' },
            { name: 'Tipo4', description: 'Descricao Tipo4' },
            { name: 'Tipo5', description: 'Descricao Tipo5' },
            { name: 'Tipo6', description: 'Descricao Tipo6' },
            { name: 'Tipo7', description: 'Descricao Tipo7' },
            { name: 'Tipo8', description: 'Descricao Tipo8' },
            { name: 'Tipo9', description: 'Descricao Tipo9' },
            { name: 'Tipo10', description: 'Descricao Tipo10' },
        ],
    });

    // Criando usuários
    await prisma.user.createMany({
        data: [
            {
                name: 'Usuario1',
                email: 'usuario1@example.com',
                password: hashSync('senha1', 10),
            },
            {
                name: 'Usuario2',
                email: 'usuario2@example.com',
                password: hashSync('senha1', 10),
            },
            {
                name: 'Usuario3',
                email: 'usuario3@example.com',
                password: hashSync('senha1', 10),
            },
            {
                name: 'Usuario4',
                email: 'usuario4@example.com',
                password: hashSync('senha1', 10),
            },
            {
                name: 'Usuario5',
                email: 'usuario5@example.com',
                password: hashSync('senha1', 10),
            },
            {
                name: 'Usuario6',
                email: 'usuario6@example.com',
                password: hashSync('senha1', 10),
            },
            {
                name: 'Usuario7',
                email: 'usuario7@example.com',
                password: hashSync('senha1', 10),
            },
            {
                name: 'Usuario8',
                email: 'usuario8@example.com',
                password: hashSync('senha1', 10),
            },
            {
                name: 'Usuario9',
                email: 'usuario9@example.com',
                password: hashSync('senha1', 10),
            },
            {
                name: 'Usuario10',
                email: 'usuario10@example.com',
                password: hashSync('senha1', 10),
            },
        ],
    });

    // Criando coleções
    await prisma.collection.createMany({
        data: [
            {
                name: 'Pasta1',
                description: 'Descricao Pasta1',
                parentCollectionId: 1,
                onwerId: 1,
            },
            {
                name: 'Pasta2',
                description: 'Descricao Pasta2',
                parentCollectionId: 1,
                onwerId: 2,
            },
            {
                name: 'Pasta3',
                description: 'Descricao Pasta3',
                parentCollectionId: 1,
                onwerId: 3,
            },
            {
                name: 'Pasta4',
                description: 'Descricao Pasta4',
                parentCollectionId: 1,
                onwerId: 4,
            },
            {
                name: 'Pasta5',
                description: 'Descricao Pasta5',
                parentCollectionId: 1,
                onwerId: 5,
            },
            {
                name: 'Pasta6',
                description: 'Descricao Pasta6',
                parentCollectionId: 1,
                onwerId: 6,
            },
            {
                name: 'Pasta7',
                description: 'Descricao Pasta7',
                parentCollectionId: 1,
                onwerId: 7,
            },
            {
                name: 'Pasta8',
                description: 'Descricao Pasta8',
                parentCollectionId: 1,
                onwerId: 8,
            },
            {
                name: 'Pasta9',
                description: 'Descricao Pasta9',
                parentCollectionId: 1,
                onwerId: 9,
            },
            {
                name: 'Pasta10',
                description: 'Descricao Pasta10',
                parentCollectionId: 1,
                onwerId: 10,
            },
        ],
    });

    // Criando versões de documentos
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
