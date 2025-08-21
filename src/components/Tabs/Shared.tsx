import { useQuery } from "@tanstack/react-query";
import { getSharedFilesApi } from "@/api/share";
import Table from "../File/Table";
import type { MyFile } from "../Tabs/Drive";
import type { Option } from "../Modal/Options";
import toast from "react-hot-toast";

export default function Shared() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["shared"],
    queryFn: getSharedFilesApi,
    staleTime: 5 * 60 * 1000,
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (data.error) return <div>{data.error}</div>;

  const sharedFiles: MyFile[] = [
    ...data.data.userShares.map((share) => share.file),
    ...data.data.shareLinks.map((link) => link.file),
  ];

  const getOptions = (file: MyFile): Option[] => {
    // TODO: Implement options for shared files
    return [
      {
        name: "remove from shared",
        onClick: () => {
          toast.error("not implemented yet");
        },
      },
    ];
  };

  return (
    <div className="h-[calc(100vh-12rem)]">
      <Table files={sharedFiles} getOptions={getOptions} />
    </div>
  );
}
