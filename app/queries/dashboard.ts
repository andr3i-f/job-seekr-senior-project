import { DashboardResponse } from "@/constants/types";
import axios from "axios";

export async function getDashboard(): Promise<DashboardResponse> {
  const data = await axios.get("/api/dashboard");
  return data.data;
}

export async function updateExperienceLevel(experienceLevel: string) {
  const data = await axios.put("/api/dashboard/profile/experience-level", {
    experienceLevel: experienceLevel,
  });
  return data.data;
}
