import { getDemoJobs } from "@/app/queries/jobs";
import { JobCard } from "@/components/dashboard/jobs/RecentJobsCard";
import LinearLoadingBar from "@/components/LinearLoadingBar";
import { OnboardingInputs } from "@/constants/types";
import { Box, Stack, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function LimitedJobs({
  shouldSearch,
  userInfo,
}: {
  shouldSearch: boolean;
  userInfo: OnboardingInputs;
}) {
  const { isFetching, isError, data } = useQuery({
    queryKey: ["demo-jobs"],
    queryFn: () => getDemoJobs(),
  });

  return (
    <React.Fragment>
      <Box
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Stack direction={"column"} alignItems={"start"} height={"100%"}>
          <Typography
            variant="h5"
            fontWeight={"bold"}
            color={deepPurple[100]}
            mt={1}
          >
            Limited Job Search
          </Typography>
          <Stack
            direction={"column"}
            spacing={2}
            sx={{
              overflow: "auto",
              whiteSpace: "nowrap",
              height: "80vh",
              borderRadius: 5,
              width: "100%",
              border: `2px solid ${deepPurple[300]}`,
              p: 2,
            }}
          >
            {isFetching && <LinearLoadingBar text={"loading jobs. . ."} />}
            {!isError &&
              data &&
              data.map((job) => (
                <JobCard
                  key={`${job.source}-${job.company_name}-${job.title}`}
                  job={job}
                />
              ))}
          </Stack>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
