import { useRouteGuard } from "@/hooks/useRouteGuard";

export default function EditShopPage() {
  useRouteGuard("employer");
  return (
    <div>
      <h1>가게 정보 수정</h1>
      {/* TODO: 가게 수정 폼 */}
    </div>
  );
}
