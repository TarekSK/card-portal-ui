import TransactionTypeEnum from '../enum/TransactionTypeEnum';

export interface TransactionWriteModel {
  id: number;
  date: string;
  amount: number;
  type: TransactionTypeEnum;
  cardNumber: string;
  vendorId: number;
  userId: number;
}
