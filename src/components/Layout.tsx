
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { mockUsers } from "@/data/mockData";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // For demo purposes, we'll pretend the user is authenticated
  const isLoggedIn = false;
  const user = isLoggedIn ? mockUsers[0] : null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        isLoggedIn={isLoggedIn} 
        userName={user?.name || ""} 
        userAvatar={user?.avatar || ""} 
      />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
