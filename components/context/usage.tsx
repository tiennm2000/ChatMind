"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { usageCount } from "@/actions/ai";
import { useUser } from "@clerk/nextjs";
import { checkUserSubcription } from "@/actions/stripe";

interface UsageContextType {
  count: number;
  fetchUsage: () => void;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  subscribed: boolean;
}
const UsageContext = createContext<UsageContextType | null>(null);

export const UsageProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  //state
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  //hook
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";

  useEffect(() => {
    if (!subscribed && count > Number(process.env.NEXT_PUBLIC_FREE_TIER_USAGE))
      setOpenModal(true);
    else setOpenModal(false);
  }, [count, subscribed]);

  useEffect(() => {
    if (email) {
      fetchUsage();
      fetchSubcription();
    }
  }, [email]);

  const fetchUsage = async () => {
    const res = await usageCount(email);
    setCount(res);
  };

  const fetchSubcription = async () => {
    const res = await checkUserSubcription();
    setSubscribed(res?.ok || false);
  };

  return (
    <UsageContext.Provider
      value={{ count, fetchUsage, openModal, setOpenModal, subscribed }}
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
