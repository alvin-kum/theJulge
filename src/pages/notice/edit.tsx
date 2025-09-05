import { useRouteGuard } from "@/hooks/useRouteGuard";

export default function EditNoticePage() {
  useRouteGuard("employer");
  return (
    <div>
      <h1>공고 수정</h1>
      {/* TODO: 공고 수정 폼 */}
    </div>
  );
}
