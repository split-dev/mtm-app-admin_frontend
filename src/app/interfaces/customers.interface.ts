import { suitType } from './products.interface';


export interface Measurement {
  name: string;
  value: number;
}
export interface MeasurementsList {
  date: Date;
  measurements: Measurement[]
}
export type Metafields = {
  [key in suitType]?: {
    bodyMeasurements?: MeasurementsList[];
    finalGarments?: MeasurementsList[];
  };
};

export interface Customer { 
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
  height?: number | null; 
  fit?: string | null; 
  notes?: string | null;
  metafeilds?: Metafields | null; 
  fullBodyPhotos?: string[];
  inspirationImages?: string[];
}
 

export interface CustomersResponse {
    customers: Customer[];
}
