export interface ServiceResponse<TData = {}> {
  isSuccess: boolean;
  statusCode: number;
  errors: string[];
  data: TData;
}
