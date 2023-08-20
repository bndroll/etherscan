import { Injectable } from '@nestjs/common';
import { BlockRepository } from './repositories/block.repository';
import { HttpService } from '@nestjs/axios';
import { Block } from './entities/block.entity';
import { BlockWalletRepository } from './repositories/block-wallet.repository';
import { BlockWallet } from './entities/block-wallet.entity';
import { CreateBlockWalletEntityDto } from './dto/create-block-wallet.dto';

@Injectable()
export class EtherscanService {
  constructor(
    private readonly httpService: HttpService,
    private readonly blockRepository: BlockRepository,
    private readonly blockWalletRepository: BlockWalletRepository,
  ) {
  }

  async createBlock(num: string) {
    return await this.blockRepository.save(Block.create(num));
  }

  async createTransaction(dto: CreateBlockWalletEntityDto) {
    return await this.blockWalletRepository.save(BlockWallet.create(dto));
  }

  async findLastSavedBlock() {
    return await this.blockRepository.findLast();
  }

  async findMostChangedBalance() {
    return await this.blockWalletRepository.findMostChangedBalance();
  }

  async deleteOldBlocks() {
    const blocks = await this.blockRepository.find({ order: { createdDate: 'DESC' } });
    if (blocks.length > 100) {
      const deletedBlocks = blocks.slice(100);
      await this.blockWalletRepository.deleteByBlocksNumber(deletedBlocks.map(item => item.number));
      await this.blockRepository.remove(deletedBlocks);
    }
  }
}
