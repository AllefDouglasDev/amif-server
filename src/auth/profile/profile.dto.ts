export interface ProfileInputDto {
  id: string;
}

export interface ProfileOutputDto {
  id: string;
  username: string;
  createdAt: Date;
  creator?: {
    id: string;
    username: string;
  };
}
