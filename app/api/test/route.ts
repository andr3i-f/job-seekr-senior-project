import { NextResponse } from "next/server";
import axios from "axios";
import { gatherJwtFromSession } from "@/lib/auth/actions";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const testName = searchParams.get("test");

  const jwt = await gatherJwtFromSession();
  if (!jwt) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 400 });
  }

  try {
    const { data: axiosData } = await axios.get(
      process.env.JOB_SEEKR_JOB_API! + "/test/specific_test",
      {
        params: { test_name: testName },
        headers: { Authorization: `Bearer ${jwt}` },
      },
    );
    return NextResponse.json({ message: axiosData }, { status: 200 });
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

export async function POST(req: Request) {
  const body = await req.json();
  if (!body || !("test" in body)) {
    return NextResponse.json(
      { error: "'test' key missing from body!" },
      { status: 400 },
    );
  }

  const jwt = await gatherJwtFromSession();
  if (!jwt) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 400 });
  }

  try {
    const { data: axiosData } = await axios.post(
      process.env.JOB_SEEKR_JOB_API! + "/test/add",
      { test_name: body["test"] },
      { headers: { "Content-Type": "application/json" } },
    );

    return NextResponse.json(
      { message: axiosData },
      { status: axiosData.status },
    );
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
