"use client";

import Dashboard from "@/components/dashboard/Dashboard";
import { NAVBAR_HEIGHT_IN_VH } from "@/constants/layout";
import { Box } from "@mui/material";

export default function DashboardPage() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: `${100 - NAVBAR_HEIGHT_IN_VH}vh`,
        p: 4,
      }}
    >
      <Dashboard />
    </Box>
  );
}
