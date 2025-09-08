// 이메일 형식 검증
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 비밀번호 검증 (최소 8자, 문자와 숫자 포함)
export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
};

// 전화번호 검증
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  return phoneRegex.test(phone);
};

// 필수 입력 필드 검증
export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

// 시급 검증 (최저시급 이상)
export const validateHourlyPay = (pay: number): boolean => {
  const minimumWage = 9620; // 2023년 최저시급 기준
  return pay >= minimumWage;
};

// 폼 데이터 종합 검증
export const validateForm = (formData: Record<string, any>, rules: Record<string, string[]>): Record<string, string> => {
  const errors: Record<string, string> = {};

  Object.keys(rules).forEach(field => {
    const value = formData[field];
    const fieldRules = rules[field];

    fieldRules.forEach(rule => {
      switch (rule) {
        case 'required':
          if (!validateRequired(value)) {
            errors[field] = '필수 입력 항목입니다.';
          }
          break;
        case 'email':
          if (value && !validateEmail(value)) {
            errors[field] = '올바른 이메일 형식이 아닙니다.';
          }
          break;
        case 'password':
          if (value && !validatePassword(value)) {
            errors[field] = '비밀번호는 8자 이상, 문자와 숫자를 포함해야 합니다.';
          }
          break;
        case 'phone':
          if (value && !validatePhone(value)) {
            errors[field] = '올바른 전화번호 형식이 아닙니다.';
          }
          break;
      }
    });
  });

  return errors;
};
