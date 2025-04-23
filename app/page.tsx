"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <Box
      sx={{
        width: "100vw",
        height: "200vh",
      }}
    >
      <Stack direction={"column"} alignItems={"center"}>
        <Typography fontSize={"64px"} sx={{ mt: "25vh" }}>
          find your next job.
        </Typography>
        <Typography fontSize={"32px"} sx={{ mt: "1vh" }}>
          123,456 jobs found
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: "2vh",
            backgroundColor: "white",
            color: "#64558f",
            textTransform: "lowercase",
            borderRadius: "13px",
          }}
          onClick={() => router.push("/get-started")}
        >
          get started
        </Button>
        <Button
          variant="text"
          sx={{
            mt: "2vh",
            color: "white",
            textTransform: "lowercase",
          }}
        >
          or login
        </Button>
        <Typography fontSize={"64px"} sx={{ mt: "65vh" }}>
          how does it work?
        </Typography>
        <Typography fontSize={"32px"} sx={{ mt: "2vh" }}>
          jobseekr works by scraping the internet for new openings
        </Typography>
      </Stack>
    </Box>
  );
}
