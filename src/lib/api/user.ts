import { api } from "../axios";

export async function getUser(userId: string) {
  const { data } = await api.get(`/users/${userId}`);
  return data.item as {
    id: string;
    email: string;
    type: "employer"|"employee";
    shop?: { item?: { id: string } } | null;
  };
}
