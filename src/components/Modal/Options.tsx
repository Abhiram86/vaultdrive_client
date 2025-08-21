import { startFile } from "@/api/starred";
import { deleteFileApi, moveToTrashApi } from "@/api/upload";
import toast from "react-hot-toast";

export default function Options({
  id,
  onDelOrTrash,
}: {
  id: string;
  onDelOrTrash: (success: boolean) => void;
}) {
  const handleClick = async (option: string) => {
    switch (option) {
      case "share":
        break;
      case "star":
        const res4 = await startFile(id);
        if (res4.error) {
          toast.error(res4.error);
        }
        if (res4.data) {
          toast.success(res4.data.message);
        }
        break;
      case "move to trash":
        const res2 = await moveToTrashApi(id);
        if (res2.error) {
          toast.error(res2.error);
          onDelOrTrash(false);
        }
        if (res2.data) {
          toast.success(res2.data.message);
          onDelOrTrash(true);
        }
        break;
      case "delete forever":
        const res3 = await deleteFileApi(id);
        if (res3.error) {
          toast.error(res3.error);
          onDelOrTrash(false);
        }
        if (res3.data) {
          toast.success(res3.data.message);
          onDelOrTrash(true);
        }
        break;
      default:
        break;
    }
  };
  return (
    <div className="absolute z-20 top-8 right-4 w-[200px] divide-y divide-neutral-800 p-2 bg-neutral-950/50 backdrop-blur-md rounded-lg ring-2 ring-neutral-800/75">
      {options.map((option) => (
        <div key={option.name}>
          <button
            onClick={() => handleClick(option.name)}
            className="p-0.5 w-full text-start text-neutral-100 rounded-lg px-2 hover:bg-neutral-800 transition-colors duration-75 cursor-pointer"
          >
            {option.name}
          </button>
        </div>
      ))}
    </div>
  );
}

const options = [
  {
    name: "share",
  },
  {
    name: "star",
  },
  {
    name: "move to trash",
  },
  {
    name: "delete forever",
  },
];
