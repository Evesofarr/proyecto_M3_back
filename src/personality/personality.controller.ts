import { Controller, HttpStatus, Res, Get, Param } from '@nestjs/common';
import { Personality } from './personality.schema';
import { PersonalityService } from './personality.service';
import { Villager } from 'src/villagers/villagers.schema';

@Controller('personality')
export class PersonalityController {

    constructor(private readonly personalityService: PersonalityService) { }

    @Get()
    async getAll(@Res() res: any): Promise<Personality[]> {
        try {
            let personality = await this.personalityService.getPersonality();
            return await res.status(HttpStatus.OK).send(personality);
        } catch {
            return res.status(HttpStatus.NOT_FOUND).send('Personality not found');
        }
    }

    @Get(':type')
    async getPersonality(@Res() res: any,
        @Param('type') type: string): Promise<Villager[]> {

        try {
            let personality = await this.personalityService.getPersonalityType(type);
            return await res.status(HttpStatus.OK).send(personality);
        } catch {
            return res.status(HttpStatus.NOT_FOUND).send('Personality type not found');
        }
    }
};