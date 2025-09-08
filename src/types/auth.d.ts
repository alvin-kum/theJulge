export type UserType = "employer" | "employee";

export interface SignupResponse {
  item: {
    id: string;
    type: UserType;
    email: string;
  };
  links: Array<{
    rel: string;
    description: string;
    method: string;
    href: string;
    body?: any;
    query?: any;
  }>;
}

export interface LoginResponse {
  item: {
    token: string;
    user: {
      item: {
        id: string;
        email: string;
        type: UserType;
      };
      href: string;
    };
  };
  links: any[];
}
