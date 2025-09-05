// src/pages/notice/[id].tsx
import React from "react";
import styled from "styled-components";

const BREAKPOINTS = {
  mobile: 767, // ≤ 767
  tablet: 1199, // 768 ~ 1199
  // desktop: ≥ 1200
};

export default function noticeDetailPage() {
  // ✨ 실제 데이터 대신 화면만 확인 가능한 목업 텍스트/이미지
  const mock = {
    title: "도토리 식당 주말 알바 모집",
    status: "모집중",
    wage: "15,000원",
    badge: "시급",
    image:
      "https://images.unsplash.com/photo-1533777857889-4bea1a7fcb0d?q=80&w=1600&auto=format&fit=crop",
    summary: [
      { label: "근무지역", value: "서울시 마포구" },
      { label: "근무요일", value: "토, 일" },
      { label: "근무시간", value: "11:00 ~ 20:00 (휴게 1h)" },
      { label: "모집인원", value: "2명" },
    ],
    description:
      "홀/서빙 보조, 기본 정리정돈. 성실하고 밝은 분을 찾습니다. 유니폼 지급, 식사 제공.",
    notice:
      "초보 가능 / 장기 근무 가능자 우대. 지원 시 간단한 자기소개를 함께 남겨주세요.",
  };

  const applicants = [
    {
      name: "김지원",
      phone: "010-1234-5678",
      appliedAt: "2025-09-01",
      memo: "주말 장기 가능",
      status: "대기",
    },
    {
      name: "이서연",
      phone: "010-2222-3344",
      appliedAt: "2025-09-02",
      memo: "근거리 거주",
      status: "대기",
    },
    {
      name: "박현우",
      phone: "010-7777-8888",
      appliedAt: "2025-09-03",
      memo: "경력 有",
      status: "대기",
    },
    {
      name: "최유진",
      phone: "010-9999-0000",
      appliedAt: "2025-09-03",
      memo: "오픈/마감 가능",
      status: "대기",
    },
  ];

  return (
    <Wrap>
      <HeaderRow>
        <Breadcrumb>내 공고 &gt; 상세</Breadcrumb>
        <OwnerActions>
          <GhostButton>공고 종료</GhostButton>
          <PrimaryButton>공고 수정</PrimaryButton>
        </OwnerActions>
      </HeaderRow>

      <TitleRow>
        <Title>{mock.title}</Title>
        <Chip tone="primary">{mock.status}</Chip>
      </TitleRow>

      <Hero>
        <Thumb
          style={{ backgroundImage: `url(${mock.image})` }}
          role="img"
          aria-label="공고 이미지"
        />
        <HeroMeta>
          <PriceLine>
            <Price>
              {mock.wage}
              <UnitChip>{mock.badge}</UnitChip>
            </Price>
          </PriceLine>

          <KeyValues>
            {mock.summary.map((s) => (
              <KV key={s.label}>
                <K>{s.label}</K>
                <V>{s.value}</V>
              </KV>
            ))}
          </KeyValues>

          <ActionArea>
            <PrimaryButton>지원자 관리</PrimaryButton>
            <GhostButton>공고 미리보기</GhostButton>
          </ActionArea>
        </HeroMeta>
      </Hero>

      <Section>
        <SectionTitle>업무 내용</SectionTitle>
        <Paragraph>{mock.description}</Paragraph>
      </Section>

      <Section>
        <SectionTitle>유의 사항</SectionTitle>
        <Paragraph>{mock.notice}</Paragraph>
      </Section>

      <Section>
        <SectionTitle>신청자 목록</SectionTitle>

        {/* 데스크탑/태블릿: 테이블, 모바일: 카드 리스트 */}
        <ApplicantsCard>
          <ApplicantsTable>
            <thead>
              <tr>
                <th>이름</th>
                <th className="hide-mobile">메모</th>
                <th>연락처</th>
                <th className="hide-mobile">신청일</th>
                <th>상태</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((a, i) => (
                <tr key={i}>
                  <td>{a.name}</td>
                  <td className="hide-mobile">{a.memo}</td>
                  <td>{a.phone}</td>
                  <td className="hide-mobile">{a.appliedAt}</td>
                  <td>
                    <Chip tone="muted">{a.status}</Chip>
                  </td>
                  <td>
                    <RowActions>
                      <SmallButton>승인</SmallButton>
                      <SmallGhost>거절</SmallGhost>
                    </RowActions>
                  </td>
                </tr>
              ))}
            </tbody>
          </ApplicantsTable>

          <ApplicantsCards>
            {applicants.map((a, i) => (
              <ApplicantCard key={i}>
                <CardHeader>
                  <strong>{a.name}</strong>
                  <Chip tone="muted">{a.status}</Chip>
                </CardHeader>
                <CardKV>
                  <span>연락처</span>
                  <b>{a.phone}</b>
                </CardKV>
                <CardKV>
                  <span>신청일</span>
                  <b>{a.appliedAt}</b>
                </CardKV>
                <CardKV>
                  <span>메모</span>
                  <b>{a.memo}</b>
                </CardKV>
                <RowActions style={{ marginTop: 12 }}>
                  <SmallButton>승인</SmallButton>
                  <SmallGhost>거절</SmallGhost>
                </RowActions>
              </ApplicantCard>
            ))}
          </ApplicantsCards>

          <Pagination>
            <button aria-label="이전 페이지" className="ghost">
              ‹
            </button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button aria-label="다음 페이지" className="ghost">
              ›
            </button>
          </Pagination>
        </ApplicantsCard>
      </Section>
    </Wrap>
  );
}

/* ======================= styled ======================= */

