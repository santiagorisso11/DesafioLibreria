//CREAR PARAMS
export type LibroParams = {
  titulo: string;
  categoriaLiteraria: string;
  precio: number;
  fechaLanzamiento: string;
  descripcion: string;
  nombreAutor: string;
  apellidoAutor: string;
  nombreEditorial: string;
};
export type ActualizarLibroParams = {
  titulo: string;
  categoriaLiteraria: string;
  precio: number;
  fechaLanzamiento: string;
  descripcion: string;
  idautor: number;
  idEditorial: number;
};
export type AutorParams = {
  nombre: string;
  apellido: string;
  dni: string;
  nacionalidad: string;
};

export type EditorialParams = {
  nombre: string;
  direccion: string;
  cuit: string;
};
