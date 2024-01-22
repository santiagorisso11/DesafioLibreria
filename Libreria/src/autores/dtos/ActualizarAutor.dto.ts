import { IsOptional, Matches } from 'class-validator';

export class ActualizarAutorDto {
  @IsOptional()
  nombre: string;

  @IsOptional()
  apellido: string;

  @IsOptional()
  @Matches(/^[0-9]+$/)
  dni: string;

  @IsOptional()
  nacionalidad: string;
}
