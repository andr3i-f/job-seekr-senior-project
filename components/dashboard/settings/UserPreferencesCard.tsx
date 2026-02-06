import { CardContent, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React from "react";
import ExperienceLevel from "./ExperienceLevel";
import StartUps from "./StartUps";
import WorkFromHome from "./WorkFromHome";

export default function UserPreferencesCard({
  experienceLevel,
}: {
  experienceLevel: string | null;
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
        <StartUps startUps={false} />
        <WorkFromHome workFromHome="No preference" />
      </CardContent>
    </React.Fragment>
  );
}
