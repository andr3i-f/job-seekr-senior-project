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

  if (!(resumeFile instanceof File)) {
    return NextResponse.json(
      { error: "'resume' must be a file upload!" },
      { status: 400 },
    );
  }

  try {
    const formData = new FormData();
    formData.append("resume", resumeFile);

    const { data: axiosData } = await axios.post(
      process.env.JOB_SEEKR_JOB_API! + "/resume/parse-resume",
      formData,
    );

    const parsedData = axiosData.parsed;

    console.log(parsedData);

    if (!("skills" in parsedData) || !("experience_level" in parsedData)) {
      return NextResponse.json(
        { error: "Could not retrieve parsed information" },
        { status: 500 },
      );
    }

    const allowed_experience_levels = [
      "Intern",
      "Junior",
      "Mid-Level",
      "Senior",
    ];
    if (
      parsedData["experience_level"] !== null &&
      (typeof parsedData["experience_level"] !== "string" ||
        !allowed_experience_levels.includes(parsedData["experience_level"]))
    ) {
      return NextResponse.json(
        {
          error:
            "'experienceLevel' must be one of the following: 'Intern', 'Junior', 'Mid-Level', 'Senior'!",
        },
        { status: 400 },
      );
    }

    const cleanedSkills = parsedData["skills"].map((skill: string) =>
      skill.replaceAll(",", ""),
    );

    return NextResponse.json(
      {
        experienceLevel: parsedData["experience_level"],
        skills: cleanedSkills,
      },
      { status: 200 },
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
