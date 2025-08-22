import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { getSharedFilesApi, revokeShareLinkApi } from "@/api/share";
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

  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = React.useState<"sent" | "received">("sent");

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (data.error) return <div>{data.error}</div>;

  const sentFiles = data.data.shareLinks.map((link) => ({
    ...(link.file as MyFile),
    jwt: link.jwt,
  }));
  const receivedFiles: MyFile[] = data.data.userShares.map(
    (share) => share.file
  );

  const getOptions = (file: MyFile & { jwt?: string }): Option[] => {
    const options: Option[] = [];

    if (file.jwt) {
      options.push({
        name: "copy url",
        onClick: () => {
          const url = `${window.location.origin}/file/${file.jwt}`;
          navigator.clipboard.writeText(url).then(
            () => toast.success("URL copied to clipboard!"),
            () => toast.error("Failed to copy URL.")
          );
        },
      });
    }

    options.push({
      name: "revoke sharing",
      onClick: async () => {
        const res = await revokeShareLinkApi(file._id);
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success("Successfully revoked sharing");
          queryClient.invalidateQueries({ queryKey: ["shared"] });
        }
      },
    });

    return options;
  };

  return (
    <div className="h-[calc(100vh-12rem)]">
      <div className="flex border-b">
        <button
          className={`px-4 py-2 border-b-2 ${
            activeTab === "sent"
              ? "border-blue-500 text-blue-500"
              : "text-gray-500 border-neutral-900"
          }`}
          onClick={() => setActiveTab("sent")}
        >
          Sent
        </button>
        <button
          className={`px-4 py-2 border-b-2 ${
            activeTab === "received"
              ? "border-blue-500 text-blue-500"
              : "text-gray-500 border-neutral-900"
          }`}
          onClick={() => setActiveTab("received")}
        >
          Received
        </button>
      </div>
      <div className="mt-4">
        {activeTab === "sent" && (
          <Table files={sentFiles} getOptions={getOptions} />
        )}
        {activeTab === "received" && (
          <Table files={receivedFiles} getOptions={() => []} />
        )}
      </div>
    </div>
  );
}
