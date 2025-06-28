import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

export default function MainLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
