import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteFileApi, getTrashFilesApi, restoreFileApi } from "@/api/trash";
import Table from "../File/Table";
import type { MyFile } from "./Drive";
import type { Option } from "../Modal/Options";
import toast from "react-hot-toast";

export default function Trash() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["trash"],
    queryFn: getTrashFilesApi,
    staleTime: 5 * 60 * 1000,
  });

  const queryClient = useQueryClient();

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  if (!data || data.error || !data.data)
    return <p>{data?.error || "No files found"}</p>;

  const getOptions = (file: MyFile): Option[] => [
    {
      name: "restore",
      onClick: async () => {
        const res = await restoreFileApi(file._id);
        if (res.error) {
          toast.error(res.error);
        }
        if (res.data) {
          toast.success(res.data.message);
          queryClient.invalidateQueries({ queryKey: ["trash"] });
        }
      },
    },
    {
      name: "delete forever",
      onClick: async () => {
        const res = await deleteFileApi(file._id);
        if (res.error) {
          toast.error(res.error);
        }
        if (res.data) {
          toast.success(res.data.message);
          queryClient.invalidateQueries({ queryKey: ["trash"] });
        }
      },
    },
  ];

  return (
    <div className="h-[calc(100vh-12rem)]">
      <Table files={data.data} getOptions={getOptions} />
    </div>
  );
}
