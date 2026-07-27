import { z } from "zod";

/**
 * Shared lead schema — used on BOTH client (form) and server (action).
 * Keeping it in one place prevents drift between the two validation layers.
 */

export const leadSchema = z.object({
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

export type LeadValues = z.infer<typeof leadSchema>;
