export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  email: string;
  name: {
    first: string;
    last: string;
  };
  isVerified: boolean;
  username: string;
}
export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
