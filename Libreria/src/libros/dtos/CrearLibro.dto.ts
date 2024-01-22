import { IsNotEmpty, IsPositive } from "class-validator";

export class CrearLibroDto{
    @IsNotEmpty({message: 'Se debe ingresar el titulo'})
    titulo:string;

    @IsNotEmpty({message: 'Se debe ingresar la categoria Literaria'})
    categoriaLiteraria:string;

    @IsNotEmpty({message: 'Se debe ingresar el precio'})
    @IsPositive({message: 'Solo se puede ingresar un numero positivo'})
    precio:number;

    @IsNotEmpty({message: 'Se debe ingresar la fecha de lanzamiento'})
    fechaLanzamiento:string;

    @IsNotEmpty({message: 'Se debe ingresar la descripcion'})
    descripcion:string;

    @IsNotEmpty({message: 'Se debe ingresar el nombre del autor'})
    nombreAutor:string;

    @IsNotEmpty({message: 'Se debe ingresar el apellido del autor'})
    apellidoAutor:string;

    @IsNotEmpty({message: 'Se debe ingresar el nombre de la editorial'})
    nombreEditorial:string;
}