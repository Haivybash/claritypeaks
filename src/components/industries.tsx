"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIndustry, scrollToId, type IndustryId } from "@/components/industry-context";

/**
 * Industries We Serve — interactive tabbed section.
 * Seven industries. Each tab swap animates with Framer Motion.
 *
 * Flow:
 *   - Tab click: updates local active tab AND shared industry context.
 *   - "Get Started" CTA: confirms shared context, scrolls to Pricing.
 *
 * Content is capability-based, not performance-claim-based — no invented
 * metrics, testimonials, or guarantees.
 */

type Industry = {
  id: string;
  label: string;
  headline: string;
  valueProp: string;
  reels: string;
  posts: string;
  shoot: string;
  outcome: string;
};

const industries: Industry[] = [
  {
    id: "clothing",
    label: "Clothing",
    headline: "Turn your boutique into a destination.",
    valueProp:
      "Styling-led content that turns browsers into buyers — combining aesthetic consistency, real-world wearability, and timely trend capitalisation.",
    reels: "Try-on hauls, beat-synced outfit transitions, styling tips.",
    posts: "Lookbook carousels, new arrivals, customer styling features.",
    shoot: "Natural light, lifestyle settings, match cuts for seamless outfit flow.",
    outcome: "Foot traffic and online sales driven by want, not just awareness.",
  },
  {
    id: "salons",
    label: "Salons & Spas",
    headline: "Showcase transformations that fill your chairs.",
    valueProp:
      "We turn cuts, colour, and treatments into a visual portfolio that turns scrollers into bookings.",
    reels: "Before-and-after reveals, styling details, fast-paced transitions.",
    posts: "Signature looks, stylist spotlights, seasonal service menus.",
    shoot: "Natural light, macro detail on hair and nails, handheld mobility for live styling.",
    outcome: "A feed that works as a booking engine — not just a portfolio.",
  },
  {
    id: "jewelry",
    label: "Jewelry",
    headline: "Let craftsmanship do the selling.",
    valueProp:
      "Macro detail, cinematic pacing, and storytelling that positions each piece as a milestone — not a product.",
    reels: "Cinematic reveals, slow-motion macro pans, soft defocus transitions.",
    posts: "Detail-led carousels, collection stories, occasion-driven features.",
    shoot: "Controlled lighting, macro lenses, reflective surfaces managed for brilliance.",
    outcome: "A premium presence that justifies your price before the first message.",
  },
  {
    id: "gyms",
    label: "Gyms & Fitness",
    headline: "Channel energy. Build community. Drive sign-ups.",
    valueProp:
      "High-intensity edits, trainer credibility, and member stories that turn your gym into the obvious local choice.",
    reels: "Workout highlights, form-correction tips, beat-synced training cuts.",
    posts: "Class schedules, member milestones, trainer-led education.",
    shoot: "High-energy coverage, dynamic angles, bold on-screen typography support.",
    outcome: "Trial registrations and long-term memberships — not vanity views.",
  },
  {
    id: "real-estate",
    label: "Real Estate",
    headline: "Listings that move. Neighbourhoods you own.",
    valueProp:
      "Smooth walkthroughs, drone authority, and clean listing content that qualifies buyers before they call.",
    reels: "Property walkthroughs, neighbourhood tours, market micro-updates.",
    posts: "New listings, price reflections, just-sold wins.",
    shoot: "Wide stabilised pans, drone coverage where applicable, clean text overlays.",
    outcome: "Qualified buyer and seller leads, not cold enquiries.",
  },
  {
    id: "restaurants",
    label: "Restaurants & Cafes",
    headline: "Make them hungry before they arrive.",
    valueProp:
      "Sensory, snackable content that captures the energy of your kitchen and pulls in local diners at decision time.",
    reels: "Sizzling prep, plating moments, behind-the-line energy.",
    posts: "Signature dishes, menu drops, atmosphere and interiors.",
    shoot: "Warm grading, quick pacing, geo-relevant framing for local discovery.",
    outcome: "Reservations and walk-ins driven by craving, not chance.",
  },
  {
    id: "interior-designers",
    label: "Interior Designers",
    headline: "Editorial framing for considered, high-ticket work.",
    valueProp:
      "A deliberate, architectural content style that communicates taste — and attracts clients who value it.",
    reels: "Symmetrical framing, material close-ups, slow transformation reveals.",
    posts: "Project case studies, sourcing stories, design philosophy.",
    shoot: "Natural light, deliberate pace, wide and balanced compositions.",
    outcome: "Long-term, high-ticket design consultations — not one-off jobs.",
  },
];

