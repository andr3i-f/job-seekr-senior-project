import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 400 });
  }

  const admin_select = "admin";

  const { data: adminInfo, error: adminInfoError } = await supabase
    .from("user_profiles")
    .select(admin_select)
    .single();

  if (!adminInfo?.admin || adminInfoError) {
    return NextResponse.json(
      { error: "User is not an admin or there is an error getting info :P" },
      { status: 500 },
    );
  }

  const { count, error } = await getSupabaseAdmin()
    .from("user_profiles")
    .select("*", { count: "exact", head: true });

  if (error) {
    return NextResponse.json(
      { error: "Unable to retrieve total user information" },
      { status: 500 },
    );
  }

  return NextResponse.json(count, { status: 200 });
}
