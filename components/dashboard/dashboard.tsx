"use client";

import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import GenericDashboardCard from "./GenericDashboardCard";
import UserSkillsCard from "./profile/UserSkillsCard";
import RecentJobsCard from "./jobs/RecentJobsCard";
import UserPreferencesCard from "./settings/UserPreferencesCard";
import StatisticsCard from "./jobs/StatisticsCard";
import GeneralSettingsCard from "./settings/GeneralSettingsCard";
import MemeCard from "./meme/MemeCard";
import { useUser } from "../providers/UserProvider";
import axios from "axios";
import LinearLoadingBar from "../LinearLoadingBar";
import { DashboardResponse } from "@/constants/types";

export default function Dashboard() {
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

  const showDashboard = user && !loadingDashboard && dashboardData;

  return (
    <React.Fragment>
      {!showDashboard && <LinearLoadingBar text={"loading user info. . ."} />}
      {showDashboard && (
        <Grid container spacing={2} columns={16} height={"100%"}>
          <Grid container size={16} spacing={2} sx={{ height: "50%" }}>
            <Grid size={9}>
              <GenericDashboardCard>
                <RecentJobsCard
                  experienceLevel={dashboardData.profile.experience_level}
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
                <UserSkillsCard skills={dashboardData.profile.skills} />
              </GenericDashboardCard>
            </Grid>
            <Grid size={4}>
              <GenericDashboardCard>
                <UserPreferencesCard
                  experienceLevel={dashboardData.profile.experience_level}
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
