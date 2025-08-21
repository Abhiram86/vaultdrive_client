import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "@/api/auth";
import toast from "react-hot-toast";
import { useUserStore } from "@/store/User";
import { useRouter } from "@tanstack/react-router";

const registerSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters" }),
  email: z.email().min(4, { message: "Email must be not empty" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type FormData = z.infer<typeof registerSchema>;

export default function Register({ onClick }: { onClick: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const { setUser } = useUserStore();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: FormData) => await registerApi(data),
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
        <h1 className="text-2xl font-bold">Register</h1>
        <p className="text-neutral-400 text-sm text-balance">
          Create an account with a unique email and strong password
        </p>
      </div>
      <div className="space-y-2">
        <div className="flex flex-col space-y-1">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username")}
            className="w-full bg-neutral-800/50 ring-2 ring-neutral-800 px-2 py-1 rounded-md"
            placeholder="Username"
          />
          <p className="text-red-500">{errors.username?.message}</p>
        </div>
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
        className="w-full bg-blue-600/40 ring-2 flex items-center cursor-pointer hover:bg-blue-800 transition-colors ring-blue-900 px-4 py-2 rounded-md"
        type="submit"
      >
        {mutation.isPending ? (
          <img className="w-6" src="/spinner.svg" alt="spinner" />
        ) : (
          "Register"
        )}
      </button>
      <p>
        Already have an account?{" "}
        <span
          onClick={onClick}
          className="text-blue-400 cursor-pointer hover:underline"
        >
          login
        </span>
      </p>
    </form>
  );
}
