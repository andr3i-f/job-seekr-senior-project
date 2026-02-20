import axios from "axios";

export async function parseResume(resume: File) {
  const formData = new FormData();
  formData.append("resume", resume);

  const data = await axios.post("/api/resume", formData);

  return data.data;
}

export async function parseOnboardingResume(resume: File) {
  const formData = new FormData();
  formData.append("resume", resume);

  const data = await axios.post("/api/resume/onboarding", formData);
  console.log(data.data);
  return data.data;
}
