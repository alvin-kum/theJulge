import { useRouteGuard } from "@/hooks/useRouteGuard";

export default function AlertPage() {
  useRouteGuard(); // 로그인만 필요

  return (
    <div>
      <h1>알림</h1>
      {/* TODO: 알림 리스트 */}
    </div>
  );
}
