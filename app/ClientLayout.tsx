"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const isLoggedIn =
      typeof window !== "undefined" &&
      localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn && window.location.pathname !== "/login") {
      router.replace("/login");
    }
  }, [router]);
  return <>{children}</>;
}
