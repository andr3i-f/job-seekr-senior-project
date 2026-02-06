import { MenuItem, Select, Stack, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

export default function WorkFromHome({
  workFromHome,
}: {
  workFromHome: string;
}) {
  return (
    <Stack
      direction={"column"}
      sx={{
        height: "fit-content",
        width: "100%",
      }}
    >
      <Typography variant="h6" color={deepPurple[100]} mt={1}>
        Work from home?
      </Typography>
      <Select
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
      >
        <MenuItem disabled value="">
          <em>select a value...</em>
        </MenuItem>
        <MenuItem value={"No preference"}>No preference</MenuItem>
        <MenuItem value={"Yes"}>Yes</MenuItem>
        <MenuItem value={"No"}>No</MenuItem>
      </Select>
    </Stack>
  );
}