const Wrap = styled.div`
  --text: var(--color-text, #111827);
  --border: var(--color-border, #e5e7eb);
  --accent: var(--color-accent, #ff6b3d);
  --muted: #6b7280;
  --bg: #ffffff;

  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 16px 64px;
  color: var(--text);
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
`;

const Breadcrumb = styled.div`
  font-size: 14px;
  color: var(--muted);
`;

const OwnerActions = styled.div`
  display: flex;
  gap: 8px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 8px 0 16px;

  @media (max-width: ${BREAKPOINTS.mobile}px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 6px;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  line-height: 1.25;
  font-weight: 700;

  @media (max-width: ${BREAKPOINTS.tablet}px) {
    font-size: 24px;
  }
  @media (max-width: ${BREAKPOINTS.mobile}px) {
    font-size: 20px;
  }
`;

const Chip = styled.span<{ tone?: "primary" | "muted" }>`
  display: inline-flex;
  align-items: center;
  height: 26px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 12px;
  border: 1px solid
    ${({ tone }) => (tone === "primary" ? "var(--accent)" : "var(--border)")};
  color: ${({ tone }) => (tone === "primary" ? "var(--accent)" : "#374151")};
  background: ${({ tone }) => (tone === "primary" ? "#fff5ef" : "#fff")};
`;

const Hero = styled.section`
  display: grid;
  grid-template-columns: 44% 1fr;
  gap: 24px;
  margin-bottom: 28px;

  @media (max-width: ${BREAKPOINTS.tablet}px) {
    grid-template-columns: 1fr;
  }
`;

const Thumb = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  border: 1px solid var(--border);
`;

const HeroMeta = styled.div`
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
`;

const PriceLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UnitChip = styled.span`
  display: inline-flex;
  height: 20px;
  align-items: center;
  padding: 0 8px;
  margin-left: 8px;
  font-size: 11px;
  color: #fff;
  background: var(--accent);
  border-radius: 6px;
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: var(--accent);

  @media (max-width: ${BREAKPOINTS.mobile}px) {
    font-size: 20px;
  }
`;

const KeyValues = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 16px;
  margin-top: 16px;

  @media (max-width: ${BREAKPOINTS.mobile}px) {
    grid-template-columns: 1fr;
  }
`;

const KV = styled.div`
  display: grid;
  grid-template-columns: 88px 1fr;
  gap: 8px;
  font-size: 14px;

  @media (max-width: ${BREAKPOINTS.mobile}px) {
    grid-template-columns: 84px 1fr;
    font-size: 13px;
  }
`;
const K = styled.span`
  color: var(--muted);
`;
const V = styled.span`
  font-weight: 500;
`;

const ActionArea = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 18px;
  flex-wrap: wrap;
`;

const Section = styled.section`
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  margin-top: 16px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 12px;
  font-size: 18px;
`;

const Paragraph = styled.p`
  margin: 0;
  line-height: 1.6;
  color: #374151;
  white-space: pre-line;
`;

const ApplicantsCard = styled.div`
  padding: 4px;
`;

const ApplicantsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  thead th {
    text-align: left;
    font-weight: 600;
    color: #374151;
    padding: 12px 10px;
    border-bottom: 1px solid var(--border);
    background: #fafafa;
  }

  tbody td {
    padding: 12px 10px;
    border-bottom: 1px solid var(--border);
    vertical-align: middle;
  }

  .hide-mobile {
    @media (max-width: ${BREAKPOINTS.mobile}px) {
      display: none;
    }
  }

  /* 모바일에서는 테이블 자체를 숨기고 카드로 대체 */
  @media (max-width: ${BREAKPOINTS.mobile}px) {
    display: none;
  }
`;

const ApplicantsCards = styled.div`
  display: none;

  @media (max-width: ${BREAKPOINTS.mobile}px) {
    display: grid;
    gap: 10px;
  }
`;

const ApplicantCard = styled.div`
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px;
  background: #fff;
  font-size: 14px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;

  strong {
    font-weight: 700;
  }
`;

const CardKV = styled.div`
  display: grid;
  grid-template-columns: 70px 1fr;
  gap: 8px;
  margin-top: 6px;

  span {
    color: var(--muted);
  }
`;

const Pagination = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
  margin-top: 12px;

  button {
    min-width: 32px;
    height: 32px;
    padding: 0 10px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: #fff;
    cursor: default; /* 기능 없음 */
  }
  button.active {
    background: #fff5ef;
    border-color: var(--accent);
    color: var(--accent);
    font-weight: 700;
  }
  button.ghost {
    color: #6b7280;
  }
`;

/* ------- Buttons ------- */
const PrimaryButton = styled.button`
  height: 40px;
  padding: 0 14px;
  border-radius: 10px;
  font-weight: 600;
  border: 1px solid var(--accent);
  background: var(--accent);
  color: #fff;
  cursor: default; /* 기능 제거 */

  @media (max-width: ${BREAKPOINTS.mobile}px) {
    height: 36px;
  }
`;

const GhostButton = styled.button`
  height: 40px;
  padding: 0 14px;
  border-radius: 10px;
  font-weight: 600;
  border: 1px solid var(--border);
  background: #fff;
  color: #374151;
  cursor: default;

  @media (max-width: ${BREAKPOINTS.mobile}px) {
    height: 36px;
  }
`;

const RowActions = styled.div`
  display: inline-flex;
  gap: 6px;
`;

const SmallButton = styled(PrimaryButton)`
  height: 30px;
  padding: 0 10px;
  border-radius: 8px;
  font-size: 13px;
`;

const SmallGhost = styled(GhostButton)`
  height: 30px;
  padding: 0 10px;
  border-radius: 8px;
  font-size: 13px;
`;
