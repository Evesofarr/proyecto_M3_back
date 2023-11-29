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

    async findUserByUsername(username: string): Promise<User | null> {
        return await this.userModel.findOne({ username }).exec();
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return await this.userModel.findOne({ email }).exec();
    }

    async updateFavorite(username, _id) {
        try {
            const userData = await this.userModel.find({ username: username });

            if (!userData || userData.length === 0) {
                console.error("User not found");
                return null;
            }

            let newTempFavList;

            console.log(userData[0].faved);
            if (userData[0].faved.includes(_id)) {
                newTempFavList = userData[0].faved.filter(id => id.toString() !== id.toString());
            } else {
                newTempFavList = [...userData[0].faved, _id];
            }
            console.log(newTempFavList);


            const updatedUser = await this.userModel.findOneAndUpdate(
                { username: username },
                { faved: newTempFavList },
                { new: true, select: 'username faved' }
            );

            console.log("User updated:", updatedUser);

            return updatedUser;
        } catch (error) {
            console.error("Error updating user:", error);
            return null;
        }
    }
}
