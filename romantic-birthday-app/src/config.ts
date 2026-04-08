export interface AppConfig {
  recipientName: string;
  relationshipStartDate: string; // ISO 8601 date string
  firstMeetingImage: string;
  musicSrc: string;
  firstMeetingText: string;
  favoriteMemoryText: string;
}

const config: AppConfig = {
  recipientName: "Maira",
  relationshipStartDate: "2026-03-17",
  firstMeetingImage: "",
  musicSrc: "",
  firstMeetingText: "It was the 17th of March 2026 — the day I met you, and everything changed. I remember thinking, this person is something special. And I was right.",
  favoriteMemoryText: "That day we spent together...",
};

export default config;
