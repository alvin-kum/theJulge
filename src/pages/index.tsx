import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/store/queryClient";

export default function HomePage() {
  // TODO: 실제 공고 리스트 API 연동
  const { data } = useQuery({
    queryKey: queryKeys.notices(),
    queryFn: async () => ({ items: [] }),
  });

  return (
    <div>
      <h1>공고 리스트</h1>
      <ul>
        {data?.items?.map((n: any) => (
          <li key={n.id}>{n.title}</li>
        ))}
      </ul>
    </div>
  );
}
