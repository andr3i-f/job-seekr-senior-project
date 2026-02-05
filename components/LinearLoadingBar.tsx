import { LinearProgress, Stack, Typography } from "@mui/material";

export default function LinearLoadingBar({
  text,
  width = "40%",
}: {
  text: string;
  width?: string;
}) {
  return (
    <Stack
      justifySelf={"center"}
      alignSelf={"center"}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100%"}
      width={"100%"}
    >
      <LinearProgress
        sx={{
          width: width,
          mb: "10px",
          backgroundColor: "rgba(255,255,255,0.3)", // track
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#fff",
          },
        }}
      />
      <Typography sx={{ opacity: 0.5 }} fontSize={"small"} color="white">
        {text}
      </Typography>
    </Stack>
  );
}
