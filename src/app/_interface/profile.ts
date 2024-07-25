import { Role } from "./role";
import { User } from "./user";

export interface Profile {
    user: User;
    roles?: Role[];
    access_token?: string;
    refresh_token?: string;
  }
  