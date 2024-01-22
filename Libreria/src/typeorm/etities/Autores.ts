import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'autores' })
export class Autor {
  @PrimaryGeneratedColumn()
  idAutor: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  dni: string;

  @Column()
  nacionalidad: string;
}
