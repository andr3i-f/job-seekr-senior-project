import { parseResume } from "@/app/queries/resume";
import { useToast } from "@/components/providers/ToastProvider";
import { CloudUpload, FileUpload } from "@mui/icons-material";
import { Button, Stack, styled, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useMutation } from "@tanstack/react-query";

export default function UploadResumeButton() {
  // TODO: Implement functionality
  const { show } = useToast();

  const { isPending, mutate, data } = useMutation({
    mutationFn: (resume: any) => parseResume(resume),
    onSuccess: () => {
      show("Successfully updated experience level!", "success");
    },
    onError: () => {
      show("Unable to update experience level!", "error");
    },
  });

  console.log(data);

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
          onChange={(event) => mutate(event.target.files?.[0])}
        />
      </Button>
    </Stack>
  );
}
