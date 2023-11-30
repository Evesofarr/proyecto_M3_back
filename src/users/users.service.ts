import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from './users.schema';
import { Model } from 'mongoose';
import { UsersDto } from './dto/users.dto';
import { Villager, VillagerDocument } from 'src/villagers/villagers.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UsersDocument>,
        @InjectModel(Villager.name) private villagerModel: Model<VillagerDocument>
    ) { };

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

    async updateFavorite(userId: string, _id: string) {
        console.log(userId);

        try {
            const userData = await this.userModel.findById(userId);

            if (!userData) {
                console.error("User not found");
                return null;
            }

            let newTempFavList = [];


            if (userData.faved.includes(_id)) {
                newTempFavList = userData.faved.filter(id => id !== _id);
                console.log("if", newTempFavList);

            } else {

                newTempFavList = [...userData.faved, _id];
                console.log("else", newTempFavList);

            }
            console.log(newTempFavList);

            const updatedUser = await this.userModel.findByIdAndUpdate(
                userId,
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

    async getFavorites(userId: string): Promise<Villager[] | []> {
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }

        const favorites = await this.villagerModel.find({ id: { $in: user.faved } }).lean();

        // db.miColeccion.find({
        //     miCampo: { $in: valoresFiltro }
        // });

        return favorites || [];
    }
}
