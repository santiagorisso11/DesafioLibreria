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
import { ActualizarEditorialDto } from 'src/editoriales/dtos/ActualizarEditorial.dto';
import { CrearEditorialDto } from 'src/editoriales/dtos/CrearEditorial.dto';
import { EditorialesService } from 'src/editoriales/services/editoriales/editoriales.service';

@Controller('editoriales')
export class EditorialesController {
  constructor(private editorialesService: EditorialesService) {}

  //MOSTRAR EDITORIALES
  @Get()
  async buscarEditoriales() {
    const editoriales = await this.editorialesService.buscarEditoriales();
    return editoriales;
  }

  //CARGAR EDITORIAL
  @Post()
  async crearEditorial(
    @Body(new ValidationPipe()) CrearEditorialDto: CrearEditorialDto,
  ) {
    await this.editorialesService.crearEditorial(CrearEditorialDto);
    return `Se creao la editorial`;
  }

  //ACTUALIZAR DATOS DE EDITORIAL POR ID
  @Put(':idEditorial')
  async actualizarEDitorialPorId(
    @Param('idEditorial', ParseIntPipe) idEditorial: number,
    @Body(new ValidationPipe()) actualizarEditorialDto: ActualizarEditorialDto,
  ) {
    await this.editorialesService.actualizarEditorial(
      idEditorial,
      actualizarEditorialDto,
    );
    return `Se actualizo los datos de la editorial`;
  }

  //ELIMINAR EDITORIAL POR ID
  @Delete(':idEditorial')
  async eliminarEditorialPorId(
    @Param('idEditorial', ParseIntPipe) idEditorial: number,
  ) {
    await this.editorialesService.eliminarEditorial(idEditorial);
    return 'Se elimino la editorial';
  }
}
