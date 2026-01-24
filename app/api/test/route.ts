import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import axios from "axios";

export async function GET(req: Request) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getSession();

  if (error) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 400 });
  }

  return NextResponse.json(
    { message: "You are authenticated!" },
    { status: 200 },
  );
}

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body["test"])
  if (!body || !("test" in body)) {
    return NextResponse.json({ error: "'test' key missing from body!" })
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 400 });
  }

  const { data: axiosData } = await axios.post(process.env.JOB_SEEKR_JOB_API! + "/test/add", { test_name: body["test"] }, { headers: { "Content-Type": "application/json" } })
  
  return NextResponse.json({ message: axiosData }, {status: axiosData.status})
}
