import Sidebar from "@/components/shared/Sidebar";
import TopBar from "@/components/shared/Topbar";
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
        <main className="flex-1 flex flex-col">
          <TopBar />
          <div className="flex-1 px-5 py-5">
            <div className="w-full h-full overflow-y-auto">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
