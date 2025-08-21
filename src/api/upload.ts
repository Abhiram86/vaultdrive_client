import type { MyFile } from "@/components/Tabs/Drive";
import axios, { AxiosError } from "axios";

const upload = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/upload`,
  withCredentials: true,
});

export const getFilesApi = async () => {
  try {
    const res = await upload.get("/");
    return res.data as { data: MyFile[]; error: null };
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      return error.response?.data as { data: null; error: string };
    }
    return { data: null, error: "Something went wrong" };
  }
};

export const uploadFileApi = async (data: FormData) => {
  try {
    const res = await upload.post("/", data);
    return res.data as { data: { message: string }; error: null };
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      return error.response?.data as { data: null; error: string };
    } else {
      return { data: null, error: "Something went wrong" };
    }
  }
};

export const deleteFileApi = async (id: string) => {
  try {
    const res = await upload.delete(`/${id}`);
    return res.data as { data: { message: string }; error: null };
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      return error.response?.data as { data: null; error: string };
    } else {
      return { data: null, error: "Something went wrong" };
    }
  }
};

export const moveToTrashApi = async (id: string) => {
  try {
    const res = await upload.delete(`/trash/${id}`);
    return res.data as { data: { message: string }; error: null };
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      return error.response?.data as { data: null; error: string };
    } else {
      return { data: null, error: "Something went wrong" };
    }
  }
};
