import { Stack, Switch, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { check } from "prettier";

export default function GenericSwitch({
  checked,
  setChecked,
  header,
}: {
  checked: boolean;
  setChecked: any;
  header: string;
}) {
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
        {header}
      </Typography>
      <Stack direction={"row"} spacing={1} width={"100%"}>
        <Switch
          size={"small"}
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
          checked={checked}
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
      </Stack>
    </Stack>
  );
}
