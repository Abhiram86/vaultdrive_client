import { createFileRoute } from "@tanstack/react-router";
import "../App.css";
import FeaturesGrid from "@/components/Landing/FeatureGrid";
import SecuritySection from "@/components/Landing/SecuritySection";
import PricingSection from "@/components/Landing/PricingSection";
import FAQSection from "@/components/Landing/FAQ";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="bg-neutral-950 text-neutral-50">
      <section className="relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 opacity-100">
          <div className="pointer-events-none absolute -top-24 -left-16 h-[28rem] w-[28rem] rounded-full bg-neutral-500/20 blur-2xl"></div>
          <div className="pointer-events-none absolute -bottom-20 -right-16 h-[28rem] w-[28rem] rounded-full bg-neutral-500/20 blur-2xl"></div>
        </div>

        <div className="mx-auto max-w-7xl px-6 pt-20 pb-16 sm:pt-24 sm:pb-24 lg:pt-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1 text-xs text-neutral-500">
                <p>New: End-to-end encryption</p>
                <span className="inline-block aspect-square h-2 rounded-full bg-neutral-200"></span>
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Your files, streamlined.
                <span className="block text-neutral-200">
                  Blazing fast. Truly private.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-neutral-400 text-lg leading-relaxed">
                VaultDrive is a modern, dark-first file cloud. Upload, organize,
                search, and share with confidence—built for speed and peace of
                mind.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-xl bg-neutral-200 px-5 py-3 text-base font-semibold text-neutral-950 hover:bg-neutral-300 shadow-glow"
                >
                  Create a new vault
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="-me-0.5"
                  >
                    <path
                      d="M5 12h14M13 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center rounded-xl border border-neutral-800 px-5 py-3 text-base text-neutral-400 hover:text-neutral-50 hover:border-neutral-700"
                >
                  Explore features
                </a>
              </div>

              <div className="mt-8 flex items-center gap-6 text-sm text-neutral-500">
                {[
                  "End-to-end encryption",
                  "2 TB free trial",
                  "Fast global CDN",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="inline-block size-2 rounded-full bg-neutral-200"></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="relative">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-3 shadow-2xl shadow-black/50 backdrop-blur">
                <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 ring-1 ring-inset ring-neutral-800 flex items-center justify-center text-neutral-500">
                  <div className="text-center">
                    <div className="mx-auto mb-4 inline-grid size-14 place-items-center rounded-xl bg-neutral-200/15 text-neutral-200 ring-1 ring-neutral-200/20">
                      ▦
                    </div>
                    <p className="text-sm">
                      Screenshot of your file grid / folders goes here
                    </p>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-4 -left-6 h-48 w-48 rounded-full bg-neutral-500/20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
      <FeaturesGrid />
      <SecuritySection />
      <PricingSection />
      <FAQSection />
    </div>
  );
}
