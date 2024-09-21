"use client";
import { createContext, useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";

const MainContext = createContext();

function GlobalContext({ children }) {
  const BASE_URL = process.env.NEXT_PUBLIC_URL_BASE_URL;
  const SIGNUP = process.env.NEXT_PUBLIC_URL_SIGNUP;
  const LOGIN = process.env.NEXT_PUBLIC_URL_LOGIN;

  return (
    <MainContext.Provider value={{ BASE_URL, SIGNUP, LOGIN }}>
      {children}
      <Toaster position="top-center" />
    </MainContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(MainContext);
};
export default GlobalContext;
