import { parseResume } from "@/app/queries/resume";
import { useToast } from "@/components/providers/ToastProvider";
import { CloudUpload } from "@mui/icons-material";
import { Button, Stack, styled, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function UploadResumeButton() {
  const queryClient = useQueryClient();
  const { show } = useToast();

  const { isPending, mutate } = useMutation({
    mutationFn: (resume: any) => parseResume(resume),
    onSuccess: () => {
      show("Successfully parsed resume!", "success");
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: () => {
      show("Unable to parse resume. Please try again later!", "error");
    },
  });

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
        disabled={isPending}
        loadingIndicator={isPending}
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
          accept={"application/pdf"}
          onChange={(event) => {
            const files = event.target.files;

            if (!files || files.length == 0) return;

            if (files.length > 1) {
              show("Submit only one resume at a time", "error");
              return;
            }

            const file = files[0];

            if (file.size > 5 * 1024 * 1024) {
              show("Resume must be under 5MB", "error");
              return;
            }

            mutate(file);
          }}
        />
      </Button>
    </Stack>
  );
}
