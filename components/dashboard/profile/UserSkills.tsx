"use client";

import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { deepPurple } from "@mui/material/colors";
import { Add, Input } from "@mui/icons-material";

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

function AddNewSkill({ onAddSkill }: { onAddSkill: (arg0: string) => void }) {
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
            color: "white", // input text color
          },
        }}
      />
      <IconButton
        sx={{ color: deepPurple[300] }}
        onClick={() => {
          onAddSkill(skill);
          setSkill("");
        }}
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
  const [modified, setModified] = useState<boolean>(false);

  const onDelete = (index: number) => {
    setUserSkills((prevSkills) =>
      prevSkills.filter((_, skillIndex) => skillIndex !== index),
    );
  };

  const onAddSkill = (skill: string) => {
    setUserSkills((prevSkills) => [...prevSkills, skill]);
  };

  // if modified, show button to approve or cancel changes
  // if not modified, don't show anything
  // this component should split the user settings by "," and map them

  return (
    <Stack
      direction={"column"}
      sx={{
        border: `2px solid ${deepPurple[300]}`,
        borderRadius: 5,
        height: "fit-content",
        width: "25%",
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
      {/* <Box  sx={{ border: "1px solid red", height: "100%" }}/> */}
      <Stack direction={"row"}>
        <AddNewSkill onAddSkill={onAddSkill} />
      </Stack>
    </Stack>
  );
}
