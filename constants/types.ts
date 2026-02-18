import { AlertColor } from "@mui/material";

export interface UserProfile {
  skills: string | null;
  experience_level: string | null;
}

export interface UserSettings {
  work_from_home: string | null;
  locations: string | null;
  start_ups: boolean;
  want_emails: boolean;
}

export interface DashboardResponse {
  profile: UserProfile;
  settings: UserSettings;
}

export interface Job {
  title: string;
  source: string;
  company_name: string;
  experience_level: string;
  url: string;
  salary: number;
  location: string;
}

export interface ToastProviderType {
  open: boolean;
  message: string;
  severity: AlertColor;
}

export interface OnboardingInputs extends UserProfile, UserSettings { }
