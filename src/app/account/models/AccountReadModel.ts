import AccountTypeEnum from '../enum/AccountTypeEnum';

export interface AccountReadModel {
  id: number;
  balance: number;
  type: AccountTypeEnum;
  userId: number;
}
