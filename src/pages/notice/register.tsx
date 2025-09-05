import { useRouteGuard } from "@/hooks/useRouteGuard";

export default function RegisterNoticePage() {
  useRouteGuard("employer");
  return (
    <div>
      <h1>공고 등록</h1>
      {/* TODO: 공고 등록 폼 */}
    </div>
  );
}
