import { useRouteGuard } from "@/hooks/useRouteGuard";

export default function EditProfilePage() {
  useRouteGuard("employee");
  return (
    <div>
      <h1>프로필 수정</h1>
      {/* TODO: 프로필 수정 폼 */}
    </div>
  );
}
