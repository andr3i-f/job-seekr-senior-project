"use client";

import { NAVBAR_HEIGHT_IN_VH } from "@/constants/layout";
import { AccountCircle } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import { JSX } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../providers/UserProvider";
import { GoogleLogin } from "@react-oauth/google";
import { handleSignInWithGoogle } from "@/lib/auth/actions";

export default function NavBar(): JSX.Element {
  const router = useRouter();
  const user = useUser();

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
          {!user && (
            <GoogleLogin
              size="medium"
              onSuccess={(credentialResponse) =>
                handleSignInWithGoogle(credentialResponse)
              }
              onError={() => {
                console.log("Login Failed");
              }}
            />
          )}
          {user && (
            <Button
              variant={"outlined"}
              endIcon={<AccountCircle />}
              sx={{
                textTransform: "none",
                color: "white",
                borderColor: "white",
              }}
              onClick={() => router.replace("/dashboard")}
            >
              dashboard
            </Button>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
