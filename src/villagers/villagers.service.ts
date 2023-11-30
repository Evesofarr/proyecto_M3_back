import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Villager, VillagerDocument } from './villagers.schema';
import { Model } from 'mongoose';

@Injectable()
export class VillagersService {

    constructor(
        @InjectModel(Villager.name) private villagerModel: Model<VillagerDocument>,
    ) { }

    async getVillagers(): Promise<Villager[]> {
        return await this.villagerModel.find();
    }

    async getVillagerByName(name: string): Promise<Villager[]> {
        return await this.villagerModel.findOne({ name: name });
    }

    async getVillagerById(id: string): Promise<Villager[]> {
        return await this.villagerModel.findOne({ id: id });
    }
};
