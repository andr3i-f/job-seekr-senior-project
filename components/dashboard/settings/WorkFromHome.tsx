import { updateWorkFromHome } from "@/app/queries/dashboard";
import { useToast } from "@/components/providers/ToastProvider";
import { Check, Restore } from "@mui/icons-material";
import { IconButton, MenuItem, Select, Stack, Typography } from "@mui/material";
import { deepPurple, red } from "@mui/material/colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

export default function WorkFromHome({
  workFromHome,
}: {
  workFromHome: string | null;
}) {
  const serverWorkFromHome = useMemo(
    () => (workFromHome === null ? "" : workFromHome),
    [workFromHome],
  );
  const [draftWorkFromHome, setDraftWorkFromHome] =
    useState<string>(serverWorkFromHome);

  const [modified, setModified] = useState<boolean>(false);

  useEffect(() => {
    setDraftWorkFromHome(serverWorkFromHome);
    setModified(false);
  }, [serverWorkFromHome]);

  const queryClient = useQueryClient();
  const { show } = useToast();

  const { isPending, mutate } = useMutation({
    mutationFn: (workFromHome: string) => updateWorkFromHome(workFromHome),
    onSuccess: () => {
      show("Successfully updated work from home!", "success");
      setModified(false);
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: () => {
      show("Unable to update work from home!", "error");
    },
  });

  const onReset = () => {
    setDraftWorkFromHome(serverWorkFromHome);
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
      <Typography
        variant="body1"
        fontWeight={"bold"}
        color={deepPurple[100]}
        mt={1}
      >
        Work from home?
      </Typography>
      <Stack direction={"row"} spacing={1} width={"100%"}>
        <Select
          size="small"
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
          value={draftWorkFromHome}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{ opacity: 0.5 }}>select a value...</em>;
            }
            return selected;
          }}
          onChange={(e) => {
            setModified(e.target.value !== serverWorkFromHome);
            setDraftWorkFromHome(e.target.value);
          }}
        >
          <MenuItem disabled value="">
            <em>select a value...</em>
          </MenuItem>
          <MenuItem value={"No preference"}>No preference</MenuItem>
          <MenuItem value={"No"}>No</MenuItem>
          <MenuItem value={"Yes"}>Yes</MenuItem>
        </Select>
        {modified && (
          <IconButton
            onClick={() => mutate(draftWorkFromHome)}
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
