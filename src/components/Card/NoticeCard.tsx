interface NoticeCardProps {
  id: string;
  title: string;
  shopName: string;
  date: string;
  workhour: number;
  location: string;
  hourlyPay: string;
  raisePercent?: string;
  imageSrc: string;
  onClick?: () => void;
}

export default function NoticeCard({
  id,
  title,
  shopName,
  date,
  workhour,
  location,
  hourlyPay,
  raisePercent,
  imageSrc,
  onClick,
}: NoticeCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        
        <div className="space-y-2">
          <p className="text-gray-600">{shopName}</p>
          <p className="text-sm text-gray-500">
            {new Date(date).toLocaleDateString('ko-KR')} • {workhour}시간
          </p>
          <p className="text-sm text-gray-500">{location}</p>
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-lg font-bold text-gray-900">
              시급 {hourlyPay}원
            </span>
            {raisePercent && (
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                {raisePercent} ↑
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
