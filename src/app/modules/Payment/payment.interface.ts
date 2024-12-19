type OrderItem = {
  productId: string;
  quantity: number;
  size: string;
  color: string;
};

export type TPaymentData = {
  items: OrderItem[];
};
