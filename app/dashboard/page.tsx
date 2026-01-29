"use client";

import RecentJobs from "@/components/dashboard/jobs/RecentJobs";
import Statistics from "@/components/dashboard/jobs/Statistics";
import ExperienceLevel from "@/components/dashboard/profile/ExperienceLevel";
import UserSkills from "@/components/dashboard/profile/UserSkills";
import GeneralSettings from "@/components/dashboard/settings/GeneralSettings";
import UserPreferences from "@/components/dashboard/settings/UserPreferences";
import LinearLoadingBar from "@/components/LinearLoadingBar";
import { useUser } from "@/components/providers/UserProvider";
import { NAVBAR_HEIGHT_IN_VH } from "@/constants/layout";
import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const user = useUser();

  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [dashboardData, setDashboardData] = useState<
    DashboardResponse | undefined
  >(undefined);

  useEffect(() => {
    setLoadingDashboard(true);

    axios
      .get("/api/dashboard")
      .then((response) => {
        setDashboardData(response.data as DashboardResponse);
      })
      .catch((_) => {
        console.error("Error trying to get dashboard information!");
      })
      .finally(() => {
        setLoadingDashboard(false);
      });
  }, []);

  const showDashboard = user && dashboardData && !loadingDashboard;

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
        pt={2}
        px={2}
      >
        {!showDashboard && (
          <LinearLoadingBar text={"loading user info. . ."} />
        )}
        {showDashboard && (
          <Typography fontWeight={"bold"} variant="h5">
            Welcome {user?.user_metadata?.full_name}!
          </Typography>
        )}
        {showDashboard && (
          <Stack
            direction={"row"}
            height={"fit-content"}
            minHeight={"40%"}
            width={"100%"}
            justifyContent={"start"}
            pb={2}
            spacing={2}
          >
            <Stack direction={"column"} width={"27%"}>
              {showDashboard && (
                <UserSkills skills={dashboardData.profile.skills} />
              )}
              {showDashboard && (
                <ExperienceLevel
                  experienceLevel={dashboardData.profile.experience_level}
                />
              )}
            </Stack>
            {showDashboard && (
              <UserPreferences settings={dashboardData.settings} />
            )}
            {showDashboard && !loadingDashboard && <RecentJobs />}
          </Stack>
        )}
        {showDashboard && <Stack
          direction={"row"}
          height={"50%"}
          width={"100%"}
          justifyContent={"start"}
          pb={2}
          spacing={2}
        >
          {showDashboard && <Statistics />}
          {showDashboard && <GeneralSettings/>}
        </Stack>}
      </Stack>
    </Box>
  );
}
