import { Module } from '@nestjs/common';
import { VillagersController } from './villagers.controller';
import { VillagersService } from './villagers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VillagerSchema, Villager } from './villagers.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Villager.name,
      schema: VillagerSchema,
    },
  ]),
  ],
  controllers: [VillagersController],
  providers: [VillagersService]
})
export class VillagersModule { }