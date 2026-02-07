import { FileUpload } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

export default function UploadResumeButton() {
  // TODO: Implement functionality

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
        disabled={true}
        variant={"outlined"}
        sx={{
          textTransform: "none",
          color: "white",
          borderColor: "white",
          width: "50%",
        }}
        endIcon={<FileUpload />}
      >
        Upload resume
      </Button>
    </Stack>
  );
}
