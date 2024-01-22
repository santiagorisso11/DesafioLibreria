import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Autor } from 'src/typeorm/etities/Autores';
import { AutorParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class AutoresService {
  constructor(
    @InjectRepository(Autor) private autorRepository: Repository<Autor>,
  ) {}

  //Funcion para buscar todos los autores en BD
  buscarAutores() {
    return this.autorRepository.find();
  }

  //Funcion para crear autor
  async crearAutor(autorDetails: AutorParams) {
    await this.validarDni(autorDetails.dni);
    return this.autorRepository.save(autorDetails);
  }

  //Funcion para validar la longitud del dni
  async validarDni(dni: string) {
    if (dni.length < 6 || dni.length > 8) {
      throw new BadRequestException(
        'El DNI debe tener una longitud de 6 o 8 numeros',
      );
    }
  }

  //Funcion para actualizar un autor en la BD
  async actualizarAutor(idAutor: number, actualizarAutorDetails: AutorParams) {
    //si se ingreso un dni lo valida
    if (actualizarAutorDetails.dni) {
      await this.validarDni(actualizarAutorDetails.dni);
    }
    await this.validarID(idAutor);
    return this.autorRepository.update(
      { idAutor },
      { ...actualizarAutorDetails },
    );
  }

  //Funcion para eliminar un autor por id
  async eliminarAutor(idAutor: number) {
    await this.validarID(idAutor);
    return this.autorRepository.delete({ idAutor });
  }

  //Funcion para validar que el id ingresado por parametro exista
  async validarID(idAutor: number) {
    const objetoAutor = await this.autorRepository.findOne({
      where: { idAutor },
    });
    if (!objetoAutor) {
      throw new HttpException(
        'El id del autor no corresponde a ninguno',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
