import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title?: string;

  @Column()
  url: string;

  @Column()
  linkUrl?: string;

  @CreateDateColumn()
  createTime?: Date;

  @CreateDateColumn()
  updataTime?: Date;
}
