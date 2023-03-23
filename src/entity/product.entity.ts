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

    @Column()
    type?: string;
  
    @CreateDateColumn()
    createTime?: Date;
    
    @CreateDateColumn()
    updataTime?: Date;

    constructor(partial: Partial<Product>) {
        Object.assign(this, partial);
        this.type = this.type || 'xiaomi'; // 默认设置为xiaomi
      }
  }
  