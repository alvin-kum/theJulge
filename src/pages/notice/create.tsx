// src/pages/notice/create.tsx
import { useRouter } from "next/router";
import NoticeCreateForm from "@/components/notice/NoticeCreateForm";

export default function NoticeCreatePage() {
  const router = useRouter();
  const shopId = (router.query.shopId as string) || "";
  return <NoticeCreateForm shopId={shopId} />;
}
