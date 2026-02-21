import { Job, OnboardingInputs } from "@/constants/types";
import axios from "axios";

export async function getJobs(experienceLevel: string): Promise<Job[]> {
  const data = await axios.get("/api/jobs", {
    params: { experienceLevel: experienceLevel },
  });
  return data.data.jobs;
}

export async function getDemoJobs(userInfo: OnboardingInputs): Promise<Job[]> {
  const data = await axios.get("/api/jobs/limited-generic-jobs", {
    params: {
      experienceLevel: userInfo.experience_level,
      skills: userInfo.skills,
      workFromHome: userInfo.work_from_home,
      locations: userInfo.locations,
      startUps: userInfo.start_ups,
      wantEmails: userInfo.want_emails,
    },
  });
  return data.data.jobs;
}

export async function getTotalJobs() {
  const data = await axios.get("/api/jobs/get-total-jobs");
  return data.data;
}
