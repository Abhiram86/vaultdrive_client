import { useEffect, useState } from "react";
import DropSection from "../DropSection";
import { getFilesApi, uploadFileApi } from "@/api/upload";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Table from "../File/Table";

export interface MyFile extends File {
  _id: string;
}

export default function Drive() {
  const [files, setFiles] = useState<MyFile[]>([]);
  const { data, isPending, isError } = useQuery({
    queryKey: ["uploads"],
    queryFn: getFilesApi,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data?.data && !data.error) setFiles(data.data);
  }, [data]);

  const mutation = useMutation({
    mutationFn: uploadFileApi,
    onSuccess: (res) => {
      if (res.data) {
        toast.success(res.data.message);
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
    setFiles((prev) => [
      ...prev,
      ...Array.from(fileList).map((file, i) =>
        Object.assign(file, { _id: String(Date.now() + i) })
      ),
    ]);
  };

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (data.error) return <div>Error</div>;

  return (
    <DropSection onDropFiles={handleSetFiles}>
      <Table files={files} handleSetFiles={(fileList) => setFiles(fileList)} />
    </DropSection>
  );
}
