import { useState } from "react";
import AuthForm from "../Forms/AuthForm";
import { useUserStore } from "@/store/User";
import ProfileMenu from "../Modal/ProfileMenu";
import { Link, useLocation } from "@tanstack/react-router";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useUserStore();
  return (
    <>
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 bg-neutral-950/80 border-b border-neutral-800">
        <div className="mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <span className="inline-grid size-9 place-items-center rounded-lg bg-neutral-200/10 text-neutral-200 ring-1 ring-neutral-200/20">
                V
              </span>
              <span className="text-lg font-semibold tracking-tight">
                VaultDrive
              </span>
            </Link>
            {useLocation().pathname === "/" && (
              <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-400">
                <a href="#features" className="hover:text-neutral-50">
                  Features
                </a>
                <a href="#security" className="hover:text-neutral-50">
                  Security
                </a>
                <a href="#pricing" className="hover:text-neutral-50">
                  Pricing
                </a>
                <a href="#faq" className="hover:text-neutral-50">
                  FAQ
                </a>
              </nav>
            )}
            <div className="flex items-center gap-3">
              {!user ? (
                <>
                  <button
                    onClick={() => setOpen(true)}
                    className="hidden sm:inline-flex items-center rounded-lg border border-neutral-800 px-4 py-2 text-sm text-neutral-400 hover:text-neutral-50 hover:border-neutral-700"
                  >
                    Sign in
                  </button>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded-lg bg-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-950 hover:bg-neutral-300 shadow-glow"
                  >
                    Get started
                  </a>
                </>
              ) : (
                <div
                  onClick={() => setOpen((prev) => !prev)}
                  className="w-8 ring-blue-200 cursor-pointer transition-all hover:ring-2 h-8 text-xl bg-blue-500 rounded-full flex items-center justify-center text-[#fff]"
                >
                  <p>{user.username[0].toUpperCase()}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      {open && user === null && <AuthForm onClose={() => setOpen(false)} />}
      {open && user && <ProfileMenu onClose={() => setOpen(false)} />}
    </>
  );
}
