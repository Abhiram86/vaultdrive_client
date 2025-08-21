import PricingCard from "./PricingCard";

export default function PricingSection({
  id = "pricing",
  title = "Start free. Scale when you do.",
  description = "A generous free tier to get moving, with predictable upgrades as your library grows.",
  plans = [
    {
      name: "Free",
      price: "0$",
      period: "/mo",
      highlight: true,
      ring: true,
      features: ["10 GB storage", "Unlimited uploads", "Link sharing"],
      cta: { label: "Get started", href: "#", primary: true },
    },
    {
      name: "Plus",
      price: "9$",
      period: "/mo",
      features: [
        "1 TB storage",
        "Password-protected links",
        "Priority support",
      ],
      cta: { label: "Choose Plus", href: "#", primary: false },
    },
    {
      name: "Pro",
      price: "19$",
      period: "/mo",
      features: ["2 TB storage", "Custom domains", "Admin console"],
      cta: { label: "Choose Pro", href: "#", primary: false },
    },
  ],
}) {
  return (
    <section id={id} className="border-t border-neutral-800 bg-neutral-900">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-neutral-400">{description}</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((p, i) => (
            <PricingCard key={i} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
