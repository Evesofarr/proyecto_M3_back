import { Body, Controller, HttpStatus, Post, Res, Get, Put, Req } from '@nestjs/common';
import { UsersDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { User } from './users.schema';
import { JwtAuthGuard } from 'src/auth/jwt.strategy';

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
    async newUser(@Res() res: any, @Body() body: UsersDto): Promise<User> {
        try {
            const existingUser = await this.usersService.findUserByUsername(body.username);
            if (existingUser) {
                return res.status(HttpStatus.BAD_REQUEST).send({
                    "errorType": "usernameExists",
                    "message": "El nombre de usuario ya está en uso"
                });
            }
            const existingEmail = await this.usersService.findUserByEmail(body.email);
            if (existingEmail) {
                return res.status(HttpStatus.BAD_REQUEST).send({
                    "errorType": "emailExists",
                    "message": "El correo electrónico ya está registrado"
                });
            }
            const newUser = await this.usersService.createUser(body);
            return res.status(HttpStatus.OK).send(newUser);
        } catch (error) {
            console.error(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Error interno del servidor al crear un nuevo usuario' });
        }
    }

    @Put("updateFaved")
    async addCaputed(@Req() req: any, @Body() body: any) {
        try {
            return await this.usersService.updateFavorite(body.username, body.id);
        } catch (error) {

        }
    }
}
