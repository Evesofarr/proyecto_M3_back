import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from './users.schema';
import { Model } from 'mongoose';
import { UsersDto } from './dto/users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UsersDocument>) { };

    async getUsers(): Promise<User[]> {
        return await this.userModel.find();
    }

    async findOne(credentials: { username: string, password: string; }): Promise<User> {
        const { username, password } = credentials;
        return await this.userModel.findOne({ username, password }).lean();
    }

    async createUser(body: UsersDto): Promise<User> {
        const newUser = new this.userModel(body);
        return await newUser.save();
    }
}
