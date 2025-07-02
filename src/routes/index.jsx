import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/mainLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Menu from "../pages/Menu";
import Detail from "../pages/Detail";
import Cart from "../pages/Cart";
import Payment from "../pages/Payment";
import Contact from "../pages/Contact";
import Profile from "../pages/profile/index";
import About from "../pages/About";
import ManagerLayout from "../components/managerLayout";
import Dashboard from "../pages/manager/Dashboard";
import Product from "../pages/manager/Product";
import Staff from "../pages/manager/Staff";
import Inventory from "../pages/manager/Inventory";
import MenuManagement from "../pages/manager/MenuManager";
import Orders from "../pages/pos/Orders";
import Sales from "../pages/pos/Sales";
import POSLayout from "../components/posLayout";
import SuccessPage from "../pages/Success";
import FailedPage from "../pages/Failed";
import OrderHistory from "../pages/profile/OrdersHistory";
import NotFound from "../pages/NotFound";
import ProfileLayout from "../components/profileLayout";
import ProtectedRoute from "../utils/protectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "details/:id",
        element: <Detail />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute token={localStorage.getItem("token")}>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute token={localStorage.getItem("token")}>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "orders-history",
        element: (
          <ProtectedRoute token={localStorage.getItem("token")}>
            <OrderHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute token={localStorage.getItem("token")}>
            <ProfileLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <Profile />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/payment-success",
    element: (
      <ProtectedRoute token={localStorage.getItem("token")}>
        <SuccessPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/payment-cancel",
    element: (
      <ProtectedRoute token={localStorage.getItem("token")}>
        <FailedPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/manager",
    element: (
      <ProtectedRoute
        token={localStorage.getItem("token")}
        requiredRole="ADMIN"
      >
        <ManagerLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Product />,
      },
      {
        path: "inventory",
        element: <Inventory />,
      },
      {
        path: "menu-management",
        element: <MenuManagement />,
      },
      {
        path: "staffs",
        element: <Staff />,
      },
    ],
  },
  {
    path: "/pos",
    element: (
      <ProtectedRoute
        token={localStorage.getItem("token")}
        requiredRole={["STAFF", "ADMIN"]}
      >
        <POSLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Sales />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
