import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class Header {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;

    @Column()
    linkUrl?: string;
  
    @CreateDateColumn()
    createTime?: Date;
    
    @CreateDateColumn()
    updataTime?: Date;
  }
  