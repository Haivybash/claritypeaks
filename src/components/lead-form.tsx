"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  useIndustry,
  scrollToId,
  type IndustryId,
} from "@/components/industry-context";

/**
 * Single-step lead form.
 *
 * Fields: Full name, Business name, Email, Phone, Industry (dropdown),
 * Primary goal (dropdown). No package selection — that's handled in Pricing.
 *
 * Industry dropdown pre-selects from the shared context (carried over from the
 * Industries / Pricing sections). User can still change it here.
 *
 * Submits via a Server Action (Phase 6) which inserts into Supabase.
 */

const industryOptions: { id: IndustryId; label: string }[] = [
  { id: "clothing", label: "Clothing" },
  { id: "salons", label: "Salons & Spas" },
  { id: "jewelry", label: "Jewelry" },
  { id: "gyms", label: "Gyms & Fitness" },
  { id: "real-estate", label: "Real Estate" },
  { id: "restaurants", label: "Restaurants & Cafes" },
  { id: "interior-designers", label: "Interior Designers" },
];

const goalOptions = [
  "Increase brand awareness",
  "Generate more enquiries or bookings",
  "Improve visual quality",
  "Build a stronger local presence",
  "Help me decide",
] as const;

const schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "Name is too long"),
  businessName: z
    .string()
    .trim()
    .min(2, "Please enter your business name")
    .max(120, "Business name is too long"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20, "Phone number is too long"),
  industry: z.string().min(1, "Please select your industry"),
  goal: z.string().min(1, "Please select your primary goal"),
});

type FormData = z.infer<typeof schema>;

export function LeadForm() {
  const { industryId } = useIndustry();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      businessName: "",
      email: "",
      phone: "",
      industry: industryId,
      goal: "",
    },
  });

  // Keep the dropdown synced with the shared context whenever it changes
  // (e.g. user picks a different industry in the section above).
  useEffect(() => {
    setValue("industry", industryId);
  }, [industryId, setValue]);

  async function onSubmit(data: FormData) {
    // Phase 6 will POST this to Supabase. For now we simulate a brief
    // submission so the success screen feels real.
    console.log("Lead submitted:", data);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
  }

  return (
    <section id="get-started" className="relative overflow-hidden py-12 sm:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-sage/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <span className="mb-4 inline-block rounded-full border border-sage/50 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-forest/70">
            Get Started
          </span>
          <h2 className="font-serif text-3xl font-medium leading-tight text-forest sm:text-4xl">
            Let&apos;s build your local presence.
          </h2>
          <p className="mt-3 text-base text-forest/70">
            Quick details below — we&apos;ll follow up within one business day.
          </p>
        </div>

        <motion.div
          initial={false}
          className="mt-10 rounded-[2rem] border border-forest/10 bg-white/50 p-6 shadow-[0_24px_70px_-50px_rgba(44,54,43,0.3)] sm:p-10"
        >
          {submitted ? (
            <SuccessCard
              name={undefined}
              onReset={() => {
                reset();
                setSubmitted(false);
              }}
            />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Full name */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-forest"
                  >
                    Full name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    className={inputClass(errors.fullName)}
                    {...register("fullName")}
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 text-sm text-terracotta">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Business name */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="businessName"
                    className="block text-sm font-medium text-forest"
                  >
                    Business name
                  </label>
                  <input
                    id="businessName"
                    type="text"
                    autoComplete="organization"
                    placeholder="Your business"
                    className={inputClass(errors.businessName)}
                    {...register("businessName")}
                  />
                  {errors.businessName && (
                    <p className="mt-1.5 text-sm text-terracotta">
                      {errors.businessName.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-forest"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@business.com"
                    className={inputClass(errors.email)}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-sm text-terracotta">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-forest"
                  >
                    Contact number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Your phone number"
                    className={inputClass(errors.phone)}
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-sm text-terracotta">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Industry dropdown */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="industry"
                    className="block text-sm font-medium text-forest"
                  >
                    Industry
                  </label>
                  <select
                    id="industry"
                    className={inputClass(errors.industry)}
                    {...register("industry")}
                  >
                    {industryOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.industry && (
                    <p className="mt-1.5 text-sm text-terracotta">
                      {errors.industry.message}
                    </p>
                  )}
                </div>

                {/* Goal dropdown */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="goal"
                    className="block text-sm font-medium text-forest"
                  >
                    Primary goal
                  </label>
                  <select
                    id="goal"
                    className={inputClass(errors.goal)}
                    {...register("goal")}
                  >
                    <option value="">Select a goal…</option>
                    {goalOptions.map((goal) => (
                      <option key={goal} value={goal}>
                        {goal}
                      </option>
                    ))}
                  </select>
                  {errors.goal && (
                    <p className="mt-1.5 text-sm text-terracotta">
                      {errors.goal.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit */}
              <div className="mt-8 flex flex-col items-center gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl bg-forest px-7 py-3.5 text-sm font-medium text-cream shadow-sm transition-colors hover:bg-terracotta focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:opacity-60 sm:w-auto"
                >
                  {isSubmitting ? "Sending…" : "Submit"}
                </button>
                <span className="text-xs text-forest/55">
                  We respect your privacy. No spam.
                </span>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function inputClass(error?: { message?: string }) {
  return `mt-1.5 w-full rounded-2xl border bg-cream/70 px-4 py-3 text-sm text-forest placeholder:text-forest/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
    error ? "border-terracotta" : "border-forest/20"
  }`;
}

function SuccessCard({
  name,
  onReset,
}: {
  name?: string;
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="py-6 text-center"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest">
        <span className="text-2xl text-cream">✓</span>
      </div>
      <h3 className="mt-6 font-serif text-3xl font-medium text-forest">
        Thanks{name ? `, ${name}` : ""} — your details are in.
      </h3>
      <p className="mx-auto mt-3 max-w-md text-base text-forest/70">
        We&apos;ll review your goals and reach out within one business day. Want
        to lock in a time now?
      </p>
      <div className="mt-8 flex flex-col items-center gap-3">
        <a
          href="#get-started"
          className="rounded-2xl bg-forest px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-terracotta focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          Book a Call
        </a>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-forest/55 underline-offset-2 hover:underline"
        >
          Submit another enquiry
        </button>
      </div>
      <p className="mt-4 text-xs text-forest/50">
        Booking calendar integration lands in a later phase.
      </p>
    </motion.div>
  );
}
