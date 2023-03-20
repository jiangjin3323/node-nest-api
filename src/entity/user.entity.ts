import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  sign: string;

  @Column()
  account: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createTime?: Date;
  
  @CreateDateColumn()
  loginTime?: Date;
}
