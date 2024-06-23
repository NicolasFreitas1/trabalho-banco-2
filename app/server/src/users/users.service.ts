import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        const { email, name, password, type } = createUserDto;

        const hashedPassword = await this.hashPassword(password);

        const emailAlreadyInUse = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (emailAlreadyInUse) {
            throw new ConflictException('Email already in use');
        }

        const user = await this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                type,
            },
        });

        return new UserEntity({ ...user, password: undefined });
    }

    async findAll(): Promise<UserEntity[]> {
        const users = await this.prisma.user.findMany();

        return users.map(
            (user) => new UserEntity({ ...user, password: undefined }),
        );
    }

    async findOne(id: number): Promise<UserEntity> {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return new UserEntity({ ...user, password: undefined });
    }

    async update(
        id: number,
        updateUserDto: UpdateUserDto,
    ): Promise<UserEntity> {
        const userExists = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });

        if (!userExists) {
            throw new NotFoundException('User not found');
        }

        const user = await this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });

        return new UserEntity({ ...user, password: undefined });
    }

    remove(id: number): Promise<UserEntity> {
        return this.prisma.user.delete({ where: { id } });
    }

    private hashPassword(password: string): Promise<string> {
        const PASSWORD_ROUNDS = 10;
        return hash(password, PASSWORD_ROUNDS);
    }
}
