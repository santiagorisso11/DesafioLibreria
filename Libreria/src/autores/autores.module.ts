import { Module } from '@nestjs/common';
import { AutoresController } from './controllers/autores/autores.controller';
import { AutoresService } from './services/autores/autores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Autor } from 'src/typeorm/etities/Autores';

@Module({
  imports: [TypeOrmModule.forFeature([Autor])],
  controllers: [AutoresController],
  providers: [AutoresService],
})
export class AutoresModule {}
