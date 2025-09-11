import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { typography } from "@/styles/typography";
// import { apiClient } from "@/lib/api/client"; // 서버 붙일 때 주석 해제

interface ApplicationListProps {
  userId: string;
}

interface ApplicationItem {
  id: string;
  status: "pending" | "accepted" | "rejected" | "canceled";
  createdAt: string;
  shop: {
    item: {
      id: string;
      name: string;
    };
  };
  notice: {
    item: {
      id: string;
      startsAt: string;
      workhour: number;
      hourlyPay: number;
      description: string;
    };
  };
}

const Wrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  overflow-x: auto;
`;

const TableWrapper = styled.div`
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  ${typography.body1Regular}

  thead {
    background-color: #fff4f2;
  }

  td {
  ${typography.body2Regular}
  }

  th,
  td {
    border-bottom: 1px solid #ddd;
    padding: 12px 16px;
    text-align: left;
    white-space: nowrap;
  }

  th:first-child {
    position: sticky;
    left: 0;
    z-index: 1;
    min-width: 120px;
  }

  td:first-child {
    position: sticky;
    left: 0;
    background-color: #fff; 
    z-index: 1;
    min-width: 120px;
  }

  /* 태블릿 이하에서는 "시급" 숨김 */
  @media (max-width: 744px) {
    th:nth-child(3),
    td:nth-child(3) {
      display: none;
    }
  }

  /* 모바일에서는 "일자, 시급" 숨김 */
  @media (max-width: 480px) {
    th:nth-child(2),
    td:nth-child(2),
    th:nth-child(3),
    td:nth-child(3) {
      display: none;
    }
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 10px;
  border-radius: 999px;
  ${typography.body2Bold}
  display: inline-block;
  text-align: center;

  ${({ status }) => {
    switch (status) {
      case "accepted":
        return "background: #CCE6FF; color: #0080FF;";
      case "rejected":
        return "background: #FFEBE7; color: #FF4040;";
      case "pending":
        return "background: #D4F7D4; color: #20A81E;";
      case "canceled":
        return "background: #F0F0F0; color: #666;";
      default:
        return "";
    }
  }}
`;

const Message = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 16px;
  color: #666;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 16px;

  button {
    min-width: 32px;
    height: 32px;
    border-radius: 6px;
    border: 1px solid #ddd;
    background: #fff;
    font-size: 14px;
    cursor: pointer;
  }

  button.active {
    background: #ff8d72;
    color: #fff;
    border-color: #ff8d72;
  }

  button.ghost {
    background: transparent;
    border: none;
    font-size: 18px;
    color: #666;
    cursor: pointer;
  }
`;

const ApplicationList: React.FC<ApplicationListProps> = ({ userId }) => {
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 5; // 한 페이지에 보여줄 개수

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);

        // 🚧 서버 연동시 이 부분 사용
        /*
        const res = await apiClient.get<{
          items: { item: ApplicationItem }[];
          count: number;
        }>(`/users/${userId}/applications?limit=${limit}&offset=${(page - 1) * limit}`);
        
        const items = res.items?.map((entry: any) => entry.item) || [];
        setApplications(items);
        setTotalCount(res.count || 0);
        */

        // ✅ 목업 데이터 (테스트용)
        const mockItems: ApplicationItem[] = [
          {
            id: "1",
            status: "accepted",
            createdAt: "2023-01-12T10:00:00Z",
            shop: { item: { id: "s1", name: "HS 과일주스" } },
            notice: {
              item: {
                id: "n1",
                description: "주말 알바",
                startsAt: "2023-01-12T10:00:00Z",
                workhour: 2,
                hourlyPay: 15000,
              },
            },
          },
          {
            id: "2",
            status: "accepted",
            createdAt: "2023-01-12T10:00:00Z",
            shop: { item: { id: "s2", name: "써니 브런치 레스토랑" } },
            notice: {
              item: {
                id: "n2",
                description: "평일 서빙 알바",
                startsAt: "2023-01-12T10:00:00Z",
                workhour: 2,
                hourlyPay: 15000,
              },
            },
          },
          {
            id: "3",
            status: "rejected",
            createdAt: "2023-01-12T10:00:00Z",
            shop: { item: { id: "s3", name: "수리 에스프레소 샵" } },
            notice: {
              item: {
                id: "n3",
                description: "바리스타 단기 알바",
                startsAt: "2023-01-12T10:00:00Z",
                workhour: 2,
                hourlyPay: 15000,
              },
            },
          },
          {
            id: "4",
            status: "pending",
            createdAt: "2023-01-12T10:00:00Z",
            shop: { item: { id: "s4", name: "너구리네 라면집" } },
            notice: {
              item: {
                id: "n4",
                description: "라면 조리 단기",
                startsAt: "2023-01-12T10:00:00Z",
                workhour: 2,
                hourlyPay: 15000,
              },
            },
          },
          {
            id: "5",
            status: "pending",
            createdAt: "2023-01-12T10:00:00Z",
            shop: { item: { id: "s5", name: "초가을집" } },
            notice: {
              item: {
                id: "n5",
                description: "홀서빙",
                startsAt: "2023-01-12T10:00:00Z",
                workhour: 2,
                hourlyPay: 15000,
              },
            },
          },
        ];

        setApplications(mockItems);
        setTotalCount(20); // 전체 데이터 수 (테스트용)
      } catch (err) {
        console.error("지원 내역 불러오기 실패", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [userId, page]);

  const formatDateTime = (datetime: string) => {
    const d = new Date(datetime);
    return `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d
      .getDate()
      .toString()
      .padStart(2, "0")} ${d
      .getHours()
      .toString()
      .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
  };

  const totalPages = Math.ceil(totalCount / limit);

  if (loading) return <Message>불러오는 중...</Message>;
  if (applications.length === 0) return <Message>지원 내역이 없습니다.</Message>;

  return (
    <Wrapper>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>가게</th>
              <th>일자</th>
              <th>시급</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.shop.item.name}</td>
                <td>{formatDateTime(app.notice.item.startsAt)}</td>
                <td>{app.notice.item.hourlyPay.toLocaleString()}원</td>
                <td>
                  <StatusBadge status={app.status}>
                    {app.status === "accepted"
                      ? "승인 완료"
                      : app.status === "rejected"
                      ? "거절"
                      : app.status === "pending"
                      ? "대기중"
                      : "취소됨"}
                  </StatusBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      {/* ✅ 페이지네이션 */}
      <Pagination>
        <button
          className="ghost"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          ‹
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            className={p === page ? "active" : ""}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}
        <button
          className="ghost"
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          ›
        </button>
      </Pagination>
    </Wrapper>
  );
};

export default ApplicationList;
