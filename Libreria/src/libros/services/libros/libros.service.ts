import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Autor } from 'src/typeorm/etities/Autores';
import { Editorial } from 'src/typeorm/etities/Editoriales';
import { Libro } from 'src/typeorm/etities/Libros';
import { ActualizarLibroParams, LibroParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class LibrosService {
  constructor(
    @InjectRepository(Libro) private libroRepository: Repository<Libro>,
    @InjectRepository(Editorial)
    private editorialRepository: Repository<Editorial>,
    @InjectRepository(Autor) private autorRepository: Repository<Autor>,
  ) {}

  //Funcion que busca todos los libros y agrega el autor y la editorial por sus id
  async buscarLibros() {
    return this.libroRepository.find({ relations: ['idautor', 'idEditorial'] });
  }

  //Funcion que busca todos los libros y los filtra por la categoria que se ingreso
  async buscarLibrosPorCatLit(categoriaLiteraria: string) {
    const librosFiltrados = await this.libroRepository.find({
      relations: ['idautor', 'idEditorial'],
      where: { categoriaLiteraria },
    });
    if (librosFiltrados.length === 0) {
      throw new HttpException(
        'No hay ningun Libro con esa categoria literaria',
        HttpStatus.BAD_REQUEST,
      );
    }
    return librosFiltrados;
  }

  //Funcion que guarda el libro cargado, si se carga autor o editorial los convierte en id y los guarda
  async crearLibro(libroDetails: LibroParams) {
    const autor = await this.buscarAutor(libroDetails);
    const editorial = await this.buscarEditorial(libroDetails);

    await this.validarExisteAut(autor);
    await this.validarExisteEdit(editorial);
    const fehchaaISO8601 = await this.normalizarFecha(
      libroDetails.fechaLanzamiento,
    );
    return await this.guardarLibro(
      libroDetails,
      autor,
      editorial,
      fehchaaISO8601,
    );
  }

  //Funcion que informa si no existe autor
  async validarExisteAut(autor: any) {
    if (!autor) {
      throw new HttpException(
        'El autor ingresado no existe',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

 //Funcion que informa si no existe editorial
  async validarExisteEdit(editorial: any) {
    if (!editorial) {
      throw new HttpException(
        'La editorial ingresada no existe',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //Funcion que normaliza la fecha en ISO 8601
  async normalizarFecha(fecha: String) {
    const [dia, mes, anio] = fecha.split('/');
    var fechaNormalizada = `20${anio.padStart(2, '0')}-${mes.padStart(
      2,
      '0',
    )}-${dia.padStart(2, '0')}`;
    if (anio.length === 4) {
      fechaNormalizada = `${anio.padStart(2, '0')}-${mes.padStart(
        2,
        '0',
      )}-${dia.padStart(2, '0')}`;
    }
    return fechaNormalizada;
  }

  //Funcion que guardo los datos en un Param nuevo para agregarle el id del autor
  async guardarLibro(
    libroDetails: LibroParams,
    autor: Autor,
    editorial: Editorial,
    fehchaaISO8601: string,
  ) {
    const newLibro = this.libroRepository.create(libroDetails);
    //intenta guardarlo por si detecta que el titulo esta repetido
    try {
      await this.libroRepository.save(newLibro);
    } catch (error) {
      throw new HttpException(
        'Libro con ese titulo ya existe',
        HttpStatus.BAD_REQUEST,
      );
    }
    const savedLibro = await this.libroRepository.save(newLibro);
    savedLibro.idautor = autor.idAutor;
    savedLibro.idEditorial = editorial.idEditorial;
    savedLibro.fechaLanzamiento = fehchaaISO8601;
    return this.libroRepository.save(savedLibro);
  }

  //Funcion que busca en la base de datos de autor el que tenga el nombre y apellido ingrsado
  async buscarAutor(libroDetails: LibroParams) {
    const nombre = libroDetails.nombreAutor;
    const apellido = libroDetails.apellidoAutor;
    //verifica que se haya ingresado el nombre y apellido
    if (!nombre || !apellido) {
      throw new HttpException(
        'Debe ingresar el nombre y el apellido del autor',
        HttpStatus.BAD_REQUEST,
      );
    }

    nombre.toLowerCase();
    apellido.toLowerCase();
    return await this.autorRepository.findOne({ where: { nombre, apellido } });
  }

  //Funcion que busca la editorial ingresada
  async buscarEditorial(libroDetails: LibroParams) {
    const nombre = libroDetails.nombreEditorial;
    nombre.toLowerCase();
    return await this.editorialRepository.findOne({ where: { nombre } });
  }

  //Funcion que convierte los nombres en id y guarda en un Repository de tipo Libro
  async actualizarLibro(idLibro: number, actualizarlibroDetails: LibroParams) {
    var actualizarDetail: ActualizarLibroParams;
    const guardado = this.libroRepository.create(actualizarDetail);
    const datosActualizados = await this.verificarDatosActu(
      actualizarlibroDetails,
      guardado,
    );
    await this.validarID(idLibro);
    return this.libroRepository.update({ idLibro }, { ...datosActualizados });
  }

  //Valida que el id ingresado por Param, exista en la BD
  async validarID(idLibro: number) {
    const objetoAutor = await this.libroRepository.findOne({
      where: { idLibro },
    });
    if (!objetoAutor) {
      throw new HttpException(
        'El id del libro no corresponde a ninguno',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //Verifica los datos que pueden ser ingresados y los guarda en un Repository de tipo Libro
  async verificarDatosActu(
    actualizarlibroDetails: LibroParams,
    guardado: ActualizarLibroParams,
  ) {
    const fecha = actualizarlibroDetails.fechaLanzamiento;
    const autor = actualizarlibroDetails.nombreAutor;
    const editorial = actualizarlibroDetails.nombreEditorial;
    //Si ingresó
    if (fecha) {
      guardado.fechaLanzamiento = await this.normalizarFecha(fecha);
    }

    //Si ingresó un autor y existe en la BD lo guarda
    if (autor) {
      const autorCompleto = await this.buscarAutor(actualizarlibroDetails);
      await this.validarExisteAut(autorCompleto);
      guardado.idautor = autorCompleto.idAutor;
    }

    //Si ingresó una editorial en la BD lo guarda
    if (editorial) {
      const editorialCompleta = await this.buscarEditorial(
        actualizarlibroDetails,
      );
      await this.validarExisteEdit(editorialCompleta);
      guardado.idEditorial = editorialCompleta.idEditorial;
    }

    guardado = await this.guardadoEnNuevoParam(
      actualizarlibroDetails,
      guardado,
    );
    return guardado;
  }

  //Funcion que guarda los datos de Param con nombre, apellido y editor a Param de tipo Libro
  async guardadoEnNuevoParam(
    actualizarlibroDetails: LibroParams,
    guardado: ActualizarLibroParams,
  ) {
    guardado.titulo = actualizarlibroDetails.titulo;
    guardado.categoriaLiteraria = actualizarlibroDetails.categoriaLiteraria;
    guardado.precio = actualizarlibroDetails.precio;
    guardado.descripcion = actualizarlibroDetails.descripcion;

    return guardado;
  }

  //Funcion que elimina libro de BD por id
  async eliminarLibro(idLibro: number) {
    await this.validarID(idLibro);
    return this.libroRepository.delete({ idLibro });
  }
}
