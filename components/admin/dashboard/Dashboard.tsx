import GenericDashboardCard from "@/components/dashboard/GenericDashboardCard";
import { Grid } from "@mui/material";
import React from "react";
import TotalUsersCard from "./TotalUsersCard";
import TotalJobsCard from "./TotalJobsCard";

export default function Dashboard() {
  return (
    <React.Fragment>
      <Grid container spacing={2} columns={8} height={"100%"}>
        <Grid size={4} height={"100%"}>
          <GenericDashboardCard>
            <TotalUsersCard />
          </GenericDashboardCard>
        </Grid>
        <Grid size={4}>
          <GenericDashboardCard>
            <TotalJobsCard />
          </GenericDashboardCard>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
