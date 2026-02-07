import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const body = await req.json();

  if (!body || !("workFromHome" in body)) {
    return NextResponse.json(
      {
        error: "'workFromHome' list is missing from body!",
      },
      { status: 400 },
    );
  }

  const allowed_work_from_home_input = ["No preference", "No", "Yes"];
  if (
    body["workFromHome"] !== null &&
    (typeof body["workFromHome"] !== "string" ||
      !allowed_work_from_home_input.includes(body["workFromHome"]))
  ) {
    return NextResponse.json(
      {
        error:
          "'workFromHome' must be one of the following: 'No preference', 'No', 'Yes'!",
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
    .eq("auth_user_fk", user.id)
    .single();
  const { data, error } = await supabase
    .from("user_settings")
    .update({ work_from_home: body["workFromHome"] })
    .eq("user_profile_fk", profile!.id);

  if (error) {
    return NextResponse.json(
      { error: "Unable to update 'workFromHome' section" },
      { status: 500 },
    );
  }

  return NextResponse.json({ workFromHome: data }, { status: 200 });
}
