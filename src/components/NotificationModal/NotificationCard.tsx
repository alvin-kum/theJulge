import style from "./NotificationCard.module.css";

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

  return `${year}-${month}-${day}`;
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

/**
 * NotificationCard안에 받아온 props를 뿌려주기만 하면 됩니다.
 *
 * 1. 두번째 div안에 true ? style.dot_approve ... 되어있는 부분중 true를 승인인지 거절인지 true / false로 데이터를 넣어주면됩니다.
 * 2. HS 과일주스 라고 되어있는 부분을 지원한 가게의 이름이 저장된 데이터의 변수값을 넣어주면 됩니다.
 * 3. span태그 안에 알바 시간관련 데이터를 넣어주시면 됩니다. 위의 함수를 참고해주시면 됩니다.
 * 4. 그다음줄에 있는 span className={true ? style.approve ... } 로 되어있는 부분중 true를 1번과 똑같은 데이터 설정을 해주시면 됩니다.
 * 5. 4번과 같은 줄에 있는 승인이라고 적혀있는 문자를 1번 4번과 같은 작업을 해주면 됩니다.
 * 6. 마지막 div에 {1}분전이라고 적혀있는 문자중에 {1}이 부분의 숫자를 데이터로 변경해주세요. 위의 getMinutesAgo함수를 참고해주세요.
 * 7. 이상입니다!
 */

const NotificationCard = () => {
  return (
    <div className={style.container}>
      <div
        className={`${style.dot} ${
          true ? style.dot_approve : style.dot_reject
        }`}
      ></div>
      <div className={style.text_container}>
        <span>HS 과일주스({"2023-01-14"} &nbsp;</span>
        <span>{"15:00~18:00"})</span>
        <span> 공고 지원이</span>
        <span className={true ? style.approve : style.reject}> 승인</span>
        <span>되었어요.</span>
      </div>
      <div className={style.time}>{1}분 전</div>
    </div>
  );
};

export default NotificationCard;
