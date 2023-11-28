import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Personality, PersonalityDocument } from './personality.schema';
import { Villager, VillagerDocument } from 'src/villagers/villagers.schema';

@Injectable()
export class PersonalityService {
    constructor(
        @InjectModel(Personality.name) private personalityModel: Model<PersonalityDocument>,
        @InjectModel(Villager.name) private villagerModel: Model<VillagerDocument>
    ) { }

    async getPersonality(): Promise<Personality[]> {
        return await this.personalityModel.find();
    }

    async getPersonalityType(type: string): Promise<Villager[]> {

        let pers = await this.villagerModel.find({ personality: type });
        return pers;

    }
};
