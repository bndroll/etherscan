import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { FindBlockDto } from '../dto/find-block.dto';
import { FindLastBlockDto } from '../dto/find-last-block.dto';

@Injectable()
export class EtherscanApiService {
  constructor(private readonly httpService: HttpService) {
  }

  async findBlock(num: string): Promise<FindBlockDto> {
    return await this.httpService.axiosRef.get<FindBlockDto>(`https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${num}&boolean=true`)
      .then(r => r.data);
  }

  async findLastBlockNumber(): Promise<number> {
    return await this.httpService.axiosRef.get<FindLastBlockDto>('https://api.etherscan.io/api?module=proxy&action=eth_blockNumber')
      .then(r => r.data)
      .then(r => parseInt(r.result, 16));
  }
}
