"use client";

import { Box, Button, Stack } from "@mui/material";
import { NAVBAR_HEIGHT_IN_VH } from "@/constants/layout";
import { login } from "@/lib/auth/actions";

export default function LoginPage() {
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
        <Button variant="contained" onClick={() => login()}>
          Login with Google
        </Button>
      </Stack>
    </Box>
  );
}
