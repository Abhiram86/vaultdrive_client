import { useState } from "react";

export default function DropSection({
  children,
  onDropFiles,
}: {
  children: React.ReactNode;
  onDropFiles: (files: FileList) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files.length > 0) {
      onDropFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  return (
    <div
      className={`h-full w-full transition-colors duration-200 ${
        isDragging ? "bg-neutral-700/50" : ""
      }`}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <div className="h-[calc(100vh-12rem)] overflow-y-auto scrollbar-hidden">
        {children}
      </div>
    </div>
  );
}
