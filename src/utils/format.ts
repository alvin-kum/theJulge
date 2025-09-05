// 숫자를 천 단위 콤마로 포맷팅
export const formatNumber = (num: number): string => {
  return num.toLocaleString('ko-KR');
};

// 시급을 포맷팅 (원 단위 추가)
export const formatHourlyPay = (pay: number): string => {
  return `${formatNumber(pay)}원`;
};

// 날짜를 한국어 형식으로 포맷팅
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// 시간을 한국어 형식으로 포맷팅
export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// 날짜와 시간을 함께 포맷팅
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// 상대적 시간 포맷팅 (예: 2시간 전, 1일 전)
export const formatRelativeTime = (dateString: string): string => {
  const now = new Date();
  const target = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return '방금 전';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}분 전`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}시간 전`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}일 전`;
  } else {
    return formatDate(dateString);
  }
};

// 전화번호 포맷팅 (010-1234-5678)
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return phone;
};

// 텍스트 길이 제한 및 생략 표시
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
};

// 급여 인상률 계산
export const calculateRaisePercent = (originalPay: number, currentPay: number): string => {
  if (originalPay === 0) return '0%';
  const raisePercent = Math.round(((currentPay - originalPay) / originalPay) * 100);
  return `${raisePercent}%`;
};
