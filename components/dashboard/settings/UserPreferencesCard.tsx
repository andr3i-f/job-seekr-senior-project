import { CardContent, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React from "react";
import ExperienceLevel from "./ExperienceLevel";
import WorkFromHome from "./WorkFromHome";
import StartUpsSwitch from "./StartUpsSwitch";

export default function UserPreferencesCard({
  experienceLevel,
  workFromHome,
  startUps,
}: {
  experienceLevel: string | null;
  workFromHome: string | null;
  startUps: boolean;
}) {
  return (
    <React.Fragment>
      <CardContent>
        <Typography
          variant="h5"
          fontWeight={"bold"}
          color={deepPurple[100]}
          mt={1}
        >
          Preferences
        </Typography>
        <ExperienceLevel experienceLevel={experienceLevel} />
        <StartUpsSwitch startUps={startUps} />
        <WorkFromHome workFromHome={workFromHome} />
      </CardContent>
    </React.Fragment>
  );
}
