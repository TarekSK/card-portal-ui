import AccountTypeEnum from '../enum/AccountTypeEnum';

export interface AccountWriteModel {
  id: number;
  balance: number;
  type: AccountTypeEnum;
  userId: number;
}
