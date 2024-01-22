import { IsNotEmpty } from 'class-validator';

export class BuscarLibroDto {
  @IsNotEmpty({ message: 'Se debe ingresar la categoria Literaria' })
  categoriaLiteraria: string;
}
