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
import React, { useEffect, useState } from "react";
import { Job } from "@/constants/types";
import axios from "axios";
import LinearLoadingBar from "@/components/LinearLoadingBar";

function JobCard({ job }: { job: Job }) {
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
  const [loading, setLoading] = useState<boolean>(false);
  const [jobs, setJobs] = useState<Job[] | undefined>(undefined);

  useEffect(() => {
    setLoading(true);

    axios
      .get("/api/jobs", { params: { experienceLevel: experienceLevel } })
      .then((response) => {
        console.log(response.data);
        setJobs(response.data.jobs as Job[]);
      })
      .catch((_) => {
        console.error("Error trying to get recent jobs!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
          {!loading &&
            jobs &&
            jobs.map((job) => (
              <JobCard
                key={`${job.source}-${job.company_name}-${job.title}`}
                job={job}
              />
            ))}
          {loading && !jobs && <LinearLoadingBar text={"loading jobs. . ."} />}
        </Stack>
      </CardContent>
    </React.Fragment>
  );
}
