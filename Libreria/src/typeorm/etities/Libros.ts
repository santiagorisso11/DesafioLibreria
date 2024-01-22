import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Editorial } from './Editoriales';
import { Autor } from './Autores';
import { IsDateString } from 'class-validator';

@Entity({ name: 'libros' })
export class Libro {
  @PrimaryGeneratedColumn()
  idLibro: number;

  @Column({ unique: true })
  titulo: string;

  @Column()
  categoriaLiteraria: string;

  @Column()
  precio: number;

  @Column()
  @IsDateString()
  fechaLanzamiento: string;

  @Column()
  descripcion: string;

  @ManyToOne(() => Autor, (autor) => autor.idAutor)
  @JoinColumn()
  idautor: number;

  @ManyToOne(() => Editorial, (editorial) => editorial.idEditorial)
  @JoinColumn()
  idEditorial: number;
}
