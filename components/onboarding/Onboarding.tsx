import { OnboardingInputs } from "@/constants/types";
import { CardContent, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import GenericDashboardCard from "../dashboard/GenericDashboardCard";
import ChipsManagerCard from "./inputs/ChipsManagerCard";
import GenericSwitch from "./inputs/GenericSwitch";
import GenericDropdown from "./inputs/GenericDropdown";

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
        direction={"column"}
        alignItems={"center"}
      >
        <Typography>enter information manually</Typography>
        <Typography>OR</Typography>
        <Typography>parse your resume</Typography>
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
        <GenericDashboardCard>
          <ChipsManagerCard
            data={skills}
            setData={setSkills}
            header={"Skills"}
            splitter={","}
          />
        </GenericDashboardCard>
        <GenericDashboardCard>
          <ChipsManagerCard
            data={locations}
            setData={setLocations}
            header={"Locations"}
            splitter={"|"}
          />
        </GenericDashboardCard>
        <GenericDashboardCard>
          <CardContent>
            <GenericSwitch
              checked={startUps}
              setChecked={setStartUps}
              header={"Start ups?"}
            />
          </CardContent>
        </GenericDashboardCard>
        <GenericDashboardCard>
          <CardContent>
            <GenericSwitch
              checked={emails}
              setChecked={setEmails}
              header={"Want emails?"}
            />
          </CardContent>
        </GenericDashboardCard>
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
      </Stack>
    </React.Fragment>
  );
}
