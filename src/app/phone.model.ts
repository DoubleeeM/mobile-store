export interface Phone {
  brand: string;
  type: string;
  picture: string;
  price: number;
  description: string;
  id?: string;
}

export interface CartPhone extends Phone {
  amount: number;
}

export interface CartItems {
  [key: string]: {
    amount: number;
  };
}

export interface Order {
  name: string;
  lastName: string;
  street: string;
  poNumber: number;
  city: string;
  phone: number;
  id?: string;
}
