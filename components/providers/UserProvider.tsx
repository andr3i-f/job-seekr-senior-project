"use client";

import React, { createContext, useContext } from "react";
import { UserInfo } from "@/constants/types";

const UserContext = createContext<UserInfo | null>(null);

export const UserProvider = ({
  value,
  children,
}: {
  value: UserInfo | null;
  children: React.ReactNode;
}) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
