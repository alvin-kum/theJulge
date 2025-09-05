import { useRouteGuard } from "@/hooks/useRouteGuard";

export default function MyShopPage() {
  useRouteGuard("employer");
  return (
    <div>
      <h1>내 가게</h1>
      {/* TODO: 가게 상세 */}
    </div>
  );
}
