import { IsNotEmpty, Matches } from 'class-validator';

export class CrearAutorDto {
  @IsNotEmpty({ message: 'Debe ingresar el nombre del Autor' })
  nombre: string;

  @IsNotEmpty({ message: 'Debe ingresar el apellido del Autor' })
  apellido: string;

  @IsNotEmpty({ message: 'Debe ingresar el dni del Autor' })
  @Matches(/^[0-9]+$/, { message: 'El dni solo pueden ser numeros' })
  dni: string;

  @IsNotEmpty({ message: 'Debe ingresar la nacionalidad del Autor' })
  nacionalidad: string;
}
