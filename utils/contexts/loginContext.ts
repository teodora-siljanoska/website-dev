/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

export interface User {
  firstName: string;
  isLoggedin: boolean;
  token?: string;
}

interface ContextData {
  user: User;
  setUser: (user: User) => void;
}

const LoginContext = createContext<ContextData>({
  user: { firstName: '', isLoggedin: false },
  setUser: () => {},
});

export default LoginContext;
