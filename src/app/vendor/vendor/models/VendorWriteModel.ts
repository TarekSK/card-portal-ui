import { AddressWriteModel } from '../../address/address/models/AddressWriteModel';
import { ContactWriteModel } from '../../contact/contact/models/ContactWriteModel';

export interface VendorWriteModel {
  id: number;
  name: string;
  addresses?: AddressWriteModel[];
  contacts?: ContactWriteModel[];
}
