import { useLocation, useNavigate } from "@tanstack/react-router";

export default function Sidebar({ open }: { open: boolean }) {
  const location = useLocation();
  const navigate = useNavigate();
  const tab = (location.search as any).tab ?? "drive";

  const handleSetTab = (tab: string) => navigate({ to: ".", search: { tab } });

  return (
    <aside
      className={`flex-shrink max-w-64 min-w-64 m-2 mr-0.5 ring-2 ring-neutral-800 rounded-lg flex-1 sticky top-0 bg-neutral-950 p-4 transition-all ${
        open ? "block" : "hidden"
      }`}
    >
      <nav className="flex flex-col gap-2 text-neutral-200">
        {tabs.map((item) => (
          <div
            key={item.path}
            onClick={() => handleSetTab(item.path)}
            className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer ${
              item.path === tab ? "bg-neutral-800" : "hover:bg-neutral-800/50"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </div>
        ))}
      </nav>
    </aside>
  );
}

const tabs = [
  { icon: "🗂️", name: "My Drive", path: "drive" },
  { icon: "👥", name: "Shared", path: "shared" },
  { icon: "⭐", name: "Starred", path: "starred" },
  { icon: "🗑️", name: "Trash", path: "trash" },
];
