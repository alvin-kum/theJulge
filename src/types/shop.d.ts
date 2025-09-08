export interface Shop {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name?: string;
    email: string;
  };
}

export interface ShopDetail extends Shop {
  notices?: Notice[];
}

export interface ShopFilters {
  address?: string[];
  category?: string;
  keyword?: string;
  sort?: 'name' | 'category' | 'pay';
}

export interface CreateShopForm {
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

export type ShopCategory = 
  | '음식점'
  | '카페'
  | '편의점'
  | '마트'
  | '배달'
  | '서비스업'
  | '사무직'
  | '기타';
