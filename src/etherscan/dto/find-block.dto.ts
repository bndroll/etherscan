export type FindBlockDto = FindBlockSuccess | FindBlockLimiterError;

export class FindBlockSuccess {
  jsonrpc: string;
  id: number;
  result: BlockResult;
}

export class BlockResult {
  number: string;
  transactions: BlockTransaction[];
}

export class BlockTransaction {
  blockNumber: string;
  from: string;
  to: string;
  value: string;
}

export class FindBlockLimiterError {
  status: string;
  message: string;
  result: string;
}