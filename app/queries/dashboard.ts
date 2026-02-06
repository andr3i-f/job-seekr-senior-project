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

export async function updateUserSkills(skills: string[]) {
  const data = await axios.put("/api/dashboard/profile/skills", {
    skills: skills.length > 0 ? skills.join(",") : null,
  });
  return data.data;
}

export async function updateUserLocations(locations: string[]) {
  const data = await axios.put("/api/dashboard/profile/locations", {
    locations: locations.length > 0 ? locations.join("|") : null,
  });
  return data.data;
}
