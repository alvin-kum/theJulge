import { getRecentNotices } from "@/utils/recentNotice";
import { RecentWrap, Title } from "./noticeRecent.style";
import NoticeList from "./noticeRecentList";
export default function NoticeRecent() {
  const items = getRecentNotices();
  console.log(items);
  return (
    <RecentWrap>
      <Title>최근에 본 공고</Title>
      <NoticeList type="entire" count={6} items={items} />
    </RecentWrap>
  );
}
