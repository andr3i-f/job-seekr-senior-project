"use client";

import { NAVBAR_HEIGHT_IN_VH } from "@/constants/layout";
import { AccountCircle } from "@mui/icons-material";
import { Box, Button, IconButton, Stack } from "@mui/material";
import { JSX } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../providers/UserProvider";

export default function NavBar(): JSX.Element {
  const router = useRouter();
  const data = useUser();

  const profileButtonOnClick = () => {
    if (data) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  };

  const homeButtonOnClick = () => {
    router.replace("/");
  };

  return (
    <Box
      width={"100vw"}
      height={`${NAVBAR_HEIGHT_IN_VH}vh`}
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
        <Button
          size="large"
          sx={{ color: "white", textTransform: "none" }}
          onClick={homeButtonOnClick}
        >
          jobseekr.
        </Button>
        <IconButton
          aria-label="profile-or-login-button"
          sx={{ pr: 3, color: "white", scale: "1.25" }}
          onClick={profileButtonOnClick}
        >
          <AccountCircle />
        </IconButton>
      </Stack>
    </Box>
  );
}
