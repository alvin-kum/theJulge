import { useEffect } from "react";
import style from "./NotificationCard.module.css";

type Alert = {
  item: {
    id: string;
    createdAt: string;
    result: "accepted" | "rejected";
    read: boolean;
    application: {
      item: {
        id: string;
        status: "pending" | "accepted" | "rejected";
      };
      href: string;
    };
    shop: {
      item: {
        id: string;
        name: string;
        category: string;
        address1: string;
        address2: string;
        description: string;
        imageUrl: string;
        originalHourlyPay: number;
      };
      href: string;
    };
    notice: {
      item: {
        id: string;
        hourlyPay: number;
        description: string;
        startsAt: string;
        workhour: number;
        closed: boolean;
      };
      href: string;
    };
  };
};

/**
 * 여기서 최종적으로 값을 넣어주면 됩니다!
 * 바로 아래에 있는 dateCalc와 timeCalc, getMinutes 같은 것들은 일단 건너뛰시고
 * 제일 아래에 있는 NotificationCard 함수 부분의 위쪽에 적힌 주석부터 봐주시면됩니다!
 */

// rfc3339형식의 날짜 ex)"2023-05-15T10:00:00+09:00" 를 받아오는 데이터를 여기에 넣어서 가공한 후
// 이래의 주석에 나와있는 3번 항목을 진행해주시면 됩니다.

// 날짜 계산하는 함수입니다.
// value값에 rfc3339형식의 날짜데이터를 넣으면 됩니다.
// 2013-01-14 부분에 {dateCalc(date)}이런식으로 넣어주시면 됩니다.
function dateCalc(value: string) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const months = String(month).padStart(2, "0");
  const days = String(day).padStart(2, "0");

  return `${year}-${months}-${days}`;
}

// 시간 계산하는 함수입니다.
// value값에는 rfc3339형식의 날짜데이터, 총 알바시간이 담긴 데이터를 넣으면 됩니다.
// 15:00~18:00 부분에 {timeCalc(date)}~{timeCalc(date, workhour)} 이런식으로 넣어주시면 됩니다.
function timeCalc(value: string, range: number = 0) {
  const date = new Date(value);
  let hour = date.getHours() + range;
  const minutes = String(date.getMinutes()).padStart(2, "0");

  if (hour > 23) {
    hour = hour - 24;
  }
  const hours = String(hour).padStart(2, "0");

  return `${hours}:${minutes}`;
}

// 공고 생성으로부터 몇분이 지났는지 계산하는 함수입니다.
// value값에는 createAt의 값을 받아와서 넣어주시면 됩니다.
// {1}분전 부분에 {getMinutesAgo(data)}분전 이런 식으로 사용하시면 됩니다.
function getMinutesAgo(createAt: string) {
  const createDate = new Date(createAt);
  const now = new Date();
  const timeDiff = now.getTime() - createDate.getTime();
  const result = Math.floor(timeDiff / 60000);

  return result;
}

const NotificationCard = ({
  alert,
}: {
  alert: any; // !!!!! any 대신에 올바른 타입을 넣어주는게 좋습니다.
}) => {
  const agoTime =
    getMinutesAgo(alert.item.createdAt) / 60 >= 1
      ? Math.floor(getMinutesAgo(alert.item.createdAt) / 60)
      : getMinutesAgo(alert.item.createdAt);
  return (
    <div className={style.container}>
      <div
        className={`${style.dot} ${
          alert.item.result === "accepted"
            ? style.dot_approve
            : style.dot_reject
        }`}
      ></div>
      <div className={style.text_container}>
        <span>
          {alert.item.shop.item.name}(
          {dateCalc(alert.item.notice.item.startsAt)} &nbsp;
        </span>
        <span>
          {timeCalc(alert.item.notice.item.startsAt)}~
          {timeCalc(
            alert.item.notice.item.startsAt,
            alert.item.notice.item.workhour
          )}
          )
        </span>
        <span> 공고 지원이</span>
        <span
          className={
            alert.item.result === "accepted" ? style.approve : style.reject
          }
        >
          {" "}
          {alert.item.result === "accepted" ? "승인" : "거절"}
        </span>
        <span>되었어요.</span>
      </div>
      <div className={style.time}>
        {agoTime}
        {Math.floor(getMinutesAgo(alert.item.createdAt) / 60) >= 1
          ? "시간 전"
          : "분 전"}
      </div>
    </div>
  );
};

export default NotificationCard;
