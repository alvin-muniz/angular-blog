export interface LoginRequestModel {
  username: string;
  password: string;
}

export interface LoginResponse {
  jwt: string;
  id: number;
}
