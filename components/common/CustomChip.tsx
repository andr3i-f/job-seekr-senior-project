import { Chip } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

export default function CustomChip({
  label,
  index,
  onDelete,
}: {
  label: string;
  index: number;
  onDelete: (arg0: number) => void;
}) {
  return (
    <Chip
      onDelete={() => onDelete(index)}
      variant="outlined"
      label={label}
      sx={{
        borderColor: deepPurple[600],
        bgcolor: deepPurple[600],
        color: "white",
      }}
    />
  );
}
