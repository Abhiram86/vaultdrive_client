import { Link } from "@tanstack/react-router";
import Modal from "./Modal";

export default function ProfileMenu({ onClose }: { onClose: () => void }) {
  return (
    <Modal
      childrenClassName="h-fit"
      className="justify-end top-14"
      onClose={onClose}
    >
      <div className="mt-4 p-2 mr-4 bg-neutral-950/50 backdrop-blur-md rounded-lg ring-2 ring-neutral-800/75">
        <ul className="flex divide-y w-[200px] divide-neutral-800 flex-col">
          {links.map((link) => (
            <Link key={link} to={link.toLocaleLowerCase()} className="w-full">
              <li className="p-0.5 w-full transition-colors duration-75 rounded-md px-2 hover:bg-neutral-100 hover:text-neutral-950">
                {link}
              </li>
            </Link>
          ))}
          <li className="w-full">
            <button className="p-0.5 w-full text-start text-red-400 rounded-lg px-2 hover:bg-red-900 hover:text-red-200 transition-colors duration-75 cursor-pointer">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </Modal>
  );
}

const links = ["Dashboard", "Settings", "Profile"];