export function Industries() {
  const [activeId, setActiveId] = useState(industries[0].id);
  const { setIndustryId } = useIndustry();
  const active = industries.find((i) => i.id === activeId)!;

  function selectIndustry(id: string) {
    setActiveId(id);
    setIndustryId(id as IndustryId);
  }

  function handleGetStarted() {
    setIndustryId(active.id as IndustryId);
    scrollToId("pricing");
  }

  return (
    <section id="industries" className="relative overflow-hidden py-12 sm:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sage/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full border border-sage/50 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-forest/70">
            Industries We Serve
          </span>
          <h2 className="font-serif text-3xl font-medium leading-tight text-forest sm:text-4xl">
            Content shaped for the way your business actually works.
          </h2>
          <p className="mt-4 text-base text-forest/70 sm:text-lg">
            One agency, seven specialisms. Choose your industry to see how we
            approach it.
          </p>
        </div>

        {/* Tabs — horizontally scrollable on mobile */}
        <div
          role="tablist"
          aria-label="Industries"
          className="mt-10 flex snap-x gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible"
        >
          {industries.map((industry) => {
            const isActive = industry.id === activeId;
            return (
              <button
                key={industry.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${industry.id}`}
                id={`tab-${industry.id}`}
                onClick={() => selectIndustry(industry.id)}
                className={`snap-start whitespace-nowrap rounded-2xl border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
                  isActive
                    ? "border-forest bg-forest text-cream"
                    : "border-sage/50 text-forest hover:border-forest hover:bg-forest/5"
                }`}
              >
                {industry.label}
              </button>
            );
          })}
        </div>

        {/* Active panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            role="tabpanel"
            id={`panel-${active.id}`}
            aria-labelledby={`tab-${active.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 grid gap-6 rounded-[2rem] border border-forest/10 bg-white/40 p-6 sm:p-10 lg:grid-cols-2 lg:gap-10"
          >
            {/* Left: headline + value prop + CTA */}
            <div className="flex flex-col">
              <h3 className="font-serif text-2xl font-medium leading-snug text-forest sm:text-3xl">
                {active.headline}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-forest/75">
                {active.valueProp}
              </p>

              <div className="mt-6 rounded-2xl border border-terracotta/30 bg-terracotta/5 p-4">
                <p className="text-sm font-medium text-forest">
                  <span className="text-terracotta">Outcome — </span>
                  {active.outcome}
                </p>
              </div>

              <button
                type="button"
                onClick={handleGetStarted}
                className="mt-6 inline-flex w-fit items-center justify-center rounded-2xl bg-forest px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-terracotta focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                Get Started — {active.label}
              </button>
            </div>

            {/* Right: direction grid (Reels / Posts / Shoot) */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <DirectionCard
                label="Reels direction"
                body={active.reels}
              />
              <DirectionCard label="Posts direction" body={active.posts} />
              <DirectionCard
                label="Shoot direction"
                body={active.shoot}
                className="sm:col-span-2 lg:col-span-1 xl:col-span-2"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function DirectionCard({
  label,
  body,
  className = "",
}: {
  label: string;
  body: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-forest/10 bg-cream/60 p-5 ${className}`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sage">
        {label}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-forest/80">{body}</p>
    </div>
  );
}
