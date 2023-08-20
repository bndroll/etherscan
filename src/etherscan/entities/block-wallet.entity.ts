import { Column, Entity, PrimaryColumn } from 'typeorm';
import { generateString } from '@nestjs/typeorm';
import { CreateBlockWalletEntityDto } from '../dto/create-block-wallet.dto';

@Entity()
export class BlockWallet {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  blockNumber: string;

  @Column('varchar')
  wallet: string;

  @Column('decimal', {precision: 22, scale: 0})
  value: number;

  static create(dto: CreateBlockWalletEntityDto) {
    const instance = new BlockWallet();
    instance.id = generateString();
    instance.blockNumber = dto.blockNumber;
    instance.wallet = dto.wallet;
    instance.value = dto.value;
    return instance;
  }
}