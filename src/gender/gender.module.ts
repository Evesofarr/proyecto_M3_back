import { Module } from '@nestjs/common';
import { GenderController } from './gender.controller';
import { GenderService } from './gender.service';
import { Gender, GenderSchema } from './gender.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Villager, VillagerSchema } from 'src/villagers/villagers.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Gender.name,
      schema: GenderSchema,
    },
    {
      name: Villager.name,
      schema: VillagerSchema
    }
  ]),
  ],
  controllers: [GenderController],
  providers: [GenderService]
})
export class GenderModule { }
