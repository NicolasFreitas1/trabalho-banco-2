import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from 'src/database/prisma.service';
import { TagEntity } from './entities/tag.entity';

@Injectable()
export class TagService {
    constructor(private prisma: PrismaService) {}

    async create(createTagDto: CreateTagDto): Promise<TagEntity> {
        return this.prisma.tag.create({
            data: createTagDto,
        });
    }

    async findAll(): Promise<TagEntity[]> {
        return this.prisma.tag.findMany();
    }

    async findOne(id: number): Promise<TagEntity> {
        const tag = await this.prisma.tag.findUnique({
            where: { id },
        });

        if (!tag) {
            throw new NotFoundException(`Tag with id ${id} not found`);
        }

        return tag;
    }

    async update(id: number, updateTagDto: UpdateTagDto): Promise<TagEntity> {
        const tagExists = await this.prisma.tag.findUnique({
            where: { id },
        });

        if (!tagExists) {
            throw new NotFoundException(`Tag with id ${id} not found`);
        }

        return this.prisma.tag.update({
            where: { id },
            data: updateTagDto,
        });
    }

    async remove(id: number): Promise<TagEntity> {
        const tagExists = await this.prisma.tag.findUnique({
            where: { id },
        });

        if (!tagExists) {
            throw new NotFoundException(`Tag with id ${id} not found`);
        }

        return this.prisma.tag.delete({
            where: { id },
        });
    }
}
