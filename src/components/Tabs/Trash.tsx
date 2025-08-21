import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTrashFilesApi } from "@/api/trash";
import Table from "../File/Table";

export default function Trash() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["trash"],
    queryFn: getTrashFilesApi,
    staleTime: 5 * 60 * 1000,
  });

  const queryClient = useQueryClient();

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  if (data.error || !data.data) return <p>{data.error}</p>;

  return (
    <div className="h-[calc(100vh-12rem)]">
      <Table
        files={data.data}
        handleSetFiles={(files) => queryClient.setQueryData(["trash"], files)}
      />
    </div>
  );
}
