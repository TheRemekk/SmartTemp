export interface IUser {
  login: string;
  role: string;
}

export class User implements IUser {
  constructor(
    public login: string,
    public role: string
  ) {}
}

export interface LoginData {
  login: string;
  password: string;
}

export interface RegisterData {
  login: string;
  password: string;
}

export interface AuthResponse {
  timestamp: string;
  message: string;
  code: string;
}

export interface LoggedInResponse extends Omit<AuthResponse, 'message'> {
  message: boolean;
}

