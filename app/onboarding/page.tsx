"use client";

import Onboarding from "@/components/onboarding/Onboarding";
import { NAVBAR_HEIGHT_IN_VH } from "@/constants/layout";
import { Box } from "@mui/material";

export default function OnboardingPage() {
  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        minHeight: `${100 - NAVBAR_HEIGHT_IN_VH}vh`,
        p: 4,
      }}
    >
      <Onboarding />
    </Box>
  );
}
