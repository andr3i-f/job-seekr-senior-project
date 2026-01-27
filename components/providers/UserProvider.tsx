"use client";

import React, { createContext, JSX, useContext } from "react";
import { User } from "@supabase/supabase-js";

const UserContext = createContext<User | null>(null);

export const UserProvider = ({
  value,
  children,
}: {
  value: User | null;
  children: JSX.Element | JSX.Element[];
}) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
