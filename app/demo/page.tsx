"use client";

import { NAVBAR_HEIGHT_IN_VH } from "@/constants/layout";
import { Box, Stack, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useQuery } from "@tanstack/react-query";
import { getDemoJobs } from "../queries/jobs";
import LinearLoadingBar from "@/components/LinearLoadingBar";
import { JobCard } from "@/components/dashboard/jobs/RecentJobsCard";

export default function DemoPage() {
  const { isFetching, isError, data } = useQuery({
    queryKey: ["demo-jobs"],
    queryFn: () => getDemoJobs(),
  });

  return (
    <Box
      sx={{
        width: "100vw",
        height: `${100 - NAVBAR_HEIGHT_IN_VH}vh`,
      }}
    >
      {isFetching && <LinearLoadingBar text={"loading jobs. . ."} />}
      {!isError && data && (
        <Stack direction={"column"} alignItems={"start"} height={"100%"} p={3}>
          <Typography
            variant="h5"
            fontWeight={"bold"}
            color={deepPurple[100]}
            mt={1}
          >
            Demonstration
          </Typography>
          <Stack
            direction={"column"}
            spacing={2}
            sx={{
              overflow: "auto",
              whiteSpace: "nowrap",
              height: {
                sm: "40vh",
                md: "45vh",
                xl: "50vh",
              },
              borderRadius: 5,
              width: "100%",
              border: `2px solid ${deepPurple[400]}`,
              p: 2,
            }}
          >
            {data.map((job) => (
              <JobCard
                key={`${job.source}-${job.company_name}-${job.title}`}
                job={job}
              />
            ))}
          </Stack>
        </Stack>
      )}
    </Box>
  );
}
