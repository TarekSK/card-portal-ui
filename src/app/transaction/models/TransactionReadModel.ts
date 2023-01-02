import TransactionTypeEnum from '../enum/TransactionTypeEnum';

export interface TransactionReadModel {
  id: number;
  date: string;
  amount: number;
  type: TransactionTypeEnum;
  cardNumber: string;
  vendorId: number;
  userId: number;
}
