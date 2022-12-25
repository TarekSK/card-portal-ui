export interface UserReadModel {
  id: number;
  lastName: string;
  firstName: string;
  username: string;
  password: string;
  lastLoginTime?: string | undefined;
  createdDate?: string | undefined;
  lastPasswordChangeDate?: string | undefined;
}
