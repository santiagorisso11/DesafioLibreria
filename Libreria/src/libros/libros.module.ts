import { Module } from '@nestjs/common';
import { LibroController } from './controllers/libros/libros.controller';
import { LibrosService } from './services/libros/libros.service';
import { Libro } from 'src/typeorm/etities/Libros';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Editorial } from 'src/typeorm/etities/Editoriales';
import { Autor } from 'src/typeorm/etities/Autores';

@Module({
  imports: [TypeOrmModule.forFeature([Libro, Editorial, Autor])],
  controllers: [LibroController],
  providers: [LibrosService],
})
export class UsersModule {}
