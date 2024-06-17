import { IsEmail, IsEnum, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    password: string

    @IsString()
    @IsEnum(["admin", "user"])
    type: "admin" | "user"
}
