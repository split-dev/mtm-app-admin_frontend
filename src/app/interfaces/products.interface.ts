import { Fabric } from "./fabrics.interface";

export type suitType = 'blaser' | '2-piece suit' | '3-piece suit' | '2-trouser suit' | '2-piece formal' | '3-piece formal' | 'overcoat' | 'trouser' | string;

export interface Product{ 
  id: number;
  name: string;
  images: string[] | null;
  status: string | null;
  inventory: string | null;
  type: string | null;
  vendor: string | null;
  fabrics: Fabric[] | null;
  style: string | null;
  styleCode: string | null;
  season: string | null;
  inspiration: string | null;
  suitType: suitType | null;
}
 
export interface ProductsResponse {
  products: Product[];
}
