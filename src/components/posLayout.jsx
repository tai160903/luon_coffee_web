import { Outlet } from "react-router-dom";
import POSSidebar from "./pos-sidebar";

const POSLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <POSSidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default POSLayout;
