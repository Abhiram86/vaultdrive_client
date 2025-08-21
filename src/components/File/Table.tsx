import type { MyFile } from "../Tabs/Drive";
import Card from "./Card";

export default function Table({
  files,
  handleSetFiles,
}: {
  files: MyFile[];
  handleSetFiles: (fileList: MyFile[]) => void;
}) {
  return (
    <table className="w-full text-left">
      <thead className="border-b border-neutral-800 text-sm text-neutral-200">
        <tr>
          <th className="p-3">Name</th>
          <th className="p-3">Last Modified</th>
          <th className="p-3">File Size</th>
        </tr>
      </thead>
      <tbody>
        {files.length === 0 ? (
          <tr>
            <td className="p-4 text-neutral-400" colSpan={3}>
              No files found
            </td>
          </tr>
        ) : (
          files.map((file) => (
            <Card
              key={file._id}
              onDelOrTrash={(op) => {
                if (op) handleSetFiles(files.filter((f) => f._id !== file._id));
              }}
              file={file}
            />
          ))
        )}
      </tbody>
    </table>
  );
}
