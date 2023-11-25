import { Controller, HttpStatus, Res, Get, Param } from '@nestjs/common';
import { Gender } from './gender.schema';
import { GenderService } from './gender.service';

@Controller('gender')
export class GenderController {

    constructor(private readonly genderService: GenderService) { }

    @Get()
    async getAll(@Res() res: any): Promise<Gender[]> {
        try {
            let gender = await this.genderService.getGender();
            return await res.status(HttpStatus.OK).send(gender);
        } catch {
            return res.status(HttpStatus.NOT_FOUND).send('Gender not found');
        }
    }

    @Get(':type')
    async getGender(@Res() res: any,
        @Param('type') type: string): Promise<Gender[]> {
        try {
            let gender = await this.genderService.getByGenderType(type);
            return await res.status(HttpStatus.OK).send(gender);
        } catch {
            return res.status(HttpStatus.NOT_FOUND).send('Gender type not found');
        }
    }
};