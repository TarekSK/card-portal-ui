import CardStateEnum from '../enum/CardStateEnum';
import CardTypeEnum from '../enum/CardTypeEnum';
import CurrencyEnum from '../enum/CurrencyEnum';

export interface CardReadModel {
  id: number;
  cardNumber: string;
  valid: boolean;
  state: CardStateEnum;
  type: CardTypeEnum;
  currency?: CurrencyEnum;
  userId: number;
}
