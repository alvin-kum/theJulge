import { useRouter } from "next/router";
import NoticeCreateForm from "@/components/notice/NoticeCreateForm";

export default function NoticeCreatePage() {
  const router = useRouter();
  // ?shopId=... 그대로 쓸 수 있게 prop으로 내려주고 싶다면:
  const shopId = (router.query.shopId as string) || "";

  return <NoticeCreateForm shopId={shopId} />;
}
