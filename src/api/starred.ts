import type { MyFile } from "@/components/Tabs/Drive";
import axios, { AxiosError } from "axios";

const starred = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/starred`,
  withCredentials: true,
});

export const getStarred = async () => {
  try {
    const res = await starred.get("/");
    return res.data as { data: MyFile[]; error: null };
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      return error.response?.data as { data: null; error: string };
    }
    return { data: null, error: "Something went wrong" };
  }
};

export const startFile = async (id: string) => {
  try {
    const res = await starred.post(`/${id}`);
    return res.data as { data: { message: string }; error: null };
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      return error.response?.data as { data: null; error: string };
    }
    return { data: null, error: "Something went wrong" };
  }
};

export const unStarFile = async (id: string) => {
  try {
    const res = await starred.delete(`/${id}`);
    return res.data as { data: { message: string }; error: null };
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      return error.response?.data as { data: null; error: string };
    }
    return { data: null, error: "Something went wrong" };
  }
};
