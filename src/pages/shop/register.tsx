import { useRouteGuard } from "@/hooks/useRouteGuard";

export default function RegisterShopPage() {
  useRouteGuard("employer");
  return (
    <div>
      <h1>가게 등록</h1>
      {/* TODO: 가게 등록 폼 */}
    </div>
  );
}
