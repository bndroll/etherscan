import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EtherscanService } from '../etherscan.service';
import { ConfigService } from '@nestjs/config';
import { EtherscanApiService } from '../api/etherscan-api.service';

@Injectable()
export class BlockCron {
  constructor(
    private readonly configService: ConfigService,
    private readonly etherscanService: EtherscanService,
    private readonly etherscanApiService: EtherscanApiService
  ) {
  }

  @Cron('*/1 * * * *')
  async blockScan() {
    let startNumber: number;
    const lastSavedBlock = await this.etherscanService.findLastSavedBlock();
    if (!lastSavedBlock) {
      startNumber = parseInt(this.configService.get('START_BLOCK_NUMBER'));
    } else {
      startNumber = parseInt(lastSavedBlock.number, 16) + 1;
    }

    const lastBlockNumber = await this.etherscanApiService.findLastBlockNumber();

    while (startNumber <= lastBlockNumber) {
      const currentBlock = await this.etherscanApiService.findBlock(startNumber.toString(16));
      if ('status' in currentBlock) {
        continue;
      }

      const savedBlock = await this.etherscanService.createBlock(currentBlock.result.number);
      const transactionsMap = new Map<string, number>();
      for (const transaction of currentBlock.result.transactions) {
        if (!transactionsMap.has(transaction.from)) {
          transactionsMap.set(transaction.from, -1 * parseInt(transaction.value, 16));
        } else {
          transactionsMap.set(
            transaction.from,
            transactionsMap.get(transaction.from) - parseInt(transaction.value, 16),
          );
        }

        if (!transactionsMap.has(transaction.to)) {
          transactionsMap.set(transaction.to, parseInt(transaction.value, 16));
        } else {
          transactionsMap.set(
            transaction.to,
            transactionsMap.get(transaction.to) + parseInt(transaction.value, 16),
          );
        }
      }

      for (const [mapWallet, mapValue] of transactionsMap) {
        if (!mapWallet) {
          return;
        }

        await this.etherscanService.createTransaction({
          blockNumber: savedBlock.number,
          wallet: mapWallet,
          value: mapValue,
        });
      }

      startNumber++;
    }
  }

  @Cron('*/5 * * * *')
  async deleteOldBlocks() {
    await this.etherscanService.deleteOldBlocks();
  }
}