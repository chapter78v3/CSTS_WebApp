import { NextResponse } from "next/server";
export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    hasSENDGRID: Boolean(process.env.SENDGRID_API_KEY),
    hasFROM: Boolean(process.env.CONTACT_FROM_EMAIL),
    hasTO: Boolean(process.env.CONTACT_TO_EMAIL),
  });
}
