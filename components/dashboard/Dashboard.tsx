"use client";

import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import GenericDashboardCard from "./GenericDashboardCard";
import RecentJobsCard from "./jobs/RecentJobsCard";
import UserPreferencesCard from "./settings/UserPreferencesCard";
import StatisticsCard from "./jobs/StatisticsCard";
import GeneralSettingsCard from "./settings/GeneralSettingsCard";
import MemeCard from "./meme/MemeCard";
import LinearLoadingBar from "../LinearLoadingBar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getDashboard,
  updateUserLocations,
  updateUserSkills,
} from "@/app/queries/dashboard";
import { useToast } from "../providers/ToastProvider";
import ChipsManagerCard from "../common/ChipsManagerCard";

export default function Dashboard() {
  const { isPending, isError, data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });
  const { show } = useToast();
  const queryClient = useQueryClient();
  const userSkillsMutation = useMutation({
    mutationFn: (skills: string[]) => updateUserSkills(skills),
    onSuccess: () => {
      show("Successfully updated skills!", "success");
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: () => {
      show("Unable to update skills!", "error");
    },
  });
  const userLocationsMutation = useMutation({
    mutationFn: (locations: string[]) => updateUserLocations(locations),
    onSuccess: () => {
      show("Successfully updated locations!", "success");
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: () => {
      show("Unable to update locations!", "error");
    },
  });

  useEffect(() => {
    if (isError) {
      show("Failed to load user dashboard!", "error");
    }
  }, [isError]);

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
              <Grid columns={1} container spacing={2} sx={{ height: "100%" }}>
                <Grid size={1}>
                  <GenericDashboardCard>
                    <ChipsManagerCard
                      data={data.profile.skills}
                      header={"Skills"}
                      mutation={userSkillsMutation}
                      splitter={","}
                    />
                  </GenericDashboardCard>
                </Grid>
                <Grid size={1}>
                  <GenericDashboardCard>
                    <ChipsManagerCard
                      data={data.settings.locations}
                      header={"Locations"}
                      mutation={userLocationsMutation}
                      splitter={"|"}
                    />
                  </GenericDashboardCard>
                </Grid>
              </Grid>
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
