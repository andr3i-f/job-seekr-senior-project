import { Refresh } from "@mui/icons-material";
import {
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React from "react";

export default function OldMemeOrCatCard() {
  return (
    <React.Fragment>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h5"
          fontWeight={"bold"}
          color={deepPurple[100]}
          mt={1}
        >
          old meme or cute cat :3
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton sx={{ color: deepPurple[100] }}>
          <Refresh />
        </IconButton>
      </CardActions>
    </React.Fragment>
  );
}
