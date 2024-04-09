import { ResponseError } from 'utils/request';

/* --- STATE --- */
export interface State {}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isEmailVerified?: boolean;
}

interface AuthState {
  user?: User;
  errorMessage?: string;
  successMessage?: string;
}

export default AuthState;
