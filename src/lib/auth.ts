const TOKEN_KEY = "access_token";
const TYPE_KEY = "user_type"; // 'employer' | 'employee'
const USER_ID_KEY = "user_id";

export const Auth = {
  getToken: () =>
    typeof window === "undefined" ? "" : localStorage.getItem(TOKEN_KEY) || "",
  setToken: (t: string) => localStorage.setItem(TOKEN_KEY, t),
  clearToken: () => localStorage.removeItem(TOKEN_KEY),

  getType: () =>
    typeof window === "undefined" ? "" : localStorage.getItem(TYPE_KEY) || "",
  setType: (v: "employer" | "employee") => localStorage.setItem(TYPE_KEY, v),
  clearType: () => localStorage.removeItem(TYPE_KEY),

  getUserId: () =>
    typeof window === "undefined"
      ? ""
      : localStorage.getItem(USER_ID_KEY) || "",
  setUserId: (id: string) => localStorage.setItem(USER_ID_KEY, id),
  clearUserId: () => localStorage.removeItem(USER_ID_KEY),

  clearAll: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TYPE_KEY);
    localStorage.removeItem(USER_ID_KEY);
  },
};
