import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './auth/jwt.strategy';
import { VillagersModule } from './villagers/villagers.module';
import { SpeciesModule } from './species/species.module';
import { GenderModule } from './gender/gender.module';
import { PersonalityModule } from './personality/personality.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/AnimalCrossing'),
    AuthModule,
    UsersModule,
    VillagersModule,
    SpeciesModule,
    GenderModule,
    PersonalityModule],
  controllers: [AppController],

  providers: [AppService, JwtAuthGuard],
})
export class AppModule { }