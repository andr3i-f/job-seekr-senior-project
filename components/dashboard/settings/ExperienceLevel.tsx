"use client";

import { updateExperienceLevel } from "@/app/queries/dashboard";
import { useToast } from "@/components/providers/ToastProvider";
import { Check, Restore } from "@mui/icons-material";
import { IconButton, MenuItem, Select, Stack, Typography } from "@mui/material";
import { deepPurple, red } from "@mui/material/colors";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function ExperienceLevel({
  experienceLevel,
}: {
  experienceLevel: string | null;
}) {
  const [userExperienceLevel, setUserExperienceLevel] = useState<string>(
    experienceLevel === null ? "" : experienceLevel,
  );
  const [previousUserExperienceLevel, setPreviousUserExperienceLevel] =
    useState<string>(userExperienceLevel);
  const [modified, setModified] = useState<boolean>(false);
  const { show } = useToast();

  const { isPending, mutate } = useMutation({
    mutationFn: (experienceLevel: string) =>
      updateExperienceLevel(experienceLevel),
    onSuccess: () => {
      show("Successfully updated experience level!", "success");
      setPreviousUserExperienceLevel(userExperienceLevel);
      setModified(false);
    },
    onError: () => {
      show("Unable to update experience level!", "error");
    },
  });

  const onReset = () => {
    setUserExperienceLevel(previousUserExperienceLevel);
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
          value={userExperienceLevel}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{ opacity: 0.5 }}>select a value...</em>;
            }
            return selected;
          }}
          onChange={(e) => {
            setModified(e.target.value !== previousUserExperienceLevel);
            setUserExperienceLevel(e.target.value);
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
            onClick={() => mutate(userExperienceLevel)}
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
