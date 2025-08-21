import type { MyFile } from "@/components/Tabs/Drive";
import axios, { AxiosError } from "axios";

const trash = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/trash`,
  withCredentials: true,
});

export const getTrashFilesApi = async () => {
  try {
    const res = await trash.get("/");
    return res.data as { data: MyFile[]; error: null };
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      return error.response?.data as { data: null; error: string };
    }
    return { data: null, error: "Something went wrong" };
  }
};

export const restoreFileApi = async (id: string) => {
  try {
    const res = await trash.patch(`/${id}`);
    return res.data as { data: { message: string }; error: null };
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      return error.response?.data as { data: null; error: string };
    }
    return { data: null, error: "Something went wrong" };
  }
};
