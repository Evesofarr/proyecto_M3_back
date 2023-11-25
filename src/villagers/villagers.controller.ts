import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { VillagersService } from './villagers.service';
import { Villager } from './villagers.schema';

@Controller('villagers')
export class VillagersController {
    constructor(private readonly villagersService: VillagersService) { }

    @Get()
    async getAll(@Res() res: any): Promise<Villager[]> {
        try {
            let villagers = await this.villagersService.getVillagers();
            return await res.status(HttpStatus.OK).send(villagers);
        } catch {
            return res.status(HttpStatus.NOT_FOUND).send('Villagers not found');
        }
    }

    @Get(':name')
    async getVillagerByName(@Res() res: any,
        @Param('name') name: string): Promise<Villager[]> {
        try {
            let villager = await this.villagersService.getVillagerByName(name);
            return await res.status(HttpStatus.OK).send(villager);
        } catch {
            return res.status(HttpStatus.NOT_FOUND).send('Villager not found');
        }
    }
};
