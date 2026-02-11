import { gatherJwtFromSession } from "@/lib/auth/actions";
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
    formData.append("resume", resumeFile)

    console.log(formData)

    const { data: axiosData } = await axios.post(
      process.env.JOB_SEEKR_JOB_API! + "/resume/parse-resume",
      formData,
      {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${jwt}` },
      },
    );
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
