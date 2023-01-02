import { AddressReadModel } from '../../address/address/models/AddressReadModel';
import { ContactReadModel } from '../../contact/contact/models/ContactReadModel';

export interface VendorReadModel {
  id: number;
  name: string;
  addresses?: AddressReadModel[];
  contacts?: ContactReadModel[];
}
