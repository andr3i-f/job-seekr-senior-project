import AddNewChip from "@/components/common/AddNewChip";
import CustomChip from "@/components/common/CustomChip";
import { CardActions, CardContent, Grid, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React from "react";

export default function ChipsManagerCard({
  data,
  setData,
  header,
  splitter,
}: {
  data: string[];
  setData: React.Dispatch<React.SetStateAction<string[]>>;
  header: string;
  splitter: string;
}) {
  return (
    <React.Fragment>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant={"h5"} fontWeight={"bold"} color={deepPurple[100]}>
          {header}
        </Typography>
        <Grid container spacing={1}>
          {data.map((skill, index) => (
            <Grid size={{ xs: 4, xl: 2 }} key={`${skill}-${index}`}>
              <CustomChip
                label={skill}
                index={index}
                onDelete={(index) =>
                  setData((prev) => prev.filter((_, i) => index !== i))
                }
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <CardActions>
        <AddNewChip
          onAddChip={(label) => setData((prev) => [...prev, label])}
          disabled={false}
          type={header.toLowerCase()}
          removeFromString={splitter}
        />
      </CardActions>
    </React.Fragment>
  );
}
