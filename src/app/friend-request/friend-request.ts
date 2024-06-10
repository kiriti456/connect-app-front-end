import { User } from "../auth/user";
import { FriendRequestStatus } from "./friend-request-status";

export interface FriendRequest {
    id: number;
    sender: User;
    receiver: User;
    status: FriendRequestStatus;
  }