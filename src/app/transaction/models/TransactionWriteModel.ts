import TransactionTypeEnum from '../enum/TransactionTypeEnum';

export interface TransactionWriteModel {
  id: number;
  date: Date;
  amount: number;
  type: TransactionTypeEnum;
  cardNumber: string;
  vendorId: number;
  userId: number;
}
