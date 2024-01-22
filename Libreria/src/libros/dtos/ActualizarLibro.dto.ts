import { IsOptional, IsPositive } from 'class-validator';

export class ActualizarLibroDto {
  @IsOptional()
  titulo: string;

  @IsOptional()
  categoriaLiteraria: string;

  @IsOptional()
  @IsPositive({ message: 'Solo se puede ingresar un numero positivo' })
  precio: number;

  @IsOptional()
  fechaLanzamiento: string;

  @IsOptional()
  descripcion: string;

  @IsOptional()
  nombreAutor: string;

  @IsOptional()
  apellidoAutor: string;

  @IsOptional()
  nombreEditorial: string;
}
