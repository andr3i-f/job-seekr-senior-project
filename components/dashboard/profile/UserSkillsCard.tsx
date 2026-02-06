import { updateUserSkills } from "@/app/queries/dashboard";
import AddNewChip from "@/components/common/AddNewChip";
import CustomChip from "@/components/common/CustomChip";
import { useToast } from "@/components/providers/ToastProvider";
import { areListsEqual } from "@/constants/functions";
import { Check, Restore } from "@mui/icons-material";
import {
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { deepPurple, red } from "@mui/material/colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";

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
              <CustomChip label={skill} index={index} onDelete={onDelete} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <CardActions>
        <AddNewChip onAddChip={onAddSkill} disabled={isPending} />
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
