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

export interface NotificationType {
  _id: string;
  title: string;
  body: string;
  categories: string[];
  createdAt: string;
  recipient: string;
  sender: string;
  status: number;
  totalReceivers: number;
  type: number;
}
