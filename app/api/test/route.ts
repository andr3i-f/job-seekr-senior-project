import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import axios from "axios";
import { gather_jwt_from_session } from "@/lib/auth/actions";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const test_name = searchParams.get("test");

  const jwt = await gather_jwt_from_session();
  if (!jwt) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 400 });
  }

  const { data: axiosData } = await axios.get(
    process.env.JOB_SEEKR_JOB_API! + "/test/specific_test",
    {
      params: { test_name: test_name },
      headers: { Authorization: `Bearer ${jwt}` },
    },
  );
  return NextResponse.json({ message: axiosData }, { status: 200 });
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body || !("test" in body)) {
    return NextResponse.json({ error: "'test' key missing from body!" });
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 400 });
  }

  const { data: axiosData } = await axios.post(
    process.env.JOB_SEEKR_JOB_API! + "/test/add",
    { test_name: body["test"] },
    { headers: { "Content-Type": "application/json" } },
  );

  return NextResponse.json(
    { message: axiosData },
    { status: axiosData.status },
  );
}
