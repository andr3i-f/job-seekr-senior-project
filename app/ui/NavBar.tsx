"use client";

import { AccountCircle, Image } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { JSX } from "react";

export default function NavBar(): JSX.Element {
  const router = useRouter();

  return (
    <Box
      width={"100vw"}
      height={"6vh"}
      sx={{
        background: "#372483",
        boxShadow: "2",
        borderBottomRightRadius: "10px",
        borderBottomLeftRadius: "10px",
      }}
    >
      <Stack
        direction={"row"}
        width={"100vw"}
        height={"100%"}
        justifyContent="space-between"
        alignItems="center"
        px={2}
      >
        <Button>
          <img
            src="/jobseekrlogo.png"
            height={"30px"}
            onClick={() => router.replace("/")}
          />
        </Button>
        <AccountCircle sx={{ fontSize: "32px" }} />
      </Stack>
    </Box>
  );
}
