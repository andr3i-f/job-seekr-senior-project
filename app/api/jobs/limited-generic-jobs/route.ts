import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(_: Request) {
  try {
    const { data: axiosData } = await axios.get(
      process.env.JOB_SEEKR_JOB_API! + "/jobs/limited-generic-jobs",
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
