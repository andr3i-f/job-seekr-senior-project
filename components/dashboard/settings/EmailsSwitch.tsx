import { updateEmailOptions } from "@/app/queries/dashboard";
import { useToast } from "@/components/providers/ToastProvider";
import { Check, Restore } from "@mui/icons-material";
import { IconButton, Stack, Switch, Typography } from "@mui/material";
import { deepPurple, red } from "@mui/material/colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export default function EmailsSwitch({ wantEmails }: { wantEmails: boolean }) {
  const serverWantEmails = useMemo(() => wantEmails, [wantEmails]);
  const [draftWantEmails, setDraftWantEmails] =
    useState<boolean>(serverWantEmails);
  const [modified, setModified] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const { show } = useToast();

  const { isPending, mutate } = useMutation({
    mutationFn: (wantEmails: boolean) => updateEmailOptions(wantEmails),
    onSuccess: () => {
      show("Successfully updated email options!", "success");
      setModified(false);
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (error: any) => {
      if (
        error.request?.response &&
        error.request.responseText.includes("Experience level")
      ) {
        show(
          "Unable to update email options. Set 'Experience Level' first and try again!",
          "error",
        );
      } else {
        show(
          "Unable to update email options. Please try again later!",
          "error",
        );
      }
    },
  });

  const onReset = () => {
    setDraftWantEmails(serverWantEmails);
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
        Want emails?
      </Typography>
      <Stack direction={"row"} spacing={1} width={"100%"}>
        <Switch
          size={"small"}
          onChange={(e) => {
            setModified(e.target.checked !== serverWantEmails);
            setDraftWantEmails(e.target.checked);
          }}
          checked={draftWantEmails}
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
        />
        {modified && (
          <IconButton
            onClick={() => mutate(draftWantEmails)}
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
