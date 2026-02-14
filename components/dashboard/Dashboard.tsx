"use client";

import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import GenericDashboardCard from "./GenericDashboardCard";
import RecentJobsCard from "./jobs/RecentJobsCard";
import UserPreferencesCard from "./settings/UserPreferencesCard";
import GeneralSettingsCard from "./settings/GeneralSettingsCard";
import MemeCard from "./meme/MemeCard";
import LinearLoadingBar from "../LinearLoadingBar";
import { useMutation, useQuery } from "@tanstack/react-query";
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
  const userSkillsMutation = useMutation({
    mutationFn: (skills: string[]) => updateUserSkills(skills),
    onError: () => {
      show("Unable to update skills!", "error");
    },
  });
  const userLocationsMutation = useMutation({
    mutationFn: (locations: string[]) => updateUserLocations(locations),
    onError: () => {
      show("Unable to update locations!", "error");
    },
  });

  useEffect(() => {
    if (isError) {
      show("Failed to load user dashboard!", "error");
    }
  }, [isError]);

  console.log(data?.settings.want_emails);

  return (
    <React.Fragment>
      {isPending && <LinearLoadingBar text={"loading user info. . ."} />}
      {!isError && data && (
        <Grid container spacing={2} columns={16} height={"100%"}>
          <Grid container size={16} spacing={2} sx={{ height: "50%" }}>
            <Grid size={10}>
              <GenericDashboardCard>
                <RecentJobsCard
                  experienceLevel={data.profile.experience_level}
                />
              </GenericDashboardCard>
            </Grid>
            <Grid size={6}>
              <GenericDashboardCard>
                <MemeCard />
              </GenericDashboardCard>
            </Grid>
          </Grid>
          <Grid container size={16} spacing={2} sx={{ height: "50%" }}>
            <Grid size={4} sx={{ height: "100%" }}>
              <GenericDashboardCard>
                <ChipsManagerCard
                  data={data.profile.skills}
                  header={"Skills"}
                  mutation={userSkillsMutation}
                  splitter={","}
                />
              </GenericDashboardCard>
            </Grid>
            <Grid size={4}>
              <GenericDashboardCard>
                <ChipsManagerCard
                  data={data.settings.locations}
                  header={"Locations"}
                  mutation={userLocationsMutation}
                  splitter={"|"}
                />
              </GenericDashboardCard>
            </Grid>
            <Grid size={4}>
              <GenericDashboardCard>
                <UserPreferencesCard
                  experienceLevel={data.profile.experience_level}
                  workFromHome={data.settings.work_from_home}
                  startUps={data.settings.start_ups}
                />
              </GenericDashboardCard>
            </Grid>
            <Grid size={4}>
              <GenericDashboardCard>
                <GeneralSettingsCard wantEmails={data.settings.want_emails} />
              </GenericDashboardCard>
            </Grid>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}
