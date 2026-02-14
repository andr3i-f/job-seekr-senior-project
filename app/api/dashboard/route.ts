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

  const user_settings_select =
    "work_from_home, locations, start_ups, want_emails";
  const user_profile_select = "skills, experience_level";

  const { data: userProfileData, error: userProfileError } = await supabase
    .from("user_profiles")
    .select(user_profile_select)
    .single();
  const { data: userSettingsData, error: userSettingsError } = await supabase
    .from("user_settings")
    .select(user_settings_select)
    .single();

  if (userProfileError || userSettingsError) {
    return NextResponse.json(
      { error: "Unable to retrieve dashboard information" },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { profile: userProfileData, settings: userSettingsData },
    { status: 200 },
  );
}
