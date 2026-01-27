"use client";

import { useUser } from "@/components/providers/UserProvider";
import { NAVBAR_HEIGHT_IN_VH } from "@/constants/layout";
import { Box, Stack, Typography } from "@mui/material";

export default function DashboardPage() {
  const user = useUser();

  return (
    <Box
      sx={{
        width: "100vw",
        height: `${100 - NAVBAR_HEIGHT_IN_VH}vh`,
      }}
    >
      <Stack
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100%"}
      >
        <Typography>Welcome {user?.user_metadata?.full_name}</Typography>
      </Stack>
    </Box>
  );
}
