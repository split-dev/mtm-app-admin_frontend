export interface Customer{ 
  id: number; 
  email: string | null; 
  accepts_marketing: boolean | null; 
  created_at: string; 
  updated_at: string; 
  first_name: string | null; 
  last_name: string | null; 
  orders_count: number; 
  state: string | null; 
  total_spent: string; 
  last_order_id: number | null;
  default_address?: {
    country: string | null;
  } | undefined; 
  phone: string | null; 
}
 

export interface CustomersResponse {
    customers: Customer[];
}
