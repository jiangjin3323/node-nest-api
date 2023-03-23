import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class Product {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    img: string;

    @Column()
    title: string;
    
    @Column()
    name: string;
  
    @CreateDateColumn()
    createTime?: Date;
    
    @CreateDateColumn()
    updataTime?: Date;
  }
  