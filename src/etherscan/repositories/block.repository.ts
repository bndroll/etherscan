import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Block } from '../entities/block.entity';

@Injectable()
export class BlockRepository extends Repository<Block> {
  constructor(private dataSource: DataSource) {
    super(Block, dataSource.createEntityManager());
  }

  async findLast(): Promise<Block> {
    return (await this.query(`select * from block order by number desc limit 1`))[0];
  }
}