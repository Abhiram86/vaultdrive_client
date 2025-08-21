export default function FAQSection({
  id = "faq",
  title = "Frequently asked",
  description = "Short and direct answers to the most common questions.",
  faqs = [
    {
      q: "How secure is VaultDrive?",
      a: "We use end-to-end encryption, meaning only you hold the keys. Learn more in our security section.",
    },
    {
      q: "Can I migrate from other drives?",
      a: "Yes, drag entire folders or connect cloud imports to bring everything over quickly.",
    },
    {
      q: "Do you compress media?",
      a: "Originals are kept intact. Thumbnails and previews are generated separately.",
    },
    {
      q: "What’s the file size limit?",
      a: "Up to 5 GB per file on Free, 50 GB on Plus, and 200 GB on Pro.",
    },
  ],
}) {
  return (
    <section id={id} className="bg-neutral-950 text-neutral-50">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-neutral-400">{description}</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-neutral-800 bg-neutral-900 p-5"
            >
              <h3 className="font-semibold">{item.q}</h3>
              <p className="mt-2 text-sm text-neutral-400">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
