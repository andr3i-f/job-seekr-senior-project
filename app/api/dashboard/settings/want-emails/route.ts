import { convertExperienceLevelToSegment } from "@/constants/functions";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function PUT(req: Request) {
  const body = await req.json();

  if (!body || !("wantEmails" in body)) {
    return NextResponse.json(
      { error: "'wantEmails' is missing from body!" },
      { status: 400 },
    );
  }

  if (body["wantEmails"] !== null && typeof body["wantEmails"] !== "boolean") {
    return NextResponse.json(
      { error: "'wantEmails' is incorrect type!" },
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

  if (!user.email) {
    return NextResponse.json(
      { error: "Could not get user email" },
      { status: 400 },
    );
  }

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("id")
    .eq("auth_user_fk", user.id)
    .single();

  const { data, error } = await supabase
    .from("user_settings")
    .update({ want_emails: body["wantEmails"] })
    .eq("user_profile_fk", profile!.id);

  if (error) {
    return NextResponse.json(
      { error: "Unable to update 'wantEmails' section" },
      { status: 500 },
    );
  }

  const { data: experienceLevel } = await supabase
    .from("user_profiles")
    .select("experience_level")
    .eq("auth_user_fk", user.id)
    .single();

  if (!experienceLevel) {
    return NextResponse.json(
      { error: "Experience level must be set to update email options!" },
      { status: 400 },
    );
  }

  const resend = new Resend(process.env.RESEND_KEY);

  if (body["wantEmails"] === true) {
    const { error: addContactError } = await resend.contacts.create({
      email: user.email,
      segments: [
        {
          id: convertExperienceLevelToSegment(experienceLevel.experience_level),
        },
      ],
    });

    if (addContactError) {
      return NextResponse.json({
        error: "Could not create user in Resend!",
        status: 500,
      });
    }
  } else if (body["wantEmails"] === false) {
    const { error: removeContactError } = await resend.contacts.remove({
      email: user.email,
    });

    if (removeContactError) {
      return NextResponse.json(
        { error: "Could not remove contact in Resend!" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ wantEmails: data }, { status: 200 });
}
