export interface User {
  id: string;
  creator?: User;
  creatorId?: string;
  username: string;
  password: string;
  isDeleted?: boolean;
  createdAt?: Date;
}
