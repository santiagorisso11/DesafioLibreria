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
import { ActualizarLibroDto } from 'src/libros/dtos/ActualizarLibro.dto';
import { BuscarLibroDto } from 'src/libros/dtos/BuscarLibro.dto';
import { CrearLibroDto } from 'src/libros/dtos/CrearLibro.dto';
import { LibrosService } from 'src/libros/services/libros/libros.service';

@Controller('libros')
export class LibroController {
  constructor(private libroService: LibrosService) {}

  //MOSTRAR LIBROS
  @Get()
  async buscarLibros() {
    return this.libroService.buscarLibros();
  }

  //MOSTRAR LIBROS CON CATEGORIA LITERARIA
  @Get('/filtrar')
  async buscarLibrosPorCat(@Body() buscarLibroDto: BuscarLibroDto) {
    return this.libroService.buscarLibrosPorCatLit(
      buscarLibroDto.categoriaLiteraria,
    );
  }

  //CREAR LIBRO
  @Post()
  async crearLibro(@Body(new ValidationPipe()) CrearLibroDto: CrearLibroDto) {
    await this.libroService.crearLibro(CrearLibroDto);
    return `Se creo el libro`;
  }

  //ACUTALIZAR LIBRO
  @Put(':idLibro')
  async actualizarLibroPorId(
    @Param('idLibro', ParseIntPipe) idLibro: number,
    @Body() actualizarLibroDto: ActualizarLibroDto,
  ) {
    await this.libroService.actualizarLibro(idLibro, actualizarLibroDto);
    return `Se actualizo los datos del libro`;
  }

  //ELIMINAR LIBRO
  @Delete(':idLibro')
  async eliminarLibroPorId(@Param('idLibro', ParseIntPipe) idLibro: number) {
    await this.libroService.eliminarLibro(idLibro);
    return 'Se elimino el libro';
  }
}
