import { api } from "../axios";

export async function login(email: string, password: string) {
  const { data } = await api.post("/token", { email, password });
  return data.item as {
    token: string;
    user: { item: { id: string; email: string; type: "employer"|"employee" } };
  };
}
