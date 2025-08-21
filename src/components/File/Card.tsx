import { useState } from "react";
import Options from "../Modal/Options";
import type { MyFile } from "../Tabs/Drive";

export default function Card({
  file,
  onDelOrTrash,
}: {
  file: MyFile;
  onDelOrTrash: (success: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <tr
      key={file._id}
      className="border-b relative border-neutral-800/50 hover:bg-neutral-900"
    >
      <td className="p-3 flex items-center gap-2">
        <span className="text-xl">
          {file.type.includes("folder") ? "📁" : "📄"}
        </span>
        {file.name}
      </td>
      <td className="p-3 text-neutral-400">
        {new Date(file.lastModified).toLocaleString()}
      </td>
      <td className="p-3 text-neutral-400">
        {file.size ? `${(file.size / 1024).toFixed(1)} KB` : "—"}
      </td>
      <td className="relative">
        <img
          onClick={() => setOpen((prev) => !prev)}
          className="min-w-4 max-w-6 p-1 hover:bg-neutral-600 rounded-full cursor-pointer"
          src="/options.svg"
          alt="options"
        />
        {open && <Options onDelOrTrash={onDelOrTrash} id={file._id} />}
      </td>
    </tr>
  );
}
