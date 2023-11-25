import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Species, SpeciesDocument } from './species.schema';
import { Villager, VillagerDocument } from 'src/villagers/villagers.schema';

@Injectable()
export class SpeciesService {
    constructor(
        @InjectModel(Species.name) private speciesModel: Model<SpeciesDocument>,
        @InjectModel(Villager.name) private villagerModel: Model<VillagerDocument>
    ) { }

    async getSpecies(): Promise<Species[]> {
        return await this.speciesModel.find();
    }

    async getSpeciesType(type: string): Promise<Species[]> {
        return await this.villagerModel.find({ species: type });
    }
};
