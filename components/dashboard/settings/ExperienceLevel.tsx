"use client";

import { updateExperienceLevel } from "@/app/queries/dashboard";
import { useToast } from "@/components/providers/ToastProvider";
import { Check, Restore } from "@mui/icons-material";
import { IconButton, MenuItem, Select, Stack, Typography } from "@mui/material";
import { deepPurple, red } from "@mui/material/colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

export default function ExperienceLevel({
  experienceLevel,
}: {
  experienceLevel: string | null;
}) {
  const serverExperienceLevel = useMemo(
    () => (experienceLevel === null ? "" : experienceLevel),
    [experienceLevel],
  );
  const [draftExperienceLevel, setDraftExperienceLevel] = useState<string>(
    serverExperienceLevel,
  );
  const [modified, setModified] = useState<boolean>(false);

  useEffect(() => {
    setDraftExperienceLevel(serverExperienceLevel);
    setModified(false);
  }, [serverExperienceLevel]);

  const queryClient = useQueryClient();
  const { show } = useToast();

  const { isPending, mutate } = useMutation({
    mutationFn: (experienceLevel: string) =>
      updateExperienceLevel(experienceLevel),
    onSuccess: () => {
      show("Successfully updated experience level!", "success");
      setModified(false);
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: () => {
      show("Unable to update experience level!", "error");
    },
  });

  const onReset = () => {
    setDraftExperienceLevel(serverExperienceLevel);
    setModified(false);
  };

  return (
    <Stack
      direction={"column"}
      sx={{
        height: "fit-content",
        width: "100%",
      }}
    >
      <Typography variant="h6" color={deepPurple[100]} mt={1}>
        Experience Level
      </Typography>
      <Stack direction={"row"} spacing={1} width={"100%"} sx={{ mt: 1 }}>
        <Select
          disabled={isPending}
          sx={{
            width: "55%",
            color: "white",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: deepPurple[200],
              borderWidth: 2,
              borderRadius: 3,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: deepPurple[400],
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: deepPurple[600],
            },
            "& .MuiSelect-icon": {
              color: deepPurple[200],
            },
            "&.Mui-focused .MuiSelect-icon": {
              color: deepPurple[600],
            },
          }}
          displayEmpty
          value={draftExperienceLevel}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{ opacity: 0.5 }}>select a value...</em>;
            }
            return selected;
          }}
          onChange={(e) => {
            setModified(e.target.value !== serverExperienceLevel);
            setDraftExperienceLevel(e.target.value);
          }}
        >
          <MenuItem disabled value="">
            <em>select a value...</em>
          </MenuItem>
          <MenuItem value={"Intern"}>Intern</MenuItem>
          <MenuItem value={"Junior"}>Junior</MenuItem>
          <MenuItem value={"Mid-Level"}>Mid-Level</MenuItem>
          <MenuItem value={"Senior"}>Senior</MenuItem>
        </Select>
        {modified && (
          <IconButton
            onClick={() => mutate(draftExperienceLevel)}
            disabled={isPending}
            sx={{ color: "green" }}
          >
            <Check />
          </IconButton>
        )}
        {modified && (
          <IconButton
            onClick={onReset}
            disabled={isPending}
            sx={{ color: red[300] }}
          >
            <Restore />
          </IconButton>
        )}
      </Stack>
    </Stack>
  );
}
