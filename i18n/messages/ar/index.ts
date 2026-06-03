import navbar from "./navbar";

const messages = {
  navbar
} as const;

export default messages;
export type Messages = typeof messages;
