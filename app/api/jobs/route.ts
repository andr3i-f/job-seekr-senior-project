import { gatherJwtFromSession } from "@/lib/auth/actions";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const experienceLevel = searchParams.get("experienceLevel");

  // TODO: Implement getting other parameters (location, startups, etc...)

  const jwt = await gatherJwtFromSession();
  if (!jwt) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 400 });
  }

  try {
    const { data: axiosData } = await axios.get(
      process.env.JOB_SEEKR_JOB_API! + "/jobs",
      {
        params: { experience_level: experienceLevel },
        headers: { Authorization: `Bearer ${jwt}` },
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
