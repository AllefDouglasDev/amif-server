export interface User {
  id: string;
  creatorId?: string;
  username: string;
  password: string;
  isDeleted?: boolean;
  createdAt?: Date;
  creator?: { id: string; username: string };
}
