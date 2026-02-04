import { DashboardResponse } from "@/constants/types";
import axios from "axios";

export async function getDashboard(): Promise<DashboardResponse> {
  const data = await axios.get("/api/dashboard");
  return data.data;
}
