import { Module } from '@nestjs/common';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';
import { Species, SpeciesSchema } from './species.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Villager, VillagerSchema } from 'src/villagers/villagers.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Species.name,
      schema: SpeciesSchema,
    },
    {
      name: Villager.name,
      schema: VillagerSchema
    }
  ]),
  ],
  controllers: [SpeciesController],
  providers: [SpeciesService]
})
export class SpeciesModule { }
