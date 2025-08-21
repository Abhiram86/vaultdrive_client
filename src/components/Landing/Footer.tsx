export default function Footer() {
  return (
    <footer className="border-t mt-auto border-neutral-700/75 bg-neutral-900">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="inline-grid size-8 place-items-center rounded-lg bg-neutral-200/10 text-neutral-200 ring-1 ring-neutral-200/20">
              V
            </span>
            <span className="text-sm text-neutral-500">
              © {new Date().getFullYear()} VaultDrive
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-neutral-400">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Security</a>
            <a href="#">Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
