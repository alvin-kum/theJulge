export interface User {
  id: string;
  email: string;
  type: 'employee' | 'employer';
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  // 알바생 추가 정보
  resume?: string;
  skills?: string[];
  availableTime?: {
    start: string;
    end: string;
  };
  preferredLocation?: string[];
}

export interface EmployerProfile extends User {
  // 사장님 추가 정보
  businessNumber?: string;
  businessName?: string;
}
