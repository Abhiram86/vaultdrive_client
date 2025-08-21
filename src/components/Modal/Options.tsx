export interface Option {
  name: string;
  onClick: () => void;
}

export default function Options({ options }: { options: Option[] }) {
  return (
    <div className="absolute z-20 top-8 right-4 w-[200px] divide-y divide-neutral-800 p-2 bg-neutral-950/50 backdrop-blur-md rounded-lg ring-2 ring-neutral-800/75">
      {options.map((option) => (
        <div key={option.name}>
          <button
            onClick={option.onClick}
            className="p-0.5 w-full text-start text-neutral-100 rounded-lg px-2 hover:bg-neutral-800 transition-colors duration-75 cursor-pointer"
          >
            {option.name}
          </button>
        </div>
      ))}
    </div>
  );
}
