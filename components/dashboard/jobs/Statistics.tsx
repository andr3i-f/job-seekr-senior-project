import { Stack, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

export default function Statistics() {
  return (
    <Stack
      direction={"column"}
      sx={{
        border: `2px solid ${deepPurple[300]}`,
        borderRadius: 5,
        height: "100%",
        width: "37%",
        pl: 2,
      }}
    >
      <Typography
        variant="h5"
        fontWeight={"bold"}
        color={deepPurple[100]}
        mt={1}
      >
        Statistics
      </Typography>
    </Stack>
  );
}
