interface FilterTagProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function FilterTag({ label, isActive, onClick }: FilterTagProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
}
