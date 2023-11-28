import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) { }
    async validateUSer(username: string, password: string): Promise<any> {
        let user = await this.userService.findOne({ username, password });
        if (user && user.password === password) {
            //divido el objeto, dejo el password fuera del user y el resto lo meto en el result, me trae solo nombre de usuario y usuario, pero sin el password
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user: any) {
        const payload = { username: user.username, sub: user.userIde };
        return {
            access_token: this.jwtService.sign(payload),
            user
        };
    }
}
