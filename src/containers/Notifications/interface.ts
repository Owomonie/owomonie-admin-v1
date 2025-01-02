import { ReactNode } from "react";

export interface NotificationFormState {
  title: string;
  message: string;
  recipients: string;
  type: string;
}
export interface NotificationChoice {
  title: string;
  icon: ReactNode;
  link: string;
}
