import { useNavigate } from "react-router-dom";

export interface ExtraArgs {
  navigate: ReturnType<typeof useNavigate>;
}

export type FileDoc = {
  fileName: string;
  uri: string;
  mimeType: string;
};

export interface UserDetails {
  _id: string;
  ageRange: string;
  avatar: string;
  createdAt: string;
  email: string;
  firstName: string;
  gender: string;
  incomeRange: string;
  lastName: string;
  status: number;
  userName: string;
  workType: string;
}

export enum UserStatus {
  Active = 1,
  Suspended = -1,
}

export interface Users {
  id: string;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  gender: "Male" | "Female" | "Other";
  avatar: string;
  status: UserStatus;
  lastLogin: string;
  registeredDate: string;
}
