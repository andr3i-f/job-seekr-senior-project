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

interface Job {
  title: string;
  source: string;
  company_name: string;
  experience_level: string;
  url: string;
  salary: number;
  location: string;
}
