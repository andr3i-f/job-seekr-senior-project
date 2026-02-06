import { Stack, Switch, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

export default function StartUps({ startUps }: { startUps: boolean }) {
  return (
    <Stack
      direction={"column"}
      sx={{
        height: "fit-content",
        width: "100%",
      }}
    >
      <Typography variant="h6" color={deepPurple[100]} mt={1}>
        Start ups?
      </Typography>
      <Switch
        sx={{
          "& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
            backgroundColor: "#fefefe", // checked thumb
          },
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#5af174", // checked track
            opacity: 0.77,
          },
          "& .MuiSwitch-track": {
            backgroundColor: "#eb7070", // track color when unchecked
            opacity: 0.77, // remove default faded look
          },
        }}
      />
    </Stack>
  );
}
