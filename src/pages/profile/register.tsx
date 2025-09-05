import { useRouteGuard } from "@/hooks/useRouteGuard";

export default function RegisterProfilePage() {
  useRouteGuard("employee");
  return (
    <div>
      <h1>프로필 등록</h1>
      {/* TODO: 프로필 등록 폼 */}
    </div>
  );
}
