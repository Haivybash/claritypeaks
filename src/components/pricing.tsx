"use client";

import { motion } from "framer-motion";
import { useIndustry, scrollToId } from "@/components/industry-context";

/**
 * Pricing — two universal plans. Same prices for every industry.
 * Only the monthly content mix (Reels / Posts / Stories) changes by industry.
 *
 * Industry is read from the shared context (set in the Industries section).
 * No selector here — the user arrives with their industry already chosen.
 *
 * No invented promises: no shoot duration/frequency, revision counts,
 * reporting, captions, strategy calls, or community management claims.
 */

type Deliverables = { reels: number; posts: number; stories: number };

// Label lookup keyed by IndustryId.
const industryLabel: Record<string, string> = {
  clothing: "Clothing",
  salons: "Salons & Spas",
  jewelry: "Jewelry",
  gyms: "Gyms & Fitness",
  "real-estate": "Real Estate",
  restaurants: "Restaurants & Cafes",
  "interior-designers": "Interior Designers",
};

// Source: Phase 4 spec table (duplicate Salons row deduped).
const starterByIndustry: Record<string, Deliverables> = {
  clothing: { reels: 12, posts: 6, stories: 12 },
  salons: { reels: 8, posts: 6, stories: 12 },
  jewelry: { reels: 8, posts: 4, stories: 8 },
  gyms: { reels: 7, posts: 4, stories: 7 },
  "real-estate": { reels: 8, posts: 4, stories: 12 },
  restaurants: { reels: 5, posts: 3, stories: 6 },
  "interior-designers": { reels: 12, posts: 6, stories: 12 },
};

const growthByIndustry: Record<string, Deliverables> = {
  clothing: { reels: 25, posts: 12, stories: 16 },
  salons: { reels: 17, posts: 12, stories: 12 },
  jewelry: { reels: 12, posts: 10, stories: 12 },
  gyms: { reels: 15, posts: 10, stories: 12 },
  "real-estate": { reels: 12, posts: 6, stories: 12 },
  restaurants: { reels: 12, posts: 5, stories: 12 },
  "interior-designers": { reels: 17, posts: 9, stories: 17 },
};

const starterFeatures = [
  "Smartphone-first shoots — agile, authentic, trend-ready",
  "Social-first editing: clean text, trend-aware pacing, platform-native audio",
  "Consistent, confident feed that keeps your brand visible",
];

const growthFeatures = [
  "Professional camera-led production",
  "Cinematic sequencing: colour grading, sound design, motion graphics",
  "Deeper post-production effort for a more distinctive result",
];

export function Pricing() {
  const { industryId } = useIndustry();
  const activeLabel = industryLabel[industryId];
  const starter = starterByIndustry[industryId];
  const growth = growthByIndustry[industryId];

  return (
    <section id="pricing" className="relative overflow-hidden py-12 sm:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-sage/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full border border-sage/50 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-forest/70">
            Simple Pricing · {activeLabel}
          </span>
          <h2 className="font-serif text-3xl font-medium leading-tight text-forest sm:text-4xl">
            Two plans. One price. Tailored to your industry.
          </h2>
          <p className="mt-4 text-base text-forest/70 sm:text-lg">
            Pricing stays fixed — the monthly content mix adapts to how your
            business actually works.
          </p>
        </div>

        {/* Plan cards */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Starter */}
          <PlanCard
            name="Starter"
            price="₹15,000"
            cadence="/ month"
            tagline="A consistent, confident social media foundation."
            features={starterFeatures}
            deliverables={starter}
            cta={{
              label: "I'm Interested in Starter",
              variant: "outline",
            }}
          />

          {/* Growth — visually distinct */}
          <PlanCard
            name="Growth"
            price="₹25,000"
            cadence="/ month"
            tagline="A more substantial and more distinctive content presence."
            features={growthFeatures}
            deliverables={growth}
            cta={{
              label: "I'm Interested in Growth",
              variant: "solid",
            }}
            highlight
          />
        </div>

        {/* Find My Fit CTA */}
        <div className="mt-8 text-center">
          <p className="mb-4 text-sm text-forest/70">
            Not sure which fits? We&apos;ll help you decide based on your goals.
          </p>
          <button
            type="button"
            onClick={() => scrollToId("get-started")}
            className="inline-flex items-center justify-center rounded-2xl border border-sage px-7 py-3 text-sm font-medium text-forest transition-colors hover:border-forest hover:bg-forest/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          >
            Find My Fit
          </button>
        </div>

        {/* Transparent pricing note */}
        <p className="mx-auto mt-10 max-w-xl text-center text-xs text-forest/55">
          Prices stay the same across every industry — only the monthly content
          mix changes.
        </p>
      </div>
    </section>
  );
}

function PlanCard({
  name,
  price,
  cadence,
  tagline,
  features,
  deliverables,
  cta,
  highlight = false,
}: {
  name: string;
  price: string;
  cadence: string;
  tagline: string;
  features: string[];
  deliverables: Deliverables;
  cta: { label: string; variant: "solid" | "outline" };
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1 }}
      className={`relative flex flex-col rounded-[2rem] border p-7 sm:p-9 ${
        highlight
          ? "border-terracotta/40 bg-white/60 shadow-[0_24px_70px_-40px_rgba(44,54,43,0.3)]"
          : "border-forest/10 bg-white/40"
      }`}
    >
      {highlight && (
        <span className="absolute -top-3 left-7 rounded-full bg-terracotta px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-cream">
          Recommended
        </span>
      )}

      {/* Plan header */}
      <div className="flex items-baseline justify-between">
        <h3 className="font-serif text-2xl font-medium text-forest">{name}</h3>
      </div>
      <p className="mt-2 text-sm text-forest/70">{tagline}</p>

      {/* Price — Inter semibold for clear numeral visibility */}
      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-sans text-4xl font-semibold tracking-tight text-forest sm:text-5xl">
          {price}
        </span>
        <span className="text-sm text-forest/60">{cadence}</span>
      </div>

      {/* Monthly deliverables */}
      <div className="mt-7 rounded-2xl border border-forest/10 bg-cream/60 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sage">
          Monthly deliverables
        </p>
        <dl className="mt-3 grid grid-cols-3 gap-3 text-center">
          <DeliverableItem label="Reels" value={deliverables.reels} />
          <DeliverableItem label="Posts" value={deliverables.posts} />
          <DeliverableItem label="Stories" value={deliverables.stories} />
        </dl>
      </div>

      {/* Features */}
      <ul className="mt-7 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-forest/80">
            <span
              aria-hidden
              className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                highlight ? "bg-terracotta" : "bg-sage"
              }`}
            />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        type="button"
        onClick={() => scrollToId("get-started")}
        className={`mt-8 inline-flex w-full items-center justify-center rounded-2xl px-6 py-3.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
          cta.variant === "solid"
            ? "bg-forest text-cream hover:bg-terracotta"
            : "border border-forest/30 text-forest hover:border-forest hover:bg-forest/5"
        }`}
      >
        {cta.label}
      </button>
    </motion.div>
  );
}

function DeliverableItem({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-forest/55">{label}</dt>
      <dd className="mt-1 font-sans text-2xl font-semibold text-forest">
        {value}
      </dd>
    </div>
  );
}
