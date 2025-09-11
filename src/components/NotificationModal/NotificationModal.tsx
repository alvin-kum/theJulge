import Image from "next/image";
import NotificationList from "./NotificationList";
import style from "./NotificationModal.module.css";

type Alerts = {
  count: number;
  items: {
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
  }[];
};

const NotificationModal = ({
  alerts,
  handleModalOpenClick,
}: {
  alerts: any; // !!!! any 대신에 올바른 타입을 넣어주는게 좋습니다.
  handleModalOpenClick: () => void;
}) => {
  return (
    <div className={style.container}>
      <div className={style.modal_header_container}>
        <div className={style.total_notification}>
          {`알림 ${alerts ? alerts!.count : "0"}개`}
        </div>
        <Image
          className={style.close_btn}
          src={"/close.svg"}
          width={24}
          height={24}
          alt="닫기 버튼"
          onClick={handleModalOpenClick}
        />
      </div>
      <NotificationList alerts={alerts} />
    </div>
  );
};

export default NotificationModal;
