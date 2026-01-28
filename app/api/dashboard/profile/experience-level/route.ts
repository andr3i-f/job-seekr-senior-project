import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const body = await req.json();

  if (!body || !("experienceLevel" in body)) {
    return NextResponse.json(
      { error: "'experienceLevel' is missing from body!" },
      { status: 400 },
    );
  }

  const allowed_experience_levels = ["Intern", "Junior", "Mid-Level", "Senior"];
  if (
    body["experienceLevel"] !== null &&
    typeof body["experienceLevel"] !== "string" &&
    allowed_experience_levels.find((e) => e === body["experienceLevel"]) !==
      undefined
  ) {
    return NextResponse.json(
      {
        error:
          "'experienceLevel' must be one of the following: 'Intern', 'Junior', 'Mid-Level', 'Senior'!",
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

  const { data, error } = await supabase
    .from("user_profiles")
    .update({ experience_level: body["experienceLevel"] })
    .eq("auth_user_fk", user.id);

  if (error) {
    return NextResponse.json(
      { error: "Unable to update 'experience_level' section" },
      { status: 500 },
    );
  }

  return NextResponse.json({ skills: data }, { status: 200 });
}
