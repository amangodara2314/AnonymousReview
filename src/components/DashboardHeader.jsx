"use client";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";

function DashboardHeader() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    Cookies.remove("Auth-Token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  useEffect(() => {
    const token = Cookies.get("Auth-Token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header className="py-2 px-8 flex justify-between items-center shadow bg-black">
      <h1 className="text-xl font-normal text-white">AnonymousInsight</h1>
      {isLoggedIn ? (
        <div className="flex items-center gap-4">
          <Link
            href={"/dashboard"}
            className="text-zinc-500 text-md hover:text-zinc-300 duration-200"
          >
            Dashboard
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="text-white hover:bg-zinc-900 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      ) : (
        <Link
          href={"/login"}
          className="text-zinc-500 text-sm hover:text-zinc-300 duration-200"
        >
          Login
        </Link>
      )}
    </header>
  );
}

export default DashboardHeader;
