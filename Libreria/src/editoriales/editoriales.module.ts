import { Module } from '@nestjs/common';
import { EditorialesService } from './services/editoriales/editoriales.service';
import { EditorialesController } from './controllers/editoriales/editoriales.controller';
import { Editorial } from 'src/typeorm/etities/Editoriales';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Editorial])],
  providers: [EditorialesService],
  controllers: [EditorialesController],
})
export class EditorialesModule {}
