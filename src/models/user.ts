export interface UserLogin {
  emailAddress: string;
  password: string;
}
export interface UserRegister {
  emailAddress: string;
  password: string;
  confirmPassword?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  terms?: boolean;
}
export interface User {
  id: string;
  role: string;
  firstName: string;
  lastName: string;
  sex: string;
  emailAddress: string;
  password: string;
  phoneNumber: string;
  deleteFlag: boolean;
  isEmailConfirmed: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface Data {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface UserResponse {
  data: Data;
}
