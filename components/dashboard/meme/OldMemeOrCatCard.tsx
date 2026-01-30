import { CardContent, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React from "react";

export default function OldMemeOrCatCard() {
  return (
    <React.Fragment>
      <CardContent>
        <Typography
          variant="h5"
          fontWeight={"bold"}
          color={deepPurple[100]}
          mt={1}
        >
          old meme or cute cat :3
        </Typography>
      </CardContent>
    </React.Fragment>
  );
}
