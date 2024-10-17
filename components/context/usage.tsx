"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { usageCount } from "@/actions/ai";
import { useUser } from "@clerk/nextjs";

interface UsageContextType {
  count: number;
  fetchUsage: () => void;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}
const UsageContext = createContext<UsageContextType | null>(null);

export const UsageProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  //state
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  //hook
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";

  useEffect(() => {
    if (count > 10000) setOpenModal(true);
  }, [count]);

  useEffect(() => {
    if (email) fetchUsage();
  }, [email]);

  const fetchUsage = async () => {
    const res = await usageCount(email);
    setCount(res);
  };

  return (
    <UsageContext.Provider
      value={{ count, fetchUsage, openModal, setOpenModal }}
    >
      {children}
    </UsageContext.Provider>
  );
};

export const useUsage = () => {
  const context = useContext(UsageContext);
  if (context === null) {
    throw new Error("useUsage must be used within UsageProvider");
  }
  return context;
};
