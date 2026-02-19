import { MenuItem, Select, Stack, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

export default function GenericDropdown({
  selected,
  setSelected,
  header,
  options,
}: {
  selected: string;
  setSelected: any;
  header: string;
  options: string[];
}) {
  const componentOptions = options.map((val) => (
    <MenuItem value={val}>{val}</MenuItem>
  ));

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
          value={selected}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{ opacity: 0.5 }}>select a value...</em>;
            }
            return selected;
          }}
          onChange={(e) => {
            setSelected(e.target.value);
          }}
        >
          {[
            <MenuItem disabled value="">
              <em>select a value...</em>
            </MenuItem>,
            ...componentOptions,
          ]}
        </Select>
      </Stack>
    </Stack>
  );
}
