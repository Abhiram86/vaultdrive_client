import Footer from "@/components/Landing/Footer";
import Navbar from "@/components/Landing/Navbar";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { authenticate, refreshApi } from "@/api/auth";
import { useUserStore } from "@/store/User";
import { useEffect } from "react";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <RootComponent />
    </QueryClientProvider>
  ),
});

function RootComponent() {
  const { user, setUser } = useUserStore();
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await authenticate({ include: "true" }),
    staleTime: 5 * 60 * 1000,
    enabled: !user,
  });

  const { data: refresh } = useQuery({
    queryKey: ["refresh"],
    queryFn: async () => await refreshApi(),
    enabled: !!data && typeof data === "object" && !("user" in data),
  });

  useEffect(() => {
    if (data && typeof data === "object" && "user" in data) setUser(data.user);
  }, [data, setUser]);

  useEffect(() => {
    if (refresh && typeof refresh === "object" && "user" in refresh)
      setUser(refresh.user);
  }, [refresh, setUser]);

  return (
    <>
      <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-50 antialiased selection:bg-brand/20 selection:text-ink">
        <Navbar />
        <main className="flex-1 scrollbar-hidden overflow-x-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster
        toastOptions={{
          duration: 3000,
          style: {
            background: "#404040",
            color: "#fafafa",
            border: "2px solid rgba(128, 128, 128, 0.75)",
          },
        }}
      />
      <TanStackRouterDevtools />
    </>
  );
}
