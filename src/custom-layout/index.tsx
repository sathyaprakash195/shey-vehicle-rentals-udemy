"use client";
import { usePathname } from "next/navigation";
import React from "react";
import PrivateLayout from "./private";

function CustomLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/") {
    return children;
  }

  return <PrivateLayout>{children}</PrivateLayout>;
}

export default CustomLayout;
