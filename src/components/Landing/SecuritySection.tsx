export default function SecuritySection({
  id = "security",
  title = "Security, without ceremony",
  description = "Zero-knowledge encryption keeps your content sealed. We can’t read your files—even if we wanted to.",
  bullets = [
    "End-to-end encryption for files and metadata",
    "Device-bound keys and WebCrypto",
    "SSO/OIDC, Passkeys, and 2FA support",
  ],
  cards = [
    {
      title: "Encryption at rest",
      description: "AES-GCM with rotating keys and per-object salts.",
    },
    {
      title: "Encryption in transit",
      description:
        "TLS 1.3 everywhere, strict transport security, and certificate pinning.",
    },
    {
      title: "Access control",
      description:
        "Role-based permissions with per-folder overrides and audit trails.",
    },
  ],
  cta = { label: "Read the whitepaper →", href: "#" },
}) {
  return (
    <section id={id}>
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Copy */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-neutral-400">{description}</p>

            <ul className="mt-6 space-y-3 text-neutral-400">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 inline-block size-2 rounded-full bg-neutral-200"></span>
                  {b}
                </li>
              ))}
            </ul>

            {cta?.href && (
              <div className="mt-8">
                <a
                  href={cta.href}
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-800 px-5 py-3 text-sm text-neutral-400 hover:text-neutral-50 hover:border-neutral-700"
                >
                  {cta.label}
                </a>
              </div>
            )}
          </div>

          {/* Cards */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
            <div className="grid gap-4">
              {cards.map((c, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4"
                >
                  <h3 className="font-semibold">{c.title}</h3>
                  <p className="mt-1 text-sm text-neutral-400">{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
