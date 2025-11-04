import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/shared/context/SidebarContext";
import { Header } from "@/widgets/Header/Header";
import Sidebar from "@/widgets/Sidebar/Sidebar";
import { ApplySidebarSpacing } from "@/shared/hooks/useApplySidebarSpacing";
import { AuthProvider } from "@/shared/context/AuthContext";
import ChatSidebar from "@/features/chat/ui/ChatSidebar";
import { ChatProvider } from "@/shared/context/ChatContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gamble.gg",
  description: "Gamble.gg - Your Ultimate Gaming Hub",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-[#0B1020] text-white`}>
        <AuthProvider>
          <ChatProvider>
            <SidebarProvider>
              <Header />
              <Sidebar />
              <ApplySidebarSpacing />
              <main
                id="app-main"
                className="
                  pt-16
                  md:transition-all md:duration-200
                  md:ml-[264px] data-[compact=true]:md:ml-[72px]
                  md:pl-[20px] data-[compact=true]:md:pl-[212px]
                  md:pr-[345px]
                  bg-[#0F1426]
                  flex-1 min-h-0 overflow-hidden
                "
              >
                <div
                  className="
                    h-full overflow-y-auto
                    px-5 
                    max-w-[2000px] mx-auto
                  "
                >
                  {children}
                </div>
              </main>
              <ChatSidebar />
            </SidebarProvider>
          </ChatProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
