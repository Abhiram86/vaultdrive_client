export default function PricingCard({
  name,
  price,
  period,
  features = [],
  cta = { label: "Choose", href: "#", primary: false },
  ring = false,
}: {
  name: string;
  price: string;
  period: string;
  features?: string[];
  cta?: { label: string; href: string; primary?: boolean };
  highlight?: boolean;
  ring?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-2xl border border-neutral-800 bg-neutral-950 p-6",
        ring ? "ring-1 ring-inset ring-neutral-200/20" : "",
      ].join(" ")}
    >
      <div className="text-sm text-neutral-500">{name}</div>
      <div className="mt-2 text-3xl font-bold">
        {price}
        <span className="text-base font-medium text-neutral-500">{period}</span>
      </div>

      <ul className="mt-6 space-y-3 text-sm text-neutral-400">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="inline-block size-1.5 rounded-full bg-neutral-200"></span>
            {f}
          </li>
        ))}
      </ul>

      {cta?.href && (
        <a
          href={cta.href}
          className={[
            "mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 font-semibold",
            cta.primary
              ? "bg-neutral-200 text-neutral-950 hover:bg-neutral-300 shadow-glow"
              : "border border-neutral-800 text-neutral-50 hover:border-neutral-700",
          ].join(" ")}
        >
          {cta.label}
        </a>
      )}
    </div>
  );
}
