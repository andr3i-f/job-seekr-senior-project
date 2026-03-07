"use client";

import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
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
      onClick={handleSignOut}
    >
      sign out
    </Button>
  );
}
