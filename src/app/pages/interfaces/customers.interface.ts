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
  city: string;
  note: string;
  province_code: string;
  country_name: string;
  updated_at: string;
  first_name: string | null;
  last_name: string | null;
  orders_count: number;
  state: string | null;
  total_spent: string;
  last_order_id: number | null;
  profile_completed :boolean;
  default_address?: {
    country: string | null;
  } | undefined;
  phone: string | null;
}

export interface CustomerMetafields {
  id?: string,
  type: string | null,
  namespace: string | null,
  key: string | null,
  value: {
    [key: string]: any,
    additional_info: {
      [key: string]: any
    },
    body_measurements: {
      [key: string]: any
    },
    final_garment: {
      [key: string]: any
    },
  },
  owner_resource: string | null,
  owner_id: string | null
}

export interface CustomersResponse {
    data: Customer[];
    page_info:CustomerPageInfo
}

export interface CustomerResponse {
    data: Customer;
}

export interface CustomerPageInfo {
  next: boolean;
  prev: boolean;
}
