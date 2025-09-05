export interface Alert {
  id: string;
  type: 'application' | 'notice' | 'system';
  content: string;
  read: boolean;
  createdAt: string;
  relatedId?: string; // 관련된 공고나 지원서 ID
}

export interface AlertFilters {
  type?: 'application' | 'notice' | 'system';
  read?: boolean;
  startDate?: string;
  endDate?: string;
}

export type AlertType = 'application' | 'notice' | 'system';
