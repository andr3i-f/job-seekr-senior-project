"use client";

import { NAVBAR_HEIGHT_IN_VH } from "@/constants/layout";
import { AccountCircle } from "@mui/icons-material";
import { AlertColor, Box, Button, Stack } from "@mui/material";
import { JSX, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../providers/UserProvider";
import { GoogleLogin } from "@react-oauth/google";
import { handleSignInWithGoogle } from "@/lib/auth/actions";
import React from "react";
import CustomSnackbar from "../snackbar/CustomSnackbar";

export default function NavBar(): JSX.Element {
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");
  const [snackBarSeverity, setSnackBarSeverity] =
    useState<AlertColor>("success");
  const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);

  const router = useRouter();
  const user = useUser();

  const homeButtonOnClick = () => {
    router.replace("/");
  };

  return (
    <React.Fragment>
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
              <div style={{ colorScheme: "light" }}>
                <GoogleLogin
                  size="medium"
                  onSuccess={async (credentialResponse) => {
                    try {
                      await handleSignInWithGoogle(
                        credentialResponse.credential,
                      );
                      setSnackBarMessage("Successful sign-in with Google!");
                      setSnackBarOpen(true);
                      setSnackBarSeverity("success");
                    } catch (error) {
                      setSnackBarMessage(
                        `Google sign-in failed: ${error instanceof Error ? error.message : String(error)}`,
                      );
                      setSnackBarOpen(true);
                      setSnackBarSeverity("error");
                    }
                  }}
                  onError={() => {
                    setSnackBarMessage("Google sign-in failed");
                    setSnackBarOpen(true);
                    setSnackBarSeverity("error");
                  }}
                />
              </div>
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
      <CustomSnackbar
        open={snackBarOpen}
        message={snackBarMessage}
        severity={snackBarSeverity}
        setOpen={setSnackBarOpen}
      />
    </React.Fragment>
  );
}
