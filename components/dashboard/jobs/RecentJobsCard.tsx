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

export default function RecentJobsCard() {
  const dummyData = [
    {
      title: "Software Development Intern",
      company_name: "Intel",
      experience_level: "Intern",
      url: "https://www.google.com/",
      salary: 55000,
      location: "Oregon, United States",
      source: "Adzuna",
    },
    {
      title: "New Graduate Software Developer",
      company_name: "Amazon",
      experience_level: "Junior",
      url: "https://www.google.com/",
      salary: 75000,
      location: "Washington, United States",
      source: "Adzuna",
    },
    {
      title: "Junior Software Developer",
      company_name: "Google",
      experience_level: "Junior",
      url: "https://www.google.com/",
      salary: 88000,
      location: "Washington, United States",
      source: "Adzuna",
    },
    {
      title: "Software Developer I",
      company_name: "Apple",
      experience_level: "Junior",
      url: "https://www.google.com/",
      salary: 100000,
      location: "California, United States",
      source: "Adzuna",
    },
    {
      title: "Software Developer",
      company_name: "Garmin",
      experience_level: "Intern",
      url: "https://www.google.com/",
      salary: 70000,
      location: "Oregon, United States",
      source: "Adzuna",
    },
  ];

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
          {dummyData.map((job) => (
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
