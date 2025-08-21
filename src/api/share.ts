import axios from "axios";
import type { ShareLinkType, UserShareType } from "@/types";

const share = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/share`,
  withCredentials: true,
});

export const getSharedFilesApi = async () => {
  const res = await share.get("/");
  return res.data as {
    data: { userShares: UserShareType[]; shareLinks: ShareLinkType[] };
    error: null | string;
  };
};

export const shareFileApi = async (
  fileId: string,
  isPublic: boolean,
  allowedEmails: string[]
) => {
  const res = await share.post(`/${fileId}`, { isPublic, allowedEmails });
  return res.data as { data: ShareLinkType; error: null | string };
};

export const getSharedFileApi = async (id: string) => {
  const res = await share.get(`/${id}`);
  return res.data as {
    data: {
      id: string;
      fileName: string;
      fileType: string;
      previewFile: string;
    };
    error: null | string;
  };
};
