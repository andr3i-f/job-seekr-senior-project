import { CloudUpload, FileUpload } from "@mui/icons-material";
import { Button, Stack, styled, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

export default function UploadResumeButton() {
  // TODO: Implement functionality

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Stack
      direction={"column"}
      sx={{
        height: "fit-content",
        width: "100%",
      }}
    >
      <Typography variant="h6" color={deepPurple[100]} mt={1}>
        Resume
      </Typography>
      <Button
        size="small"
        color="primary"
        component="label"
        variant={"outlined"}
        startIcon={<CloudUpload />}
        sx={{
          textTransform: "none",
          color: "white",
          borderColor: "white",
          width: "50%",
        }}
      >
        Upload Resume
        <VisuallyHiddenInput
          type={"file"}
          onChange={(event) => console.log(event.target.files)}
        />
      </Button>
    </Stack>
  );
}
