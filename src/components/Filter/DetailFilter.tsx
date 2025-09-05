import { useState } from 'react';

interface DetailFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
}

interface FilterOptions {
  location: string;
  hourlyPay: { min: number; max: number };
  workDate: string;
  workTime: string;
}

export default function DetailFilter({ onFilterChange }: DetailFilterProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    location: '',
    hourlyPay: { min: 0, max: 100000 },
    workDate: '',
    workTime: '',
  });

  const handleFilterUpdate = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">상세 필터</h3>
      
      <div className="space-y-4">
        {/* 지역 필터 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            지역
          </label>
          <select
            value={filters.location}
            onChange={(e) => handleFilterUpdate('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">전체</option>
            <option value="서울">서울</option>
            <option value="경기">경기</option>
            <option value="인천">인천</option>
          </select>
        </div>

        {/* 시급 필터 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            시급 범위
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="최소"
              value={filters.hourlyPay.min || ''}
              onChange={(e) => handleFilterUpdate('hourlyPay', {
                ...filters.hourlyPay,
                min: parseInt(e.target.value) || 0
              })}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <span>~</span>
            <input
              type="number"
              placeholder="최대"
              value={filters.hourlyPay.max || ''}
              onChange={(e) => handleFilterUpdate('hourlyPay', {
                ...filters.hourlyPay,
                max: parseInt(e.target.value) || 100000
              })}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 근무일 필터 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            근무일
          </label>
          <input
            type="date"
            value={filters.workDate}
            onChange={(e) => handleFilterUpdate('workDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
