import { Stack, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

export default function GeneralSettings({
  settings,
}: {
  settings: UserSettings;
}) {
  return (
    <Stack
      direction={"column"}
      sx={{
        border: `2px solid ${deepPurple[300]}`,
        borderRadius: 5,
        height: "100%",
        width: "30%",
        pl: 2,
      }}
    >
      <Typography
        variant="h5"
        fontWeight={"bold"}
        color={deepPurple[100]}
        mt={1}
      >
        General Settings
      </Typography>
    </Stack>
  );
}
