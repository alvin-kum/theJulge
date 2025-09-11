import NotificationCard from "./NotificationCard";
import style from "./NotificationList.module.css";

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

const NotificationList = ({
  alerts,
}: {
  alerts: any; // !!!!! any 대신에 올바른 타입을 넣어주시는게 좋습니다.
}) => {
  return (
    <div className={style.container}>
      {alerts?.items.map((alert) => (
        <NotificationCard key={alert.item.id} alert={alert} />
      ))}
    </div>
  );
};

export default NotificationList;
