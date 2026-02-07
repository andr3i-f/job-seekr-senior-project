import { Stack, Switch, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

export default function EmailsSwitch() {
  // TODO: hook up to supabase to implement

  return (
    <Stack
      direction={"column"}
      sx={{
        height: "fit-content",
        width: "100%",
      }}
    >
      <Typography variant="h6" color={deepPurple[100]} mt={1}>
        Want emails?
      </Typography>
      <Switch
        size={"small"}
        disabled={true}
        sx={{
          "& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
            backgroundColor: "#fefefe",
          },
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#5af174",
            opacity: 0.77,
          },
          "& .MuiSwitch-track": {
            backgroundColor: "#eb7070",
            opacity: 0.77,
          },
        }}
      />
    </Stack>
  );
}
