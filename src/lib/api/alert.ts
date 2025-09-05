import axios from "axios";

export interface Alert {
  id: string;
  type: "application" | "notice";
  content: string;
  read: boolean;
  createdAt: string;
  item: {
    id: string;
    type: "application" | "notice";
    content: string;
    read: boolean;
    createdAt: string;
  };
}

// 알림 목록 조회
export const getAlerts = async (params?: {
  offset?: number;
  limit?: number;
}): Promise<{
  items: Alert[];
  count: number;
  hasNext: boolean;
}> => {
  const response = await axios.get("/user/alerts", { params });
  return response.data;
};

// 알림 읽음 처리
export const markAlertAsRead = async (
  alertId: string
): Promise<{ item: Alert }> => {
  const response = await axios.put(`/user/alerts/${alertId}`);
  return response.data;
};

// 모든 알림 읽음 처리
export const markAllAlertsAsRead = async (): Promise<void> => {
  await axios.put("/user/alerts/read-all");
};

// 읽지 않은 알림 개수 조회
export const getUnreadAlertCount = async (): Promise<{ count: number }> => {
  const response = await axios.get("/user/alerts/count");
  return response.data;
};
