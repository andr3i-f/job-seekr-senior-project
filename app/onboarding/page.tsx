"use client";

import { NAVBAR_HEIGHT_IN_VH } from "@/constants/layout";
import { Box } from "@mui/material";

/**
 *  form inputs
 * 
 * experience level
 * skills
 * locations
 *  -- everything from the dashboard
 * 
 * have a manual entry OR submit ur resume so it can be parsed
 * 
 * press a button to see a limited selection of jobs
 * 
 * have a button that says want more? sign up
 * 
 * 
 */

export default function OnboardingPage() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: `${100 - NAVBAR_HEIGHT_IN_VH}vh`,
        p: 4,
      }}
    >
    </Box>
  );
}