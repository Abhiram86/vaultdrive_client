import { createFileRoute, redirect, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Drive from "@/components/Tabs/Drive";
import Shared from "@/components/Tabs/Shared";
import Starred from "@/components/Tabs/Starred";
import Trash from "@/components/Tabs/Trash";
import NewModal from "@/components/Modal/NewModal";
import { authenticate } from "@/api/auth";

export const Route = createFileRoute("/dashboard")({
  loader: async () => {
    const res = await authenticate();
    if (typeof res === "object") {
      if ("error" in res) throw redirect({ to: "/" });
      return {};
    }
    throw redirect({ to: "/" });
  },
  staleTime: 5 * 60 * 1000,
  component: Dashboard,
});

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [newModal, setNewModal] = useState(false);
  const location = useLocation();

  const tab =
    ((location.search as any).tab as
      | "drive"
      | "starred"
      | "shared"
      | "trash") ?? "drive";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setSidebarOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className="bg-neutral-900 relative h-full text-neutral-50 flex gap-0">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} />

      {/* Main */}
      <div
        className={`min-w-md m-2 p-4 ring-2 ring-neutral-800 rounded-lg bg-neutral-950 flex flex-col overflow-hidden ${sidebarOpen ? "w-full" : "flex-1"}`}
      >
        <header className="flex items-center p-2 border-b border-neutral-800 space-x-2">
          <button
            className={`w-10 h-10 p-2 hover:bg-neutral-800 cursor-pointer rounded-full ${
              sidebarOpen ? "rotate-0" : "rotate-180 bg-neutral-800"
            }`}
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            <img src="/panel.svg" className="w-8" alt="toggle sidebar" />
          </button>
          <input
            type="text"
            placeholder="Search in Drive"
            className="flex-1 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm text-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-700"
          />
          <div>
            <button
              onClick={() => setNewModal(true)}
              className="px-3 py-1.5 font-medium text-neutral-950 bg-neutral-200 cursor-pointer hover:bg-neutral-300 rounded-lg"
            >
              + New
            </button>
          </div>
        </header>
        <main className="overflow-y-auto">{tabs[tab]}</main>
      </div>
      {newModal && <NewModal onClose={() => setNewModal(false)} />}
    </div>
  );
}

const tabs = {
  drive: <Drive />,
  shared: <Shared />,
  starred: <Starred />,
  trash: <Trash />,
};
