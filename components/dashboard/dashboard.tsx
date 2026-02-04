"use client";

import { Grid } from "@mui/material";
import React from "react";
import GenericDashboardCard from "./GenericDashboardCard";
import UserSkillsCard from "./profile/UserSkillsCard";
import RecentJobsCard from "./jobs/RecentJobsCard";
import UserPreferencesCard from "./settings/UserPreferencesCard";
import StatisticsCard from "./jobs/StatisticsCard";
import GeneralSettingsCard from "./settings/GeneralSettingsCard";
import MemeCard from "./meme/MemeCard";
import LinearLoadingBar from "../LinearLoadingBar";
import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/app/queries/dashboard";

export default function Dashboard() {
  const { isPending, isError, data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });

  return (
    <React.Fragment>
      {isPending && <LinearLoadingBar text={"loading user info. . ."} />}
      {!isError && data && (
        <Grid container spacing={2} columns={16} height={"100%"}>
          <Grid container size={16} spacing={2} sx={{ height: "50%" }}>
            <Grid size={9}>
              <GenericDashboardCard>
                <RecentJobsCard
                  experienceLevel={data.profile.experience_level}
                />
              </GenericDashboardCard>
            </Grid>
            <Grid size={7}>
              <GenericDashboardCard>
                <StatisticsCard />
              </GenericDashboardCard>
            </Grid>
          </Grid>
          <Grid container size={16} spacing={2} sx={{ height: "50%" }}>
            <Grid size={4}>
              <GenericDashboardCard>
                <UserSkillsCard skills={data.profile.skills} />
              </GenericDashboardCard>
            </Grid>
            <Grid size={4}>
              <GenericDashboardCard>
                <UserPreferencesCard
                  experienceLevel={data.profile.experience_level}
                />
              </GenericDashboardCard>
            </Grid>
            <Grid size={4}>
              <GenericDashboardCard>
                <GeneralSettingsCard />
              </GenericDashboardCard>
            </Grid>
            <Grid size={4}>
              <GenericDashboardCard>
                <MemeCard />
              </GenericDashboardCard>
            </Grid>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}
