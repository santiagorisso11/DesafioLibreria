import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'editoriales' })
export class Editorial {
  @PrimaryGeneratedColumn()
  idEditorial: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  cuit: string;
}
