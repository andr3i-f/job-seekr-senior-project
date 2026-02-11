import { gatherJwtFromSession } from "@/lib/auth/actions";
import { createClient } from "@/lib/supabase/server";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.formData();
  const resumeFile = data.get("resume");

  if (!resumeFile) {
    return NextResponse.json(
      { error: "'resume' is missing from body!" },
      { status: 400 },
    );
  }

  const jwt = await gatherJwtFromSession();
  if (!jwt) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 400 });
  }

  try {
    const formData = new FormData();
    formData.append("resume", resumeFile);

    const { data: axiosData } = await axios.post(
      process.env.JOB_SEEKR_JOB_API! + "/resume/parse-resume",
      formData,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );

    const parsedData = axiosData.parsed;

    if (!("skills" in parsedData) || !("experience_level" in parsedData)) {
      return NextResponse.json({ error: "Could not retrive parsed information" }, { status: 500 })
    }

    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (!user || userError) {
    return NextResponse.json({ error: "Could not retrive user information" }, { status: 400 });
  }

      const { data, error } = await supabase
    .from("user_profiles")
    .update({ experience_level: parsedData["experience_level"] })
    .eq("auth_user_fk", user.id);

    

    console.log(axiosData.parsed)

    return NextResponse.json({ parsed: axiosData.parsed });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.message || error.message },
        { status: error.response?.status || 500 },
      );
    }
    return NextResponse.json(
      { error: "An unexpected error happened" },
      { status: 500 },
    );
  }
}
