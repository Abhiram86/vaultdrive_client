export default function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-6">
      <div className="mb-4 inline-grid size-10 place-items-center rounded-lg bg-neutral-200/15 text-neutral-200 ring-1 ring-neutral-200/20">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-400">{text}</p>
    </div>
  );
}
