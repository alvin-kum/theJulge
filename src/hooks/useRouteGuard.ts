import { useEffect } from "react";
import { useRouter } from "next/router";
import { Auth } from "@/lib/auth";

export function useRouteGuard(required?: "employer" | "employee") {
  const router = useRouter();
  useEffect(() => {
    const token = Auth.getToken();
    const type = Auth.getType() as "employer" | "employee" | "";
    if (!token) {
      router.replace("/login");
      return;
    }
    if (required && type && type !== required) router.replace("/");
  }, [router, required]);
}
