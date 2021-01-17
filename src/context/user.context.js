import { createContext, useContext } from 'react';

export const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}