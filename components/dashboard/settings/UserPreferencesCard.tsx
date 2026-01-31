import { CardContent, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React from "react";
import ExperienceLevel from "./ExperienceLevel";

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
      </CardContent>
    </React.Fragment>
  );
}
