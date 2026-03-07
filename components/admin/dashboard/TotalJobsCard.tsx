import { getTotalJobs } from "@/app/queries/jobs";
import { CardContent, CircularProgress, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function TotalJobsCard() {
  const { isPending, data } = useQuery({
    queryKey: ["total-jobs"],
    queryFn: () => getTotalJobs(),
  });

  return (
    <React.Fragment>
      <CardContent>
        <Typography
          variant="h5"
          fontWeight={"bold"}
          color={deepPurple[100]}
          mt={1}
        >
          Total Jobs
        </Typography>
        {!isPending && data && (
          <Typography sx={{ color: "white" }}>
            {data.totalJobs} total jobs
          </Typography>
        )}
        {isPending && <CircularProgress size={15} sx={{ color: "white" }} />}
      </CardContent>
    </React.Fragment>
  );
}
