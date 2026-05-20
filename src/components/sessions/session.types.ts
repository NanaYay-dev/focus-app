export type SessionStep = "select" | "setup" | "focus";

export type BoardingPassPreset = {
  id: string;
  from: string;
  to: string;
  durationMinutes: number;
  label: string;
};

export type FocusSessionDraft = {
  title: string;
  durationMinutes: number;
  from: string;
  to: string;
};