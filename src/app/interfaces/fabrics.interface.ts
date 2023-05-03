export interface Fabric{ 
  id: number;
  name: string;
  millName?: string | null;
  bunchName?: string | null;
  image: string | null;
  code?: string | null;
  weight?: number | null;
  vibe?: string | null;
  description?: string | null;
  products?: number | null;
}
 
export interface FabricsResponse {
  products: Fabric[];
}
