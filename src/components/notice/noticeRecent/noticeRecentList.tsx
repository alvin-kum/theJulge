import NotFoundNotice from "../NotFoundNotice/NotFoundNotice";
import { Notice } from "@/types/notice";
import Post from "@/components/Postcard";
import { ListWrap } from "./noticeRecentList.style";

// recent_notice에는 item 래핑이 없을 수 있으므로 any로 받고, 안전 체크로 필터링
interface Props {
  type: "customized" | "entire" | "owner";
  items?: Notice[];
  count: number;
  shopId?: string;
  imageUrl?: string;
  name?: string;
  address1?: string;
  originalHourlyPay?: number;
  startDate?: string;
  endData?: string;
}

/** item 래핑 유무와 상관없이 화면에 렌더 가능한지 체크 */
function hasRenderable(n: any) {
  const obj = n?.item ?? n;
  return Boolean(
    obj &&
      obj.id &&
      obj.startsAt &&
      (typeof obj.workhour === "number" || typeof obj.workhour === "string") &&
      obj.shop?.item &&
      (obj.shop.item.name || obj.shop.item.imageUrl || obj.shop.item.address1)
  );
}

export default function NoticeList({ type, items, count }: Props) {
  const source = (items ?? []).filter(hasRenderable);

  if (source.length === 0) {
    return (
      <ListWrap $type={type}>
        <NotFoundNotice />
      </ListWrap>
    );
  }

  return (
    <ListWrap $type={type}>
      {source.slice(0, count).map((n, idx) => {
        // 래핑 유무 정규화
        const item = n?.item ?? n;
        const shopItem = item.shop.item ?? {};

        const noticeId = String(item.id ?? `recent-${idx}`);
        const imageUrl = String(shopItem.imageUrl ?? "");
        const name = String(shopItem.name ?? "");
        const startsAt = String(item.startsAt ?? "");
        const workhour = Number(item.workhour ?? 0);
        const address1 = String(shopItem.address1 ?? "");
        const hourlyPay = Number(item.hourlyPay ?? 0);
        const originalHourlyPay = Number(shopItem.originalHourlyPay ?? 0);

        return (
          <li key={noticeId}>
            <Post
              id={noticeId}
              imageUrl={imageUrl}
              name={name}
              startsAt={startsAt}
              workhour={workhour}
              address1={address1}
              hourlyPay={hourlyPay}
              originalHourlyPay={originalHourlyPay}
            />
          </li>
        );
      })}
    </ListWrap>
  );
}
