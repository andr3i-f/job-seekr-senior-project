"use client";

import {
  Chip,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { deepPurple, red } from "@mui/material/colors";
import { Add, Check, Restore } from "@mui/icons-material";
import axios from "axios";

function areListsEqual(list1: string[], list2: string[]): boolean {
  if (list1.length !== list2.length) {
    return false;
  }

  const set1 = new Set(list1);
  const set2 = new Set(list2);

  for (const item of set1) {
    if (!set2.has(item)) {
      return false;
    }
  }

  return true;
}

function SkillChip({
  skill,
  index,
  onDelete,
}: {
  skill: string;
  index: number;
  onDelete: (arg0: number) => void;
}) {
  return (
    <Chip
      onDelete={() => onDelete(index)}
      variant="outlined"
      label={skill}
      sx={{
        borderColor: deepPurple[600],
        bgcolor: deepPurple[600],
        color: "white",
      }}
    />
  );
}

function AddNewSkill({
  onAddSkill,
  disabled,
}: {
  onAddSkill: (arg0: string) => void;
  disabled: boolean;
}) {
  const [skill, setSkill] = useState("");

  return (
    <Stack
      direction={"row"}
      spacing={1}
      justifyContent={"end"}
      alignItems={"center"}
      border={`2px solid ${deepPurple[200]}`}
      borderRadius={3}
      width={"fit-content"}
    >
      <TextField
        onChange={(e) => setSkill(e.target.value)}
        value={skill}
        placeholder="enter new skill. . ."
        sx={{
          display: "flex",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "transparent",
            },
            "&.Mui-focused fieldset": {
              borderColor: "transparent",
            },
          },
          "& .MuiOutlinedInput-input": {
            color: "white",
          },
        }}
      />
      <IconButton
        sx={{ color: deepPurple[300] }}
        onClick={() => {
          onAddSkill(skill.replaceAll(",", ""));
          setSkill("");
        }}
        disabled={disabled}
      >
        <Add />
      </IconButton>
    </Stack>
  );
}

export default function UserSkills({ skills }: { skills: string | null }) {
  const [userSkills, setUserSkills] = useState<string[]>(
    skills === null ? [] : skills.split(","),
  );
  const [previousSkills, setPreviousUserSkills] =
    useState<string[]>(userSkills);
  const [modified, setModified] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onDelete = (index: number) => {
    setUserSkills((prevSkills) => {
      const newSkills = prevSkills.filter(
        (_, skillIndex) => skillIndex !== index,
      );
      setModified(!areListsEqual(newSkills, previousSkills));
      return newSkills;
    });
  };

  const onAddSkill = (skill: string) => {
    setUserSkills((prevSkills) => {
      const newSkills = [...prevSkills, skill];
      setModified(!areListsEqual(newSkills, previousSkills));
      return newSkills;
    });
  };

  const onUpdate = () => {
    setLoading(true);
    axios
      .put("/api/dashboard/profile/skills", {
        skills: userSkills.length > 0 ? userSkills.join(",") : null,
      })
      .then(() => {
        setPreviousUserSkills(userSkills);
        setModified(false);
      })
      .catch((_) => console.error("Error trying to update skills!"))
      .finally(() => {
        setLoading(false);
      });
  };

  const onReset = () => {
    setUserSkills(previousSkills);
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
      }}
    >
      <Typography
        variant="h5"
        fontWeight={"bold"}
        color={deepPurple[100]}
        mt={1}
      >
        Skills
      </Typography>
      <Grid container spacing={1} mb={2}>
        {userSkills.map((skill, index) => (
          <Grid size={{ xs: 3, xl: 2 }} key={`${skill}-${index}`}>
            <SkillChip skill={skill} index={index} onDelete={onDelete} />
          </Grid>
        ))}
      </Grid>
      <Stack direction={"row"} spacing={1}>
        <AddNewSkill onAddSkill={onAddSkill} disabled={loading} />
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
