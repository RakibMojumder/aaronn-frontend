import type { Metadata } from "next";
import { Rubik, Syne } from "next/font/google";
import "../globals.css";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import RootProvider from "@/provider/RootProvider";

const syne = Syne({
  variable: "----font-syne",
  subsets: ["latin"],
  display: "swap",
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard layout",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${rubik.variable} antialiased`}
    >
      <body suppressHydrationWarning>
        <RootProvider>
          <div className="flex flex-col md:flex-row h-svh overflow-hidden p-3 bg-neutral-800">
            <DashboardSidebar />
            <div className="flex-1 bg-neutral-900 rounded-3xl border border-neutral-700 p-4 md:p-8 h-full overflow-y-auto overflow-x-hidden">
              {children}
            </div>
          </div>
        </RootProvider>
      </body>
    </html>
  );
}
