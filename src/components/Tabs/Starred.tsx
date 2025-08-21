import { getStarred, unStarFile } from "@/api/starred";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Table from "../File/Table";
import type { Option } from "../Modal/Options";
import type { MyFile } from "./Drive";
import { moveToTrashApi } from "@/api/upload";
import toast from "react-hot-toast";

export default function Starred() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["starred"],
    queryFn: getStarred,
    staleTime: 5 * 60 * 1000,
  });

  const queryClient = useQueryClient();

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  if (!data || data.error || !data.data) return <p>{data?.error || "No files found"}</p>;

  const getOptions = (file: MyFile): Option[] => [
    {
      name: "Share",
      onClick: () => {},
    },
    {
      name: "Unstar",
      onClick: async () => {
        const res = await unStarFile(file._id);
        if (res.error) {
          toast.error(res.error);
        }
        if (res.data) {
          toast.success(res.data.message);
          queryClient.invalidateQueries({ queryKey: ["starred"] });
        }
      },
    },
    {
      name: "Move to trash",
      onClick: async () => {
        const res = await moveToTrashApi(file._id);
        if (res.error) {
          toast.error(res.error);
        }
        if (res.data) {
          toast.success(res.data.message);
          queryClient.invalidateQueries({ queryKey: ["starred"] });
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
