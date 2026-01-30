import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import GenericDashboardCard from "./GenericDashboardCard";
import UserSkillsCard from "./profile/UserSkillsCard";
import RecentJobsCard from "./jobs/RecentJobsCard";
import UserPreferencesCard from "./settings/UserPreferencesCard";
import StatisticsCard from "./jobs/StatisticsCard";
import GeneralSettingsCard from "./settings/GeneralSettingsCard";
import OldMemeOrCatCard from "./meme/OldMemeOrCatCard";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography>hello</Typography>
    </CardContent>
  </React.Fragment>
);

export default function Dashboard() {
  return (
    <Grid container spacing={2} columns={16}>
      <Grid size={9}>
        <GenericDashboardCard>
          <RecentJobsCard />
        </GenericDashboardCard>
      </Grid>
      <Grid size={7}>
        <GenericDashboardCard>
          <StatisticsCard />
        </GenericDashboardCard>
      </Grid>
      <Grid size={4}>
        <GenericDashboardCard>
          <UserSkillsCard skills={null} />
        </GenericDashboardCard>
      </Grid>
      <Grid size={4}>
        <GenericDashboardCard>
          <UserPreferencesCard />
        </GenericDashboardCard>
      </Grid>
      <Grid size={4}>
        <GenericDashboardCard>
          <GeneralSettingsCard />
        </GenericDashboardCard>
      </Grid>
      <Grid size={4}>
        <GenericDashboardCard>
          <OldMemeOrCatCard />
        </GenericDashboardCard>
      </Grid>
      {/* <Grid size={8} border={"2px solid green"}>
                <Card variant="outlined">{card}</Card>
            </Grid>
                            <Grid size={8}>
                <Card variant={"elevation"}>{card}</Card>
            </Grid>
                            <Grid size={8}>
                <Card variant="outlined">{card}</Card>
            </Grid> */}
    </Grid>
  );
}
