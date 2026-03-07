import axios from "axios";

export async function getTotalUsers() {
  const data = await axios.get("/api/admin/total-users");

  return data.data;
}
