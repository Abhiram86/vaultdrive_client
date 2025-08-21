import FeatureCard from "../Landing/FeatureCard";

export default function FeaturesGrid({
  title = "Designed for flow",
  description = "Every interaction is engineered to keep you moving—upload, organize, and share without breaking focus.",
  features = [
    {
      icon: "↑",
      title: "Drag & drop uploads",
      text: "Multi-file and folder uploads with resumable transfers and visual progress.",
    },
    {
      icon: "🔍",
      title: "Instant search",
      text: "Find files by name, type, or tag with lightning-fast indexing.",
    },
    {
      icon: "🔗",
      title: "Share that respects privacy",
      text: "Granular links, expiring access, and view-only permissions out of the box.",
    },
    {
      icon: "🗂️",
      title: "Smart folders",
      text: "Organize with tags, favorites, and rules that auto-file new content.",
    },
    {
      icon: "🧩",
      title: "Previews for everything",
      text: "From docs and PDFs to audio, video, and images—no downloads required.",
    },
    {
      icon: "⚡",
      title: "Fast by default",
      text: "Global CDN and aggressive caching keep everything snappy.",
    },
  ],
  id = "features",
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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FeatureCard key={i} icon={f.icon} title={f.title} text={f.text} />
          ))}
        </div>
      </div>
    </section>
  );
}
