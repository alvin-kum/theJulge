import { useRouteGuard } from "@/hooks/useRouteGuard";

export default function MyProfilePage() {
  useRouteGuard("employee");
  return (
    <div>
      <h1>내 프로필</h1>
      {/* TODO: 프로필 상세 */}
    </div>
  );
}
