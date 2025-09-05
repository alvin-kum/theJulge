import { authAxios } from "../axios";

export const updateMyProfile = async (profileData: {
  name: string;
  phone: string;
  address: string;
  bio: string;
}) => {
  const userId = localStorage.getItem("userId");
  if (!userId) throw new Error("로그인 정보가 없습니다.");

  const res = await authAxios.put(`/users/${userId}`, profileData);
  return res.data;
};

// 내 프로필 조회
export const fetchMyInfo = async (userId: string) => {
  const res = await authAxios.get(`/users/${userId}`);
  return res.data.item;
};

// 내 지원 내역 조회
export const fetchMyApplications = async (userId: string) => {
  const res = await authAxios.get(`/users/${userId}/applications`);
  return (res.data.items || []).map((x: any) => x.item);
};
