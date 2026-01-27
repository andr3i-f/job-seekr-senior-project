"use client";

import { NAVBAR_HEIGHT_IN_VH } from "@/constants/layout";
import { AccountCircle, Login } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import { JSX } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../providers/UserProvider";

export default function NavBar(): JSX.Element {
  const router = useRouter();
  const user = useUser();

  const profileButtonOnClick = () => {
    if (user) {
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
        <Box sx={{ pr: 3 }}>
          <Button
            variant={"outlined"}
            endIcon={user ? <AccountCircle /> : <Login />}
            sx={{ textTransform: "none", color: "white", borderColor: "white" }}
            onClick={profileButtonOnClick}
          >
            {user ? "dashboard" : "login"}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
