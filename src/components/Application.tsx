import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { typography } from "@/styles/typography";
import { getMyApplications } from "@/lib/api/application";

interface ApplicationListProps {
  userId: string;
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
    background-color: #FFEBE7;
  }

  thead th {
    background-color: #FFEBE7 !important;
  }

  td {
    ${typography.body2Regular}
    background-color: #FFFFFF;
  }

  th,
  td {
    border-bottom: 1px solid #ddd;
    padding: 12px 16px;
    text-align: left;
    white-space: nowrap;
  }

  th:first-child,
  td:first-child {
    position: sticky;
    left: 0;
    z-index: 1;
    min-width: 120px;
    background-color: #fff;
  }

  @media (max-width: 744px) {
    th:nth-child(3),
    td:nth-child(3) {
      display: none;
    }
  }

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

const EmptyState = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 48px 24px;
  text-align: center;
  background: #fff;
  margin-top: 20px;
`;

const EmptyMessage = styled.div`
  margin-bottom: 20px;
  color: #333;
  font-size: 16px;
`;

const GoButton = styled.button`
  background-color: #ea3a00;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
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
  const router = useRouter();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const limit = 5; // ✅ 페이지당 최대 5개로 제한

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (!userId) return;
        setLoading(true);
        const offset = (page - 1) * limit;
        const res = await getMyApplications(userId, { limit, offset });
        const items = res.items;
        setApplications(items);
        setTotalCount(res.count);
      } catch (err) {
        console.error("❌ 지원 내역 불러오기 실패", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [page, userId]);

  const formatDateTime = (datetime: string) => {
    const d = new Date(datetime);
    return `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d
      .getDate()
      .toString()
      .padStart(2, "0")} ${d.getHours().toString().padStart(2, "0")}:${d
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const totalPages = Math.ceil(totalCount / limit);

  if (loading) return <Message>불러오는 중...</Message>;
  if (applications.length === 0)
    return (
      <EmptyState>
        <EmptyMessage>아직 신청 내역이 없어요.</EmptyMessage>
        <GoButton onClick={() => router.push("/")}>공고 보러가기</GoButton>
      </EmptyState>
    );

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
                <td>{app.shop?.item?.name}</td>
                <td>{formatDateTime(app.notice?.item.startsAt)}</td>
                <td>{app.notice?.item.hourlyPay.toLocaleString()}원</td>
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
