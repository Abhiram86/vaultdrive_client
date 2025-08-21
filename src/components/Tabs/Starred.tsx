import { getStarred } from "@/api/starred";
import { useQuery } from "@tanstack/react-query";
import Table from "../File/Table";

export default function Starred() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["starred"],
    queryFn: getStarred,
    staleTime: 5 * 60 * 1000,
  });

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  if (data.error || !data.data) return <p>{data.error}</p>;

  return (
    <div className="h-[calc(100vh-12rem)]">
      <Table files={data.data} handleSetFiles={() => {}} />
    </div>
  );
}
