"use client";

import { motion } from "framer-motion";
import { scrollToId } from "@/components/industry-context";

/**
 * Hero — premium, conversion-focused. No fabricated metrics.
 * Primary CTA "Get Started" → Industries section.
 * Secondary CTA "Book a Call" → lead form at the bottom.
 * Visual tiles now visible on mobile too (single column) to fill the space.
 */
const trustSignals = [
  "Built for local brands",
  "Reels-ready content",
  "Strategy before posting",
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Sage background blobs — Organic Modern texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-sage/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-40 -left-32 h-80 w-80 rounded-full bg-sage/15 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-16">
        {/* Left: copy + CTAs */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start"
        >
          <motion.span
            variants={item}
            className="mb-5 rounded-full border border-sage/50 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-forest/70"
          >
            Social Media Management
          </motion.span>

          <motion.h1
            variants={item}
            className="max-w-xl font-serif text-4xl font-medium leading-[1.1] text-forest sm:text-5xl lg:text-6xl"
          >
            Make your local brand impossible to overlook.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-base leading-relaxed text-forest/75 sm:text-lg"
          >
            Turn everyday business moments into strategic social content that
            earns attention, builds trust, and invites enquiries.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <button
              onClick={() => scrollToId("industries")}
              className="rounded-2xl bg-forest px-7 py-3.5 text-center text-sm font-medium text-cream shadow-sm transition-colors hover:bg-terracotta focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              Get Started
            </button>
            <button
              onClick={() => scrollToId("get-started")}
              className="rounded-2xl border border-sage px-7 py-3.5 text-center text-sm font-medium text-forest transition-colors hover:border-forest hover:bg-forest/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              Book a Call With Us
            </button>
          </motion.div>

          {/* Non-numerical trust signals */}
          <motion.ul
            variants={item}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-forest/70"
          >
            {trustSignals.map((signal) => (
              <li key={signal} className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                {signal}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right: abstract Organic Modern visual.
            Visible on all breakpoints to fill the hero on mobile. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative mx-auto h-[340px] w-full max-w-sm sm:h-[420px] sm:max-w-md"
          aria-hidden
        >
          <div className="absolute inset-0 rounded-[2rem] border border-forest/10 bg-white/40 shadow-[0_20px_60px_-30px_rgba(44,54,43,0.25)]" />

          {/* Reel tile (top, wide) */}
          <div className="absolute left-8 right-8 top-8 h-44 rounded-2xl bg-forest shadow-lg">
            <div className="flex h-full flex-col justify-between p-5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-terracotta" />
                <span className="text-xs uppercase tracking-widest text-cream/70">
                  Reel
                </span>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-3/4 rounded-full bg-cream/30" />
                <div className="h-2 w-1/2 rounded-full bg-cream/20" />
              </div>
            </div>
          </div>

          {/* Post tile (bottom-left) */}
          <div className="absolute bottom-8 left-8 h-36 w-40 rounded-2xl border border-forest/10 bg-sage/30 p-4">
            <div className="h-2 w-2/3 rounded-full bg-forest/40" />
            <div className="mt-2 h-2 w-1/2 rounded-full bg-forest/25" />
          </div>

          {/* Story tile (bottom-right) */}
          <div className="absolute bottom-12 right-8 h-32 w-28 rounded-2xl border border-forest/10 bg-cream p-4 shadow-md">
            <div className="mx-auto h-10 w-10 rounded-full border-2 border-terracotta" />
            <div className="mt-3 h-1.5 w-3/4 rounded-full bg-forest/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
