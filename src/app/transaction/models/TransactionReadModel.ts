import TransactionTypeEnum from '../enum/TransactionTypeEnum';

export interface TransactionReadModel {
  id: number;
  date: Date;
  amount: number;
  type: TransactionTypeEnum;
  cardNumber: string;
  vendorId: number;
  userId: number;
}
