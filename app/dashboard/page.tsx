"use client";

import UserSkills from "@/components/dashboard/profile/UserSkills";
import LinearLoadingBar from "@/components/LinearLoadingBar";
import { useUser } from "@/components/providers/UserProvider";
import { NAVBAR_HEIGHT_IN_VH } from "@/constants/layout";
import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const user = useUser();

  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [dashboardData, setDashboardData] = useState<undefined | any>(
    undefined,
  );

  useEffect(() => {
    setLoadingDashboard(true);

    axios
      .get("/api/dashboard")
      .then((response) => {
        setDashboardData(response.data);
      })
      .catch((_) => {
        console.error("Error trying to get dashboard information!");
      })
      .finally(() => {
        setLoadingDashboard(false);
      });
  }, []);

  return (
    <Box
      sx={{
        width: "100vw",
        height: `${100 - NAVBAR_HEIGHT_IN_VH}vh`,
      }}
    >
      <Stack
        direction={"column"}
        justifyContent={"start"}
        alignItems={"start"}
        height={"100%"}
      >
        {loadingDashboard && (
          <LinearLoadingBar text={"loading user info. . ."} />
        )}
        {user && dashboardData && !loadingDashboard && (
          <Typography fontWeight={"bold"} variant="h5" sx={{ mt: 2, ml: 2 }}>
            Welcome {user?.user_metadata?.full_name}!
          </Typography>
        )}
        {user && dashboardData && !loadingDashboard && (
          <UserSkills skills={dashboardData.profile.skills} />
        )}
      </Stack>
    </Box>
  );
}
