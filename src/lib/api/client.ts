const API_BASE_URL = 'https://bootcamp-api.codeit.kr/api/17-3/the-julge';

interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

class ApiClient {
  private getAuthHeaders() {
    if (typeof window === 'undefined') return {};
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    let errorData: any = null;
    
    try {
      // 응답을 JSON으로 파싱 시도
      const data = await response.json();
      
      if (!response.ok) {
        // 에러 응답이지만 JSON 파싱 성공
        throw {
          message: data.message || `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          code: data.code || 'API_ERROR'
        } as ApiError;
      }
      
      return data;
    } catch (jsonError) {
      if (!response.ok) {
        // JSON 파싱 실패한 에러 응답
        throw {
          message: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          code: 'PARSE_ERROR'
        } as ApiError;
      }
      
      // 성공 응답인데 JSON 파싱 실패 (빈 응답일 수 있음)
      return {} as T;
    }
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      return await this.handleResponse<T>(response);
    } catch (error: any) {
      // 네트워크 에러 또는 기타 에러
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw {
          message: 'Network connection failed. Please check your internet connection.',
          status: 0,
          code: 'NETWORK_ERROR'
        } as ApiError;
      }
      
      // 이미 처리된 API 에러는 그대로 throw
      if (error.status !== undefined) {
        throw error;
      }
      
      // 기타 예상치 못한 에러
      throw {
        message: error.message || 'An unexpected error occurred',
        status: 0,
        code: 'UNKNOWN_ERROR'
      } as ApiError;
    }
  }

  // 재시도 로직이 있는 안전한 GET
  async safeGet<T>(endpoint: string, retries: number = 1): Promise<{ data: T | null; error: ApiError | null }> {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const data = await this.get<T>(endpoint);
        return { data, error: null };
      } catch (error: any) {
        if (attempt === retries) {
          return { data: null, error };
        }
        
        // 500 에러나 네트워크 에러는 재시도
        if (error.status === 500 || error.code === 'NETWORK_ERROR') {
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
          continue;
        }
        
        // 404나 기타 에러는 재시도하지 않음
        return { data: null, error };
      }
    }
    
    return { data: null, error: { message: 'Max retries exceeded', status: 0, code: 'MAX_RETRIES' } };
  }

  get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  post<T>(endpoint: string, data?: any) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  put<T>(endpoint: string, data?: any) {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
export type { ApiError };