export type MyInfo = {
  id: string;
  email: string;
  type: "employer" | "employee";
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
};

export function hasProfileFilled(me: MyInfo) {
  // 필요한 필드를 여기서 정의하세요 (예시는 name/phone/address)
  return !!(me?.name && me?.phone && me?.address);
}
