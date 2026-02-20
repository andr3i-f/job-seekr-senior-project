import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const experienceLevel = searchParams.get("experienceLevel");
  const skills = searchParams.get("skills");

  // TODO: implement rest of params

  try {
    const { data: axiosData } = await axios.get(
      process.env.JOB_SEEKR_JOB_API! + "/jobs/limited-generic-jobs",
      {
        params: { experience_level: experienceLevel, skills: skills },
      },
    );
    return NextResponse.json({ jobs: axiosData.jobs }, { status: 200 });
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
