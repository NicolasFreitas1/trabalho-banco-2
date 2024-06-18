import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersService {
  constructor (private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const {email, name,password,type} = createUserDto
    
    const user = await this.prisma.usuario.create({
      data: {
        id_usuario: 1,
        nome: name,
        email,
        senha: password,
        tp_usuario: type
      }
    })

    return user
  }

  async findAll() {
    return this.prisma.usuario.findMany()
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
