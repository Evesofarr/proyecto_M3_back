import { Controller, HttpStatus, Res, Get, Param } from '@nestjs/common';
import { Species } from './species.schema';
import { SpeciesService } from './species.service';
import { log } from 'console';
import { Villager } from 'src/villagers/villagers.schema';

@Controller('species')
export class SpeciesController {

    constructor(private readonly speciesService: SpeciesService) { }

    @Get()
    async getAll(@Res() res: any): Promise<Species[]> {
        try {
            let species = await this.speciesService.getSpecies();
            return await res.status(HttpStatus.OK).send(species);
        } catch {
            return res.status(HttpStatus.NOT_FOUND).send('Species not found');
        }
    }

    @Get('/:type')
    async getSpecies(@Res() res: any,
        @Param('type') type: string): Promise<Villager[]> {
        try {
            let species = await this.speciesService.getSpeciesType(type);
            return await res.status(HttpStatus.OK).send(species);
        } catch {
            return res.status(HttpStatus.NOT_FOUND).send({ msg: 'Species type not found' });
        }
    }
};