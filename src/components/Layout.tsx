import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import FooterPlayer from "./FooterPlayer";
import Header from "./Header";

const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - stays the same */}
      <Sidebar />
      
      {/* Main content area with glassmorphism effects */}
      <div className="flex flex-col flex-grow pl-16 md:pl-64">
        <Header />
        <main className="flex-grow p-4 md:p-6 overflow-auto pb-24 mt-16">
          <div className="max-w-7xl mx-auto">
            <div className="bg-background/20 backdrop-blur-md rounded-lg border border-white/10 shadow-lg shadow-black/5 dark:shadow-white/5 p-6">
              <Outlet />
            </div>
          </div>
        </main>
        <div className="fixed bottom-0 left-0 right-0">
          <FooterPlayer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
