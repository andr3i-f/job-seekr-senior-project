"use client";

import { Check, Restore } from "@mui/icons-material";
import { IconButton, MenuItem, Select, Stack, Typography } from "@mui/material";
import { deepPurple, red } from "@mui/material/colors";
import axios from "axios";
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
  const [loading, setLoading] = useState<boolean>(false);

  const onUpdate = () => {
    setLoading(true);
    axios
      .put("/api/dashboard/profile/experience-level", {
        experienceLevel: userExperienceLevel,
      })
      .then(() => {
        setPreviousUserExperienceLevel(userExperienceLevel);
        setModified(false);
      })
      .catch((_) => console.error("Error trying to update experienceLevel!"))
      .finally(() => {
        setLoading(false);
      });
  };

  const onReset = () => {
    setUserExperienceLevel(previousUserExperienceLevel);
    setModified(false);
  };

  return (
    <Stack
      direction={"column"}
      sx={{
        border: `2px solid ${deepPurple[300]}`,
        borderRadius: 5,
        height: "fit-content",
        width: "100%",
        px: 3,
        pb: 2,
        ml: 3,
        mt: 3,
      }}
    >
      <Typography
        variant="h5"
        fontWeight={"bold"}
        color={deepPurple[100]}
        mt={1}
      >
        Experience Level
      </Typography>
      <Stack direction={"row"} spacing={1} width={"100%"} sx={{ mt: 1 }}>
        <Select
          disabled={loading}
          sx={{
            width: "100%",
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
            if (e.target.value !== userExperienceLevel) {
              setModified(true);
            } else {
              setModified(false);
            }
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
            onClick={onUpdate}
            disabled={loading}
            loadingIndicator={loading}
            sx={{ color: "green" }}
          >
            <Check />
          </IconButton>
        )}
        {modified && (
          <IconButton
            onClick={onReset}
            disabled={loading}
            sx={{ color: red[300] }}
          >
            <Restore />
          </IconButton>
        )}
      </Stack>
    </Stack>
  );
}
