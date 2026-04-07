export interface AppConfig {
  recipientName: string;
  relationshipStartDate: string; // ISO 8601 date string
  firstMeetingImage: string;
  musicSrc: string;
  firstMeetingText: string;
  favoriteMemoryText: string;
}

const config: AppConfig = {
  recipientName: "My Love",
  relationshipStartDate: "2022-01-01",
  firstMeetingImage: "",
  musicSrc: "",
  firstMeetingText: "It was a moment I'll never forget...",
  favoriteMemoryText: "That day we spent together...",
};

export default config;
