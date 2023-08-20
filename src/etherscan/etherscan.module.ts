import { Module } from '@nestjs/common';
import { EtherscanService } from './etherscan.service';
import { EtherscanController } from './etherscan.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { BlockCron } from './cron/block.cron';
import { BlockWalletRepository } from './repositories/block-wallet.repository';
import { BlockRepository } from './repositories/block.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Block } from './entities/block.entity';
import { BlockWallet } from './entities/block-wallet.entity';
import { EtherscanApiService } from './api/etherscan-api.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    TypeOrmModule.forFeature([Block, BlockWallet]),
  ],
  controllers: [EtherscanController],
  providers: [
    EtherscanService,
    EtherscanApiService,
    BlockCron,
    BlockRepository,
    BlockWalletRepository
  ],
})
export class EtherscanModule {
}
