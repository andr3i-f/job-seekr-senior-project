interface UserProfile {
  skills: string | null;
  experience_level: string | null;
}

interface UserSettings {
  work_from_home: string | null;
  locations: string | null;
  start_ups: boolean | null;
}

interface DashboardResponse {
  profile: UserProfile;
  settings: UserSettings;
}
