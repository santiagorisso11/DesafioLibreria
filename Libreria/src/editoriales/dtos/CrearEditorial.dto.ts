import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CrearEditorialDto {
  @IsNotEmpty({ message: 'El nombre se debe ingresar' })
  nombre: string;

  @IsNotEmpty({ message: 'La direccion se debe ingresar' })
  direccion: string;

  @IsNotEmpty({ message: 'El cuit se debe ingresar' })
  @IsString()
  @Matches(/^[0-9]+$/, { message: 'El cuit solo pueden ser numeros' })
  cuit: string;
}
