"use server";

import { Resend } from "resend";
import { leadSchema, type LeadValues } from "@/lib/lead-schema";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitLead(data: LeadValues) {
  const parsed = leadSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false as const, error: "Invalid form data." };
  }

  const lead = parsed.data;

  const { error } = await resend.emails.send({
    from: "Clarity Peaks Leads <onboarding@resend.dev>",
    to: process.env.LEAD_NOTIFY_EMAIL!,
    replyTo: lead.email,
    subject: `New lead: ${lead.businessName} — ${lead.industry}`,
    html: `
      <h2>New enquiry from the website</h2>
      <p><strong>Name:</strong> ${lead.fullName}</p>
      <p><strong>Business:</strong> ${lead.businessName}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Phone:</strong> ${lead.phone}</p>
      <p><strong>Industry:</strong> ${lead.industry}</p>
      <p><strong>Goal:</strong> ${lead.goal}</p>
    `,
  });

  if (error) {
    console.error("Resend send failed:", error);
    return { success: false as const, error: "Couldn't send notification email." };
  }

  return { success: true as const };
}