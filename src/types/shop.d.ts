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

export interface Notice {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop?: Shop;
  createdAt: string;
  updatedAt: string;
  // Post 컴포넌트에서 필요한 추가 필드들
  imageUrl: string;
  name: string;
  address1: string;
  originalHourlyPay: number;
}

// PostData 타입을 여기에 정의
export interface PostData extends Omit<Notice, "id"> {
  id: string; // Post 컴포넌트에서 필요한 number 타입 id
  shopId: string; // shop ID 추가
}

// 나머지 기존 인터페이스들...
export interface ShopDetail extends Shop {
  notices?: Notice[];
}

export interface ShopFilters {
  address?: string[];
  category?: string;
  keyword?: string;
  sort?: "name" | "category" | "pay";
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

export interface NoticeFormData {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
}

export interface Application {
  id: string;
  status: "pending" | "accepted" | "rejected" | "canceled";
  createdAt: string;
  user: {
    id: string;
    name?: string;
    email: string;
  };
  shop: Shop;
  notice: Notice;
}

export type ShopCategory =
  | "음식점"
  | "카페"
  | "편의점"
  | "마트"
  | "배달"
  | "서비스업"
  | "사무직"
  | "기타";
