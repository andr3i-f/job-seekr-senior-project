import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getSession();

  if (error) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 400 });
  }

  return NextResponse.json(
    { message: "You are authenticated!" },
    { status: 200 },
  );
}
