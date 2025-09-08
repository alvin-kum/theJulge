export const redirectAfterLogin = (type: "employer" | "employee") =>
  type === "employer" ? "/shop" : "/profile";
