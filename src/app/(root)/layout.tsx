import Navbar from "@/components/ui/elements/navbar";
import Sidebar from "@/components/ui/elements/sidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen flex justify-between bg-[#f3f6fb]">
      <Sidebar />
      <section className="relative  overflow-scroll max-h-screen flex-[0.83]">
        <Navbar />
        {children}
      </section>
    </main>
  );
};

export default layout;
