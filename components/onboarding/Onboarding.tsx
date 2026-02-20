import { Box, Button, CardContent, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import GenericDashboardCard from "../dashboard/GenericDashboardCard";
import ChipsManagerCard from "./inputs/ChipsManagerCard";
import GenericSwitch from "./inputs/GenericSwitch";
import GenericDropdown from "./inputs/GenericDropdown";
import { deepPurple } from "@mui/material/colors";
import LimitedJobs from "./jobs/LimitedJobs";

// focus on the idea first that the user is not signed in and might make an account
// experience level
// preferences
// skills
// locations

// jobs button

// limited job view component

// sign in w/ google for more jobs / benefits!

// don't let google change pages when sign in, keep the same page so we can use the same data
// if I don't need React Context Provider, don't use it

export default function Onboarding() {
  const [skills, setSkills] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState<string>("");
  const [workFromHome, setWorkFromHome] = useState<string>("");
  const [emails, setEmails] = useState<boolean>(false);
  const [startUps, setStartUps] = useState<boolean>(false);

  return (
    <React.Fragment>
      <Stack
        height={"100%"}
        width={"100%"}
        border={"1px solid red"}
        direction={"row"}
        justifyItems={"end"}
        spacing={3}
      >
        <Stack
          direction={"column"}
          alignItems={"center"}
          alignSelf={"center"}
          spacing={3}
          height={"100%"}
          width={"fit-content"}
          border={`2px solid ${deepPurple[300]}`}
          borderRadius={4}
          p={2}
          boxShadow={3}
        >
          <Typography>enter information manually</Typography>
          <Typography>OR</Typography>
          <Typography>parse your resume</Typography>
          <Box height={"10%"} width={"100%"}>
            <GenericDashboardCard>
              <CardContent>
                <GenericDropdown
                  selected={experienceLevel}
                  setSelected={setExperienceLevel}
                  header={"Experience Level"}
                  options={["Intern", "Junior", "Mid-Level", "Senior"]}
                />
              </CardContent>
            </GenericDashboardCard>
          </Box>
          <Box height={"15%"}>
            <GenericDashboardCard>
              <ChipsManagerCard
                data={skills}
                setData={setSkills}
                header={"Skills"}
                splitter={","}
              />
            </GenericDashboardCard>
          </Box>
          <Box height={"15%"}>
            <GenericDashboardCard>
              <ChipsManagerCard
                data={locations}
                setData={setLocations}
                header={"Locations"}
                splitter={"|"}
              />
            </GenericDashboardCard>
          </Box>
          <Box height={"10%"} width={"100%"}>
            <GenericDashboardCard>
              <CardContent>
                <GenericSwitch
                  checked={startUps}
                  setChecked={setStartUps}
                  header={"Start ups?"}
                />
              </CardContent>
            </GenericDashboardCard>
          </Box>
          <Box height={"10%"} width={"100%"}>
            <GenericDashboardCard>
              <CardContent>
                <GenericSwitch
                  checked={emails}
                  setChecked={setEmails}
                  header={"Want emails?"}
                />
              </CardContent>
            </GenericDashboardCard>
          </Box>
          <Box height={"10%"} width={"100%"}>
            <GenericDashboardCard>
              <CardContent>
                <GenericDropdown
                  selected={workFromHome}
                  setSelected={setWorkFromHome}
                  header={"Work from home?"}
                  options={["No preference", "No", "Yes"]}
                />
              </CardContent>
            </GenericDashboardCard>
          </Box>
          <Button
            variant="contained"
            sx={{
              mt: "2vh",
              backgroundColor: "white",
              color: "#64558f",
              textTransform: "lowercase",
              borderRadius: "13px",
            }}
          >
            find jobs
          </Button>
        </Stack>
        <LimitedJobs
          shouldSearch={false}
          userInfo={{
            skills: skills.join(","),
            experience_level: experienceLevel,
            work_from_home: workFromHome,
            locations: locations.join("|"),
            start_ups: startUps,
            want_emails: emails,
          }}
        />
      </Stack>
    </React.Fragment>
  );
}
