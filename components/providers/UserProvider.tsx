"use client";

import React, { createContext, useContext } from "react";
import type { User } from "@supabase/supabase-js";

const UserContext = createContext<User | null>(null);

export const UserProvider = ({
  value,
  children,
}: {
  value: User | null;
  children: React.ReactNode;
}) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
