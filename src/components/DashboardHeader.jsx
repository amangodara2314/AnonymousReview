"use client";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

function DashboardHeader() {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("Auth-Token");
    router.push("/login");
  };
  return (
    <header className="py-2 px-8 flex justify-between items-center shadow">
      <h1 className="text-xl font-semibold">AnonymousInsight</h1>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleLogout}
        className="text-white hover:bg-zinc-900 hover:text-white"
      >
        <LogOut className="h-5 w-5" />
      </Button>
    </header>
  );
}

export default DashboardHeader;
