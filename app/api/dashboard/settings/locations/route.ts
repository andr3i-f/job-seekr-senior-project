import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const body = await req.json();

  if (!body || !("locations" in body)) {
    return NextResponse.json(
      {
        error: "'locations' list is missing from body!",
      },
      { status: 400 },
    );
  }

  if (body["locations"] !== null && typeof body["locations"] !== "string") {
    return NextResponse.json(
      {
        error: "'locations' is incorrect type!",
      },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 400 });
  }

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("id")
    .eq("auth_users_fk", user.id)
    .single();
  const { data, error } = await supabase
    .from("user_settings")
    .update({ locations: body["locations"] })
    .eq("user_profile_fk", profile!.id);

  if (error) {
    return NextResponse.json(
      { error: "Unable to update 'locations' section" },
      { status: 500 },
    );
  }

  return NextResponse.json({ locations: data }, { status: 200 });
}
