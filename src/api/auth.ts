import axios, { AxiosError } from "axios";

const auth = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/auth`,
  withCredentials: true,
});

export const registerApi = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await auth.post("/register", data);
    return res.data as {
      user: {
        id: string;
        username: string;
        email: string;
      };
    };
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      return error.response?.data as {
        error: string;
      };
    } else {
      return "Something went wrong";
    }
  }
};

export const loginApi = async (data: { email: string; password: string }) => {
  try {
    const res = await auth.post("/login", data);
    return res.data as {
      user: {
        id: string;
        username: string;
        email: string;
      };
    };
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      return error.response?.data as { error: string };
    } else {
      return "Something went wrong";
    }
  }
};

export const refreshApi = async () => {
  try {
    const res = await auth.get("/refresh");
    return res.data as {
      user: {
        id: string;
        username: string;
        email: string;
      };
    };
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      return error.response?.data as { error: string };
    } else {
      return "Something went wrong";
    }
  }
};

export const authenticate = async (query?: Record<string, string>) => {
  try {
    const res = await auth.get("/user", { params: query });
    return res.data;
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      return error.response?.data as { error: string };
    } else {
      return "Something went wrong";
    }
  }
};
