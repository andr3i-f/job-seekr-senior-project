"use client";

import { NAVBAR_HEIGHT_IN_VH } from "@/constants/layout";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <Box
      sx={{
        width: "100vw",
        height: `${200 - NAVBAR_HEIGHT_IN_VH}vh`,
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
          onClick={() => router.replace("/onboarding")}
          variant="contained"
          sx={{
            mt: "2vh",
            backgroundColor: "white",
            color: "#64558f",
            textTransform: "lowercase",
            borderRadius: "13px",
          }}
        >
          get started
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
