import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen">
      <div className="flex h-full overflow-hidden">
        <Sidebar />
        <main>
          <Topbar />
          {children}
        </main>
      </div>
    </div>
  );
}
