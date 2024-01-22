import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Editorial } from 'src/typeorm/etities/Editoriales';
import { EditorialParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class EditorialesService {
  constructor(
    @InjectRepository(Editorial)
    private editorialRepository: Repository<Editorial>,
  ) {}

  //Funcion que muestra todas las editoriales
  buscarEditoriales() {
    return this.editorialRepository.find();
  }

  //Funcion para agregar editorial
  async crearEditorial(editorialDetails: EditorialParams) {
    await this.validarCuit(editorialDetails.cuit);
    return this.editorialRepository.save(editorialDetails);
  }

  //Funcion para validar largo del cuit
  async validarCuit(cuit: string) {
    if (cuit.length !== 10 && cuit.length !== 11) {
      throw new BadRequestException(
        'El CUIT debe tener una longitud de 10 o 11 numeros',
      );
    }
  }

  //Funcion para acutalizar editorial por id
  async actualizarEditorial(
    idEditorial: number,
    actualizarEditorialDetails: EditorialParams,
  ) {
    if (actualizarEditorialDetails.cuit) {
      await this.validarCuit(actualizarEditorialDetails.cuit);
    }
    return this.editorialRepository.update(
      { idEditorial },
      { ...actualizarEditorialDetails },
    );
  }

  //funcion para eliminar editorial por id
  async eliminarEditorial(idEditorial: number) {
    await this.validarId(idEditorial);
    return this.editorialRepository.delete({ idEditorial });
  }

  //funcion para validar si el id ingresado por parametro existe en la BD
  async validarId(idEditorial) {
    const editorial = await this.editorialRepository.findOne({
      where: { idEditorial },
    });
    if (!editorial) {
      throw new HttpException(
        'El id de la editorial no corresponde a ninguna',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
