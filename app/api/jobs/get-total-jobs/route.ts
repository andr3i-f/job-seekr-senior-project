import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { data: axiosData } = await axios.get(
      process.env.JOB_SEEKR_JOB_API! + "/jobs/total-jobs",
    );

    return NextResponse.json({ totalJobs: axiosData.total_jobs });
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
