"use client";

import {
  Box,
  Button,
  CardContent,
  CircularProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import GenericDashboardCard from "../dashboard/GenericDashboardCard";
import ChipsManagerCard from "./inputs/ChipsManagerCard";
import GenericSwitch from "./inputs/GenericSwitch";
import GenericDropdown from "./inputs/GenericDropdown";
import { deepPurple } from "@mui/material/colors";
import LimitedJobs from "./jobs/LimitedJobs";
import { useMutation } from "@tanstack/react-query";
import { getDemoJobs } from "@/app/queries/jobs";
import { OnboardingInputs } from "@/constants/types";
import { useUser } from "../providers/UserProvider";
import { GoogleLogin } from "@react-oauth/google";
import { handleSignInWithGoogle } from "@/lib/auth/actions";
import {
  updateExperienceLevel,
  updateUserSkills,
  updateUserLocations,
  updateWorkFromHome,
  updateStartUps,
  updateEmailOptions,
} from "@/app/queries/dashboard";
import { useToast } from "../providers/ToastProvider";

export default function Onboarding() {
  const user = useUser();
  const { show } = useToast();

  const [initialUser] = useState<boolean>(Boolean(user));
  const [userJustSignedIn, setUserJustSignedIn] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState<string>("");
  const [workFromHome, setWorkFromHome] = useState<string>("");
  const [emails, setEmails] = useState<boolean>(false);
  const [startUps, setStartUps] = useState<boolean>(false);

  const disableButton = skills.length === 0 || experienceLevel === "";

  const userInfo = {
    skills: skills.join(","),
    experience_level: experienceLevel,
    work_from_home: workFromHome,
    locations: locations.join("|"),
    start_ups: startUps,
    want_emails: emails,
  };

  const { mutate, isPending, isError, data } = useMutation({
    mutationFn: () => getDemoJobs(userInfo as OnboardingInputs),
  });

  const { isPending: experienceLevelPending, mutate: experienceLevelMutate } =
    useMutation({
      mutationFn: (experienceLevel: string) =>
        updateExperienceLevel(experienceLevel),
    });

  const { isPending: skillsPending, mutate: skillsMutate } = useMutation({
    mutationFn: (skills: string[]) => updateUserSkills(skills),
  });

  const { isPending: locationsPending, mutate: locationsMutate } = useMutation({
    mutationFn: (locations: string[]) => updateUserLocations(locations),
  });

  const { isPending: workFromHomePending, mutate: workFromHomeMutate } =
    useMutation({
      mutationFn: (workFromHome: string) => updateWorkFromHome(workFromHome),
    });

  const { isPending: startUpsPending, mutate: startUpsMutate } = useMutation({
    mutationFn: (startUps: boolean) => updateStartUps(startUps),
  });

  const { isPending: emailsPending, mutate: emailsMutate } = useMutation({
    mutationFn: (wantEmails: boolean) => updateEmailOptions(wantEmails),
  });

  const isSavingProfile =
    experienceLevelPending ||
    skillsPending ||
    locationsPending ||
    workFromHomePending ||
    startUpsPending ||
    emailsPending;

  useEffect(() => {
    if (!initialUser && user) {
      setUserJustSignedIn(true);
      experienceLevelMutate(experienceLevel);
      if (skills.length > 0) skillsMutate(skills);
      if (locations.length > 0) locationsMutate(locations);
      if (workFromHome) workFromHomeMutate(workFromHome);
      startUpsMutate(startUps);
      emailsMutate(emails);
    }
  }, [user]);

  useEffect(() => {
    if (userJustSignedIn && !isSavingProfile) {
      show(
        "Successfully created account and saved your preferences!",
        "success",
      );
      setUserJustSignedIn(false);
    }
  }, [isSavingProfile, userJustSignedIn]);

  return (
    <React.Fragment>
      <Stack
        height={"100%"}
        width={"100%"}
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
          <Box height={"10%"} width={"15vw"}>
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
          <Box height={"15%"} width={"15vw"}>
            <GenericDashboardCard>
              <ChipsManagerCard
                data={skills}
                setData={setSkills}
                header={"Skills"}
                splitter={","}
              />
            </GenericDashboardCard>
          </Box>
          <Box height={"15%"} width={"15vw"}>
            <GenericDashboardCard>
              <ChipsManagerCard
                data={locations}
                setData={setLocations}
                header={"Locations"}
                splitter={"|"}
              />
            </GenericDashboardCard>
          </Box>
          <Box height={"10%"} width={"15vw"}>
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
          <Box height={"10%"} width={"15vw"}>
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
          <Box height={"10%"} width={"15vw"}>
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
          <Tooltip
            title={
              disableButton
                ? "Enter information for at least experience level and skills"
                : ""
            }
          >
            <Box>
              <Button
                disabled={disableButton}
                variant="contained"
                onClick={() => mutate()}
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
            </Box>
          </Tooltip>
        </Stack>
        <Stack spacing={3} height={"100%"} width={"100%"} direction={"column"}>
          <LimitedJobs isPending={isPending} isError={isError} data={data} />
          {!user &&
            !initialUser &&
            !isPending &&
            !isError &&
            data &&
            (isSavingProfile ? (
              <Stack
                direction={"column"}
                width={"fit-content"}
                alignItems={"center"}
                spacing={2}
              >
                <CircularProgress
                  size={40}
                  sx={{
                    color: "white",
                  }}
                />
                <Typography>saving your information...</Typography>
              </Stack>
            ) : (
              <Stack direction={"column"} width={"fit-content"}>
                <Typography>
                  consider signing in to save your information and receive daily
                  job alerts!
                </Typography>
                <div style={{ colorScheme: "light" }}>
                  <GoogleLogin
                    size="medium"
                    onSuccess={async (credentialResponse) => {
                      try {
                        await handleSignInWithGoogle(
                          credentialResponse.credential,
                        );
                      } catch (error) {}
                    }}
                  />
                </div>
              </Stack>
            ))}
        </Stack>
      </Stack>
    </React.Fragment>
  );
}
