import { Add } from "@mui/icons-material";
import { IconButton, Stack, TextField } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useState } from "react";

export default function AddNewChip({
  onAddChip,
  disabled,
  type,
  removeFromString,
}: {
  onAddChip: (arg0: string) => void;
  disabled: boolean;
  type: string;
  removeFromString: string;
}) {
  const [label, setLabel] = useState("");

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
        size="small"
        onChange={(e) => setLabel(e.target.value)}
        value={label}
        placeholder={`enter new ${type}. . .`}
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
        size="small"
        sx={{ color: deepPurple[300] }}
        onClick={() => {
          onAddChip(label.replaceAll(removeFromString, ""));
          setLabel("");
        }}
        disabled={disabled}
      >
        <Add />
      </IconButton>
    </Stack>
  );
}
