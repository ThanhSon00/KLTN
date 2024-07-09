import { ResponseError } from 'utils/request';

/* --- STATE --- */
export interface State {}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isEmailVerified?: boolean;
  cover?: string;
  description?: string;
  age?: number;
  phoneNumber?: string;
  gender?: Gender;
  city?: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  answers: number;
  questions: number;
  points: number;
  isBanned: boolean;
}

export enum Gender {
  male = 'Male',
  female = 'Female',
}

interface AuthState {
  user?: User;
  errorMessage?: string;
  successMessage?: string;
}

export default AuthState;
