import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { AutoresService } from 'src/autores/services/autores/autores.service';
import { CrearAutorDto } from 'src/autores/dtos/CrearAutor.dto';
import { ActualizarAutorDto } from 'src/autores/dtos/ActualizarAutor.dto';

@Controller('autores')
export class AutoresController {
  constructor(private autoresService: AutoresService) {}

  //MOSTRAR TODOS LOS AUTORES
  @Get()
  async buscarAutores() {
    const autores = await this.autoresService.buscarAutores();
    return autores;
  }

  //CARGAR AUTOR
  @Post()
  async crearAutor(@Body(new ValidationPipe()) CrearAutorDto: CrearAutorDto) {
    await this.autoresService.crearAutor(CrearAutorDto);
    return `Se creo el autor`;
  }

  //MOSTRAR AUTOR POR ID
  @Put(':idAutor')
  async actualizarAutorPorId(
    @Param('idAutor', ParseIntPipe) idAutor: number,
    @Body(new ValidationPipe()) actualizarAutorDto: ActualizarAutorDto,
  ) {
    await this.autoresService.actualizarAutor(idAutor, actualizarAutorDto);
    return `Se realizo la actualizacion`;
  }

  //ELIMINAR AUTOR
  @Delete(':idAutor')
  async eliminarAutorPorId(@Param('idAutor', ParseIntPipe) idAutor: number) {
    await this.autoresService.eliminarAutor(idAutor);
    return 'Se elimino el Autor';
  }
}
