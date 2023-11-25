import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gender, GenderDocument } from './gender.schema';
import { Villager, VillagerDocument } from 'src/villagers/villagers.schema';

@Injectable()
export class GenderService {
    constructor(
        @InjectModel(Gender.name) private genderModel: Model<GenderDocument>,
        @InjectModel(Villager.name) private villagerModel: Model<VillagerDocument>
    ) { }

    async getGender(): Promise<Gender[]> {
        return await this.genderModel.find();
    }

    async getByGenderType(type: string): Promise<Gender[]> {
        return await this.villagerModel.find({ gender: type });
    }
};
