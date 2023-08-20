import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Block {
  @PrimaryColumn('varchar')
  number: string;

  @CreateDateColumn()
  createdDate: Date;

  static create(number: string) {
    const instance = new Block();
    instance.number = number;
    return instance;
  }
}