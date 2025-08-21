export default function Modal({
  children,
  className,
  childrenClassName = "",
  onClose,
}: {
  children: React.ReactNode;
  className?: string;
  childrenClassName?: string;
  onClose: () => void;
}) {
  const baseClass = "bg-neutral-950/75 items-center justify-center";
  return (
    <div
      onClick={onClose}
      className={`fixed z-40 top-0 left-0 h-screen w-full flex ${!className && baseClass} ${className}`}
    >
      <div onClick={(e) => e.stopPropagation()} className={childrenClassName}>
        {children}
      </div>
    </div>
  );
}
