import { updateStartUps } from "@/app/queries/dashboard";
import { useToast } from "@/components/providers/ToastProvider";
import { Check, Restore } from "@mui/icons-material";
import { IconButton, Stack, Switch, Typography } from "@mui/material";
import { deepPurple, red } from "@mui/material/colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

export default function StartUpsSwitch({ startUps }: { startUps: boolean }) {
  const serverStartUps = useMemo(() => startUps, [startUps]);
  const [draftStartUps, setDraftStartUps] = useState<boolean>(serverStartUps);
  const [modified, setModified] = useState<boolean>(false);

  useEffect(() => {
    setDraftStartUps(serverStartUps);
    setModified(false);
  }, [serverStartUps]);

  const queryClient = useQueryClient();
  const { show } = useToast();
  const { isPending, mutate } = useMutation({
    mutationFn: (startUps: boolean) => updateStartUps(startUps),
    onSuccess: () => {
      show("Successfully updated start ups!", "success");
      setModified(false);
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: () => {
      show("Unable to update start ups!", "error");
    },
  });

  const onReset = () => {
    setDraftStartUps(serverStartUps);
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
        Start ups?
      </Typography>
      <Stack direction={"row"} spacing={1} width={"100%"}>
        <Switch
          size="small"
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
              backgroundColor: "#fefefe",
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#5af174",
              opacity: 0.77,
            },
            "& .MuiSwitch-track": {
              backgroundColor: "#eb7070",
              opacity: 0.77,
            },
          }}
          checked={draftStartUps}
          onChange={(e) => {
            setModified(e.target.checked !== serverStartUps);
            setDraftStartUps(e.target.checked);
          }}
        />
        {modified && (
          <IconButton
            onClick={() => mutate(draftStartUps)}
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
