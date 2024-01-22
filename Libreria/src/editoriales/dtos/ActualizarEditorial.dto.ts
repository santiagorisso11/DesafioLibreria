import { IsOptional, Matches } from 'class-validator';

export class ActualizarEditorialDto {
  @IsOptional()
  nombre: string;

  @IsOptional()
  direccion: string;

  @IsOptional()
  @Matches(/^[0-9]+$/, { message: 'El cuit solo pueden ser numeros' })
  cuit: string;
}
