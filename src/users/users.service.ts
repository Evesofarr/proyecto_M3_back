import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from './users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UsersDocument>) { };

    async findOne(username: string): Promise<User> {
        return await this.userModel.findOne({ username: username });
    }
}
