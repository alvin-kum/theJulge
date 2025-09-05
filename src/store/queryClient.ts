import { QueryClient } from "@tanstack/react-query";

export const queryKeys = {
  me: ["me"] as const,
  notices: (p?: unknown) => ["notices", p] as const,
  notice: (id: string) => ["notice", id] as const,
  shop: ["shop"] as const,
  profile: ["profile"] as const,
};

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});
