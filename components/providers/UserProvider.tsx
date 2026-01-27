"use client";

import React, { createContext, JSX, useContext, useState } from "react";
import { createClient } from "@/lib/supabase/server";

const UserContext = createContext(null);

interface user {
  name: string;
  email: string;
}

export const UserProvider = ({
  value,
  children,
}: {
  value: any;
  children: JSX.Element | JSX.Element[];
}) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
