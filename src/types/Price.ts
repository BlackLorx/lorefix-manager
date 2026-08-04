export interface Price {
  id: number;

  brand: string;

  device: string;

  service: string;

  price: number;

  description?: string;

  public: boolean;

  active: boolean;

  created_at?: string;
}