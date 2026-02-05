"use client";

import { OpenInNew } from "@mui/icons-material";
import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React from "react";
import { Job } from "@/constants/types";
import LinearLoadingBar from "@/components/LinearLoadingBar";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "@/app/queries/jobs";

export function JobCard({ job }: { job: Job }) {
  return (
    <Card
      sx={{
        backgroundColor: "rgba(209, 196, 233, 0.27)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        borderRadius: 4,
        width: "98%",
        flexShrink: 0,
      }}
    >
      <CardContent>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          overflow={"hidden"}
          alignItems={"center"}
        >
          <Typography
            sx={{
              color: "white",
              maxWidth: "80%",
              overflow: "hidden",
            }}
          >
            {job.company_name} - {job.title} - {job.location}
          </Typography>
          <IconButton href={job.url} target="_blank" sx={{ color: "white" }}>
            <OpenInNew />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function RecentJobsCard({
  experienceLevel,
}: {
  experienceLevel: string | null;
}) {
  const { isPending, isFetching, isError, data } = useQuery({
    queryKey: ["dashboard-jobs", experienceLevel],
    queryFn: () => getJobs(experienceLevel as string),
    enabled: typeof experienceLevel === "string" && experienceLevel.length > 0,
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
          Recent Jobs Found
        </Typography>
        {isPending && !isFetching && (
          <Typography variant="h6" fontWeight={"bold"} color={deepPurple[100]}>
            Select an experience level first!
          </Typography>
        )}
        <Stack
          direction={"column"}
          spacing={2}
          sx={{
            overflow: "auto",
            whiteSpace: "nowrap",
            height: {
              sm: "25vh",
              md: "31vh",
              xl: "35vh",
            },
            borderRadius: 5,
          }}
        >
          {isFetching && <LinearLoadingBar text={"loading jobs. . ."} />}
          {!isError &&
            !isFetching &&
            data &&
            data.map((job) => (
              <JobCard
                key={`${job.source}-${job.company_name}-${job.title}`}
                job={job}
              />
            ))}
        </Stack>
      </CardContent>
    </React.Fragment>
  );
}
