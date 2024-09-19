export type TransactionGnosis = {
    value: string;
    data: string;
    gas: number;
    from: string;
    to: string;
  };
  
  export type BlockchainTransactionGnosis = {
    id: string;
    dateAdded: number;
    forwardId: string;
    type: string;
    isBatch: boolean;
    txn: TransactionGnosis;
    chainId: number;
    account: string;
  };
  