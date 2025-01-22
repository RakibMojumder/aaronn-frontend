"use client";

import { Toaster } from "@/components/ui/sonner";

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children} <Toaster richColors />
    </div>
  );
};

export default RootProvider;
