import {
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { UseMutationResult, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import CustomChip from "./CustomChip";
import AddNewChip from "./AddNewChip";
import { deepPurple, red } from "@mui/material/colors";
import { areListsEqual } from "@/constants/functions";
import { Check, Restore } from "@mui/icons-material";
import { useToast } from "../providers/ToastProvider";

export default function ChipsManagerCard({
  header,
  data,
  mutation,
  splitter,
}: {
  header: string;
  data: string | null;
  mutation: UseMutationResult<any, Error, string[], unknown>;
  splitter: string;
}) {
  const { show } = useToast();
  const queryClient = useQueryClient();
  const serverData = useMemo(() => (data ? data.split(splitter) : []), [data]);
  const [draftData, setDraftData] = useState<string[]>(serverData);
  const [modified, setModified] = useState<boolean>(false);

  useEffect(() => {
    setDraftData(serverData);
    setModified(false);
  }, [serverData]);

  const onDelete = (dataIndex: number) => {
    setDraftData((prev) => {
      const newData = prev.filter((_, index) => index !== dataIndex);
      setModified(!areListsEqual(newData, serverData));
      return newData;
    });
  };

  const onAddSkill = (skill: string) => {
    setDraftData((prev) => {
      const newData = [...prev, skill];
      setModified(!areListsEqual(newData, serverData));
      return newData;
    });
  };

  const onReset = () => {
    setDraftData(serverData);
    setModified(false);
  };

  return (
    <React.Fragment>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" fontWeight={"bold"} color={deepPurple[100]}>
          {header}
        </Typography>
        <Grid container spacing={1} mb={2}>
          {draftData.map((skill, index) => (
            <Grid size={{ xs: 3, xl: 2 }} key={`${skill}-${index}`}>
              <CustomChip label={skill} index={index} onDelete={onDelete} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <CardActions>
        <AddNewChip
          onAddChip={onAddSkill}
          disabled={mutation.isPending}
          type={header.toLowerCase()}
          removeFromString={splitter}
        />
        {modified && (
          <IconButton
            onClick={() => {
              mutation.mutate(draftData, {
                onSuccess: () => {
                  show(
                    `Successfully updated ${header.toLowerCase()}!`,
                    "success",
                  );
                  queryClient.invalidateQueries({ queryKey: ["dashboard"] });
                  setModified(false);
                },
              });
            }}
            disabled={mutation.isPending}
            sx={{ color: "green" }}
          >
            <Check />
          </IconButton>
        )}
        {modified && (
          <IconButton
            onClick={onReset}
            disabled={mutation.isPending}
            sx={{ color: red[300] }}
          >
            <Restore />
          </IconButton>
        )}
      </CardActions>
    </React.Fragment>
  );
}
