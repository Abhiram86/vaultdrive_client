import { type MyFile } from "./components/Tabs/Drive";

export interface UserShareType {
  _id: string;
  userEmail: string;
  file: MyFile;
  grantedBy: string; // This is an ObjectId, but we'll treat it as a string
  createdAt: string;
  updatedAt: string;
}

export interface ShareLinkType {
  _id: string;
  file: MyFile;
  jwt: string;
  owner: string; // This is an ObjectId, but we'll treat it as a string
  isPublic: boolean;
  allowedEmails: string[];
  createdAt: string;
}
