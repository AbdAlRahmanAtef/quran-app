import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: any }) => {
  return (
    <div dir="rtl">
      <nav>
        <Navbar />
      </nav>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
