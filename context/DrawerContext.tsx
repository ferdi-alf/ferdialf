"use client";
import { createContext, useContext } from "react";

export const DrawerContext = createContext<{
  setDrawerOpen: (open: boolean) => void;
}>({
  setDrawerOpen: () => {},
});

export const useDrawerContext = () => useContext(DrawerContext);
