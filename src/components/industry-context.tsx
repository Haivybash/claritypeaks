"use client";

import { createContext, useContext, useState, ReactNode } from "react";

/**
 * Shared industry selection state.
 *
 * Flow:
 *   Industries section "Get Started" → sets industryId + scrolls to Pricing
 *   Pricing reads industryId (no selector) → shows that industry's plans
 *   Form reads industryId → pre-selects in dropdown
 */

export type IndustryId =
  | "clothing"
  | "salons"
  | "jewelry"
  | "gyms"
  | "real-estate"
  | "restaurants"
  | "interior-designers";

type Ctx = {
  industryId: IndustryId;
  setIndustryId: (id: IndustryId) => void;
};

const IndustryContext = createContext<Ctx | null>(null);

export function IndustryProvider({ children }: { children: ReactNode }) {
  const [industryId, setIndustryId] = useState<IndustryId>("clothing");

  return (
    <IndustryContext.Provider value={{ industryId, setIndustryId }}>
      {children}
    </IndustryContext.Provider>
  );
}

export function useIndustry() {
  const ctx = useContext(IndustryContext);
  if (!ctx) {
    throw new Error("useIndustry must be used within an IndustryProvider");
  }
  return ctx;
}

/** Smooth-scroll to an element id, accounting for sticky header. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
