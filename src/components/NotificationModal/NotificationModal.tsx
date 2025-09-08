import Image from "next/image";
import NotificationList from "./NotificationList";
import style from "./NotificationModal.module.css";

/**
 * 커스텀 헤더에서 전달받은 props중 총 개수를 나타내는 데이터를
 * 아래 {6}이라고 되어 있는 부분에 6을 제거하고 넣어주시면 됩니다.
 *
 * 그리고 props들을 아래의 있는 <NotificationList /> 이부분에
 * 다시한번 props로 전달해주시면 됩니다.
 */

const NotificationModal = ({
  handleModalOpenClick,
}: {
  handleModalOpenClick: () => void;
}) => {
  return (
    <div className={style.container}>
      <div className={style.modal_header_container}>
        <div className={style.total_notification}>알림 {6}개</div>
        <Image
          className={style.close_btn}
          src={"/close.svg"}
          width={24}
          height={24}
          alt="닫기 버튼"
          onClick={handleModalOpenClick}
        />
      </div>
      <NotificationList />
    </div>
  );
};

export default NotificationModal;
