import { Body, Controller, HttpStatus, Post, Res, Get } from '@nestjs/common';
import { UsersDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { User } from './users.schema';

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async getAll(@Res() res: any): Promise<User[]> {
        try {
            let users = await this.usersService.getUsers();
            return await res.status(HttpStatus.OK).send(users);
        } catch {
            return res.status(HttpStatus.NOT_FOUND).send('No se han encontrado users');
        }
    }


    @Post("/register")
    async newUser(@Res() res: any,
        @Body() body: UsersDto): Promise<User> {
        try {
            const newUser = await this.usersService.createUser(body);
            return await res.status(HttpStatus.OK).send(newUser);
        } catch {
            return res.status(HttpStatus.BAD_REQUEST).send({ error: 'No se ha podido crear un nuevo user' });
        }
    }
}
