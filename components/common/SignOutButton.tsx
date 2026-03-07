"use client";

import { handleSignOut } from "@/lib/auth/actions";
import { useRouter } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";

export default function SignOutButton() {
  const router = useRouter();

  const handleClickSignOut = async () => {
    await handleSignOut();
    router.refresh();
  };

  return (
    <Button
      variant={"outlined"}
      endIcon={<LogoutIcon />}
      sx={{
        textTransform: "none",
        color: "white",
        borderColor: "white",
        ml: 2,
      }}
      onClick={handleClickSignOut}
    >
      sign out
    </Button>
  );
}
