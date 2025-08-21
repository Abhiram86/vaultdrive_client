import Modal from "./Modal";

export default function NewModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose} className="justify-end" childrenClassName="h-fit">
      <div className="mt-24 w-[200px] divide-y divide-neutral-800 p-2 mr-4 bg-neutral-950/50 backdrop-blur-md rounded-lg ring-2 ring-neutral-800/75">
        {options.map((option) => (
          <div key={option.name}>
            <button className="p-0.5 w-full text-start text-neutral-100 rounded-lg px-2 hover:bg-neutral-800 transition-colors duration-75 cursor-pointer">
              {option.icon} {option.name}
            </button>
          </div>
        ))}
      </div>
    </Modal>
  );
}

const options = [
  {
    name: "new folder",
    icon: "🗂️",
  },
  {
    name: "upload file",
    icon: "📄",
  },
  {
    name: "upload folder",
    icon: "🗂️",
  },
];
