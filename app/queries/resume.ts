import axios from "axios";

export async function parseResume(resume: any) {
    const formData = new FormData();
    formData.append("resume", resume)

    const data = await axios.post("/api/resume", formData)

     return data.data;
}