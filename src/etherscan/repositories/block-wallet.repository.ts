import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BlockWallet } from '../entities/block-wallet.entity';

@Injectable()
export class BlockWalletRepository extends Repository<BlockWallet> {
  constructor(private dataSource: DataSource) {
    super(BlockWallet, dataSource.createEntityManager());
  }

  async findMostChangedBalance(): Promise<BlockWallet> {
    return (await this.query(`
      select * from block_wallet
      where "blockNumber" in (select block."number" from block order by block."createdDate" desc limit 100)
      order by abs(value) desc
      limit 1
    `))[0];
  }

  async deleteByBlocksNumber(numbers: string[]) {
    return await this.createQueryBuilder()
      .delete()
      .from(BlockWallet)
      .where('number in (:...numbers)', { numbers })
      .execute();
  }
}