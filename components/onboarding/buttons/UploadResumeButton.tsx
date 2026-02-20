import { parseOnboardingResume } from "@/app/queries/resume";
import { useToast } from "@/components/providers/ToastProvider";
import { CloudUpload } from "@mui/icons-material";
import { Button, styled } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export default function UploadResumeButton({
  setSkills,
  setExperienceLevel,
}: {
  setSkills: any;
  setExperienceLevel: any;
}) {
  const { show } = useToast();

  const { isPending, mutate, data } = useMutation({
    mutationFn: (resume: File) => parseOnboardingResume(resume),
    onSuccess: () => {
      show("Successfully parsed resume!", "success");
    },
  });

  useEffect(() => {
    if (!isPending && data) {
      setSkills(data.skills);
      setExperienceLevel(data.experienceLevel);
    }
  }, [data, isPending]);

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
    <Button
      disabled={isPending}
      size="small"
      color="primary"
      component="label"
      variant={"outlined"}
      startIcon={<CloudUpload />}
      sx={{
        textTransform: "none",
        color: "white",
        borderColor: "white",
        width: "100%",
      }}
    >
      Upload Resume
      <VisuallyHiddenInput
        type={"file"}
        accept={"application/pdf"}
        onChange={(event) => {
          const files = event.target.files;

          if (!files || files.length === 0) return;

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
          event.target.value = "";
        }}
      />
    </Button>
  );
}
