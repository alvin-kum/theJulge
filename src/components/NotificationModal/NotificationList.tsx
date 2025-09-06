import NotificationCard from "./NotificationCard";
import style from "./NotificationList.module.css";

/**
 * 여기에 NotificationModal에서 전달받은 props를 마지막으로
 * 다시한번 아래의 NotificationCard에 전달해주면 됩니다!
 * 아래의 mockArray는 임시로 넣어놓은 가짜 배열입니다.
 * 나중에 props받아오시면 NotificationsList안쪽에 호출하셔서 mockArray.map()이부분에서
 * mockArray 이부분을 받아온 데이터로 바꿔주시면 됩니다!
 * map(data,idx)이부분에서 idx는 실제 데이터를 받아와서 data안에 고유값이 있는 부분을 key값으로 설정해주신 후에 삭제해주시면 됩니다!
 */
const mockArray = Array.from({ length: 10 }, (_, i) => ({
  data1: "",
  data2: "",
}));

const NotificationList = () => {
  return (
    <div className={style.container}>
      {mockArray.map((data, idx) => (
        <NotificationCard key={`고유값_${idx}`} {...data} />
      ))}
    </div>
  );
};

export default NotificationList;
