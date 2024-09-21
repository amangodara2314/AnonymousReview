import "../globals.css";
import DashboardHeader from "@/components/DashboardHeader";

export default function RootLayout({ children }) {
  return (
    <main className="min-h-screen bg-black">
      <DashboardHeader />
      {children}
    </main>
  );
}
