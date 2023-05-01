interface Customer {
    id: number;
    name: string;
    age: number;
  }

export interface CustomerResponse {
    results: Customer[];
}
