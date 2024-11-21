"use client";
import { createContext, useContext } from "react";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/api";

const UserContext = createContext<any>({});

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();
  const authUser = useQuery(
    api.query.users.getUserData,
    !user || !isLoaded
      ? "skip"
      : { email_address: user?.emailAddresses[0].emailAddress }
  );
  return (
    <UserContext.Provider value={{ authUser }}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};

export default UserContextProvider;
