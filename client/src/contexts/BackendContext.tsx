import { createContext, ReactNode } from "react";
import axios, { AxiosInstance } from "axios";

// Simple version without Firebase auth
const baseURL = import.meta.env.VITE_BACKEND_HOSTNAME || 'http://localhost:3001';

interface BackendContextProps {
  backend: AxiosInstance;
}

export const BackendContext = createContext<BackendContextProps | null>(null);

export const BackendProvider = ({ children }: { children: ReactNode }) => {
  const backend = axios.create({
    baseURL,
    withCredentials: true,
  });


  return (
    <BackendContext.Provider value={{ backend }}>
      {children}
    </BackendContext.Provider>
  );
};