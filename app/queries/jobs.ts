import { Job } from "@/constants/types";
import axios from "axios";

export async function getJobs(experienceLevel: string): Promise<Job[]> {
  const data = await axios.get("/api/jobs", {
    params: { experienceLevel: experienceLevel },
  });
  return data.data;
}
