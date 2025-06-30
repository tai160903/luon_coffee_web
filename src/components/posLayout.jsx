import { Outlet } from "react-router-dom";
import POSSidebar from "./pos-sidebar";

const POSLayout = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen overflow-hidden">
      <POSSidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default POSLayout;
