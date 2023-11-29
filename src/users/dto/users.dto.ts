import { IsString } from "class-validator";

export class UsersDto {
    @IsString({ message: 'Esto no es un string' })
    name: string;
    @IsString({ message: 'Esto no es un string' })
    email: string;
    @IsString({ message: 'Esto no es un string' })
    username: string;
    @IsString({ message: 'Esto no es un string' })
    password: string;
    @IsString({ message: 'Esto no es un string' })
    faved: string[];
}
