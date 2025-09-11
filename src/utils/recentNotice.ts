import { Notice } from "@/lib/api/notice";

export const getRecentNotices = () => {
  const recentNotices = localStorage.getItem("recent_notice");
  return recentNotices ? JSON.parse(recentNotices) : [];
};

export const addNewNotice = (newNotice: Notice) => {
  const recentNotices = getRecentNotices();

  const existingIndex = recentNotices.findIndex(
    (notice: Notice) => notice.id === newNotice.id
  );

  if (existingIndex !== -1) {
    // 이미 최근 본 공고 목록에 있는 경우 해당 공고를 맨 앞으로 이동
    const [existingNotice] = recentNotices.splice(existingIndex, 1);
    recentNotices.unshift(existingNotice);
  } else {
    // 최근 본 공고 목록에 없는 경우 맨 앞에 추가
    recentNotices.unshift(newNotice);
  }

  const maxLength = 6;

  if (recentNotices.length > maxLength) {
    recentNotices.splice(maxLength);
  }

  localStorage.setItem("recent_notice", JSON.stringify(recentNotices));
};
