import { CardContent, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React from "react";

export default function StatisticsCard() {
  return (
    <React.Fragment>
      <CardContent>
        <Typography
          variant="h5"
          fontWeight={"bold"}
          color={deepPurple[100]}
          mt={1}
        >
          Statistics
        </Typography>
      </CardContent>
    </React.Fragment>
  );
}
