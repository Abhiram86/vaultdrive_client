import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginApi } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useUserStore } from "@/store/User";
import { useRouter } from "@tanstack/react-router";

const loginrSchema = z.object({
  email: z.email().min(4, { message: "Email must be not empty" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type FormData = z.infer<typeof loginrSchema>;

export default function Login({ onClick }: { onClick: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginrSchema),
  });
  const { setUser } = useUserStore();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: FormData) => loginApi(data),
    onSuccess: (data) => {
      if (typeof data === "object") {
        if ("error" in data) return toast.error(data.error);
        if ("user" in data) {
          setUser(data.user);
          toast.success("Account created successfully");
          router.navigate({ to: "/dashboard" });
        }
      } else toast.error(data);
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className="p-6 ring space-y-4 ring-neutral-600 rounded-lg w-full backdrop-blur-md"
    >
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-neutral-400 text-sm text-balance">
          Log in to existing account with email and password
        </p>
      </div>
      <div className="space-y-2">
        <div className="flex flex-col space-y-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="w-full bg-neutral-800/50 ring-2 ring-neutral-800 px-2 py-1 rounded-md"
            placeholder="Email"
          />
          <p className="text-red-500">{errors.email?.message}</p>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="w-full bg-neutral-800/50 ring-2 ring-neutral-800 px-2 py-1 rounded-md"
            placeholder="Password"
          />
          <p className="text-red-500">{errors.password?.message}</p>
        </div>
      </div>
      <button
        className="w-full flex items-center justify-center bg-blue-600/40 ring-2 cursor-pointer hover:bg-blue-800 transition-colors ring-blue-900 px-4 py-2 rounded-md"
        type="submit"
      >
        {mutation.isPending ? (
          <img src="/spinner.svg" className="w-6 animate-spin" alt="spinner" />
        ) : (
          "Login"
        )}
      </button>
      <p>
        Dont have an account?{" "}
        <span
          onClick={onClick}
          className="text-blue-400 cursor-pointer hover:underline"
        >
          register
        </span>
      </p>
    </form>
  );
}
