import { Controller, Get } from '@nestjs/common';
import { EtherscanService } from './etherscan.service';

@Controller('etherscan')
export class EtherscanController {
  constructor(private readonly etherscanService: EtherscanService) {
  }

  @Get('most-changed')
  async findMostChangedBalance() {
    return await this.etherscanService.findMostChangedBalance()
  }
}
