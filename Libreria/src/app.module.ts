import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro } from './typeorm/etities/Libros';
import { UsersModule } from './libros/libros.module';
import { Editorial } from './typeorm/etities/Editoriales';
import { Autor } from './typeorm/etities/Autores';
import { AutoresModule } from './autores/autores.module';
import { EditorialesModule } from './editoriales/editoriales.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'testuser',
      password: 'testuser123',
      database: 'libreria',
      entities: [Libro, Editorial, Autor],
      synchronize: true,
    }),
    UsersModule,
    AutoresModule,
    EditorialesModule,
  ],
})
export class AppModule {}
