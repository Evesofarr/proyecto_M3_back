import { Module } from '@nestjs/common';
import { PersonalityController } from './personality.controller';
import { PersonalityService } from './personality.service';
import { Personality, PersonalitySchema } from './personality.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Villager, VillagerSchema } from 'src/villagers/villagers.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Personality.name,
      schema: PersonalitySchema,
    },
    {
      name: Villager.name,
      schema: VillagerSchema
    }
  ]),
  ],
  controllers: [PersonalityController],
  providers: [PersonalityService]
})
export class PersonalityModule { }
