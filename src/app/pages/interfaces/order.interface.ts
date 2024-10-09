export interface Order {
  public_id: string;
  order_number: string;
  customer_id: string;
  customer_first_name: string;
  customer_last_name: string;
  order_number_sort:number;
  amount: string;
  required_date: string;
  order_status: string;
  payment_status: string;
  update_order_status: string;
}
export interface OrderPageInfo {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
}
export interface OrderQueryInfo {
  sort: string;
  reverse: string;
  status: string;
  payment_status: string;
  search:string
}
export interface OrdersResponse {
  data: Order[];
  page_info :OrderPageInfo ;
}
