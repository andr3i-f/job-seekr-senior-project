import { updateUserSkills } from "@/app/queries/dashboard";
import { useToast } from "@/components/providers/ToastProvider";
import { Add, Check, Restore } from "@mui/icons-material";
import {
  CardActions,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { deepPurple, red } from "@mui/material/colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";

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

export default function UserSkillsCard({ skills }: { skills: string | null }) {
  const serverSkills = useMemo(
    () => (skills ? skills.split(",") : []),
    [skills],
  );
  const [draftSkills, setDraftSkills] = useState<string[]>(serverSkills);
  const [modified, setModified] = useState<boolean>(false);

  useEffect(() => {
    setDraftSkills(serverSkills);
    setModified(false);
  }, [serverSkills]);

  const onDelete = (index: number) => {
    setDraftSkills((prevSkills) => {
      const newSkills = prevSkills.filter(
        (_, skillIndex) => skillIndex !== index,
      );
      setModified(!areListsEqual(newSkills, serverSkills));
      return newSkills;
    });
  };

  const onAddSkill = (skill: string) => {
    setDraftSkills((prevSkills) => {
      const newSkills = [...prevSkills, skill];
      setModified(!areListsEqual(newSkills, serverSkills));
      return newSkills;
    });
  };

  const onReset = () => {
    setDraftSkills(serverSkills);
    setModified(false);
  };

  const queryClient = useQueryClient();
  const { show } = useToast();
  const { isPending, mutate } = useMutation({
    mutationFn: (skills: string[]) => updateUserSkills(skills),
    onSuccess: () => {
      show("Successfully updated skills!", "success");
      setModified(false);
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: () => {
      show("Unable to update skills!", "error");
    },
  });

  return (
    <React.Fragment>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" fontWeight={"bold"} color={deepPurple[100]}>
          Skills
        </Typography>
        <Grid container spacing={1} mb={2}>
          {draftSkills.map((skill, index) => (
            <Grid size={{ xs: 3, xl: 2 }} key={`${skill}-${index}`}>
              <SkillChip skill={skill} index={index} onDelete={onDelete} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <CardActions>
        <AddNewSkill onAddSkill={onAddSkill} disabled={isPending} />
        {modified && (
          <IconButton
            onClick={() => mutate(draftSkills)}
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
      </CardActions>
    </React.Fragment>
  );
}
