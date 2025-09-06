import Image from "next/image";
import style from "./CustomCard.module.css";
import { useEffect, useState } from "react";

type CardType = {
  imageSrc: string; // 이미지
  storeName: string; // 가게 이름
  date: string; //rfc3339형식의 날짜 "2023-05-15T10:00:00+09:00"
  workhour: number; // 몇시간 일할건지
  location: string; // 위치
  hourlyPay: string; // 시급 15,000
  raisePercent: string; // 시급 상승률
  handleClick: () => void; // 클릭 핸들 이벤트
};

function dateCalc(value: string) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}

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

const CustomCard = ({
  imageSrc,
  storeName,
  date,
  workhour,
  location,
  hourlyPay,
  raisePercent,
  handleClick,
}: CardType) => {
  const [disabled, setDisabled] = useState(false);
  const [now, setNow] = useState(new Date().getTime());
  const setDate = new Date(date).getTime();

  // 1분마다 고의적으로 리랜더링 발생 시킴
  //단점 => 매초 리랜더링이 발생하기에 많은 데이터를 받아와야한다. => 서버 과부화
  //화면이 전환됐을때만 리랜더링 발생하게 해라  => 마운트 됐을때만 딱한번 리랜더링

  useEffect(() => {
    const timerId = setInterval(() => {
      setNow(new Date().getTime());
    }, 60000);

    setDisabled(setDate - now <= 0);

    return () => clearInterval(timerId);
  }, [now, setDate]);

  return (
    <button
      className={style.container}
      disabled={disabled}
      onClick={handleClick}
    >
      <div className={style["image-container"]}>
        <Image
          className={style.image}
          src={imageSrc}
          width={280}
          height={160}
          alt={`${storeName} 이미지`}
          priority
        />
        {disabled && <div className={style.overlay}>지난 공고</div>}
      </div>
      <div className={style["text-container"]}>
        <div className={style["store-info"]}>
          <h3 className={style["store-name"]}>{storeName}</h3>
          <div className={style["store-part-time-container"]}>
            <svg
              className={style["part-time-logo"]}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 0C15.5225 0 20 4.47754 20 10C20 15.5225 15.5225 20 10 20C4.47754 20 0 15.5225 0 10C0 4.47754 4.47754 0 10 0ZM8.61328 4.96745H9.83561C10.0586 4.96745 10.2425 5.15137 10.2425 5.37435V10.0846H14.541C14.7656 10.0846 14.9479 10.2686 14.9479 10.4915V11.7139C14.9479 11.9385 14.764 12.1208 14.541 12.1208H8.20475V5.37435C8.20475 5.14974 8.38867 4.96745 8.61328 4.96745ZM10 2.27051C14.2692 2.27051 17.7295 5.73079 17.7295 10C17.7295 14.2692 14.2692 17.7295 10 17.7295C5.73079 17.7295 2.27051 14.2692 2.27051 10C2.27051 5.73242 5.73079 2.27051 10 2.27051Z"
                fill="currentColor"
              />
            </svg>

            <div className={style["part-time-text"]}>
              <h3 className={style.date}>{dateCalc(date)} &nbsp;</h3>
              <h3 className={style.time}>
                {timeCalc(date)}~{timeCalc(date, workhour)} ({workhour}시간)
              </h3>
            </div>
          </div>
          <div className={style["location-container"]}>
            <svg
              className={style["location-logo"]}
              width="20"
              height="20"
              viewBox="0 0 16 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.6423 2.3595C12.8827 1.59292 11.9954 0.99871 11.0035 0.592131C8.01852 -0.626815 4.61852 0.0713425 2.3428 2.36266C0.833228 3.88686 0 5.82739 0 7.83396C0 9.83738 0.832706 11.78 2.3428 13.3026L3.17342 14.1324C4.8404 15.7929 6.27793 17.2266 7.51132 19.2195L7.99111 20L8.47403 19.2195C9.70742 17.2266 11.1449 15.7929 12.8091 14.1342L13.642 13.3C16.7859 10.1305 16.7859 5.52923 13.6423 2.3595ZM10.4738 10.695C9.10338 12.0787 6.88196 12.0787 5.51126 10.695C4.14108 9.31607 4.14108 7.0766 5.51126 5.69502C6.88196 4.31607 9.10338 4.31607 10.4738 5.69502C11.8411 7.0766 11.8411 9.31554 10.4738 10.695Z"
                fill="currentColor"
              />
            </svg>

            <h3 className={style["location"]}>{location}</h3>
          </div>
        </div>
        <div className={style["pay-container"]}>
          <h3 className={style["pay"]}>{hourlyPay}원</h3>
          <div className={style["pay-text-container"]}>
            <h3 className={style["pay-text"]}>{raisePercent}</h3>
            <svg
              className={style.arrow}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5001 16.6668H7.50013V10.0001H3.4668L10.0001 3.4668L16.5335 10.0001H12.5001V16.6668Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
};

export default CustomCard;
