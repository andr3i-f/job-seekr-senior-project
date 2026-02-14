import { CardContent, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React from "react";
import UploadResumeButton from "./UploadResumeButton";
import EmailsSwitch from "./EmailsSwitch";

export default function GeneralSettingsCard({
  wantEmails,
}: {
  wantEmails: boolean;
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
          General Settings
        </Typography>
        <UploadResumeButton />
        <EmailsSwitch wantEmails={wantEmails} />
      </CardContent>
    </React.Fragment>
  );
}
