import { useEffect, useState } from "react";
import DropSection from "../DropSection";
import { getFilesApi, uploadFileApi } from "@/api/upload";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Table from "../File/Table";
import type { Option } from "../Modal/Options";
import { startFile } from "@/api/starred";
import ShareModal from "../Modal/ShareModal";
import { shareFileApi } from "@/api/share";
import { moveToTrashApi } from "@/api/trash";

export interface MyFile extends File {
  _id: string;
}

export default function Drive() {
  const [files, setFiles] = useState<MyFile[]>([]);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<MyFile | null>(null);

  const { data, isPending, isError } = useQuery({
    queryKey: ["uploads"],
    queryFn: getFilesApi,
    staleTime: 5 * 60 * 1000,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (data?.data && !data.error) setFiles(data.data);
  }, [data]);

  const mutation = useMutation({
    mutationFn: uploadFileApi,
    onSuccess: (res) => {
      if (res.data) {
        toast.success(res.data.message);
        queryClient.invalidateQueries({ queryKey: ["uploads"] });
      } else if (res.error) {
        toast.error(res.error);
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const handleSetFiles = (fileList: FileList) => {
    const formdata = new FormData();
    Array.from(fileList).forEach((file) => formdata.append("files", file));
    mutation.mutate(formdata);
  };

  const handleShare = async (isPublic: boolean, allowedEmails: string[]) => {
    if (!selectedFile) return;
    const res = await shareFileApi(selectedFile._id, isPublic, allowedEmails);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("File shared successfully");
      setIsShareModalOpen(false);
    }
  };

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (data.error) return <div>Error</div>;

  const getOptions = (file: MyFile): Option[] => [
    {
      name: "share",
      onClick: () => {
        setSelectedFile(file);
        setIsShareModalOpen(true);
      },
    },
    {
      name: "star",
      onClick: async () => {
        const res = await startFile(file._id);
        if (res.error) {
          toast.error(res.error);
        }
        if (res.data) {
          toast.success(res.data.message);
        }
      },
    },
    {
      name: "move to trash",
      onClick: async () => {
        const res = await moveToTrashApi(file._id);
        if (res.error) {
          toast.error(res.error);
        }
        if (res.data) {
          toast.success(res.data.message);
          queryClient.invalidateQueries({ queryKey: ["uploads"] });
        }
      },
    },
  ];

  return (
    <>
      <DropSection onDropFiles={handleSetFiles}>
        <Table files={files} getOptions={getOptions} />
      </DropSection>
      {isShareModalOpen && selectedFile && (
        <ShareModal
          file={selectedFile}
          onClose={() => setIsShareModalOpen(false)}
          onShare={handleShare}
        />
      )}
    </>
  );
}
