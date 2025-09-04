export interface Notice {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  createdAt: string;
  updatedAt: string;
  shop: {
    id: string;
    name: string;
    address1: string;
    address2: string;
    category: string;
    description: string;
    imageUrl: string;
    originalHourlyPay: number;
  };
}

export interface NoticeDetail extends Notice {
  applications?: Application[];
}

export interface Application {
  id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'canceled';
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    bio?: string;
  };
  notice?: Notice;
}

export interface NoticeFilters {
  address?: string[];
  keyword?: string;
  hourlyPayMin?: number;
  hourlyPayMax?: number;
  startDate?: string;
  endDate?: string;
  sort?: 'time' | 'pay' | 'hour' | 'shop';
}

export interface CreateNoticeForm {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
}
