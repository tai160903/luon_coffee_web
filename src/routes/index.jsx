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
import Profile from "../pages/Profile";
import About from "../pages/About";
// import ManagerLayout from "../components/managerLayout";
// import Dashboard from "../pages/manager/Dashboard";
// import Product from "../pages/manager/Product";
// import Staff from "../pages/manager/Staff";
// import Inventory from "../pages/manager/Inventory";
// import MenuManagement from "../pages/manager/MenuManager";
import DashboardPOS from "../pages/pos/DashboardPOS";
import Orders from "../pages/pos/Orders";
import Reports from "../pages/pos/Reports";
import Sales from "../pages/pos/Sales";
import POSLayout from "../components/posLayout";
import SuccessPage from "../pages/Success";
import FailedPage from "../pages/Failed";
import OrderHistory from "../pages/OrdersHistory";

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
        element: <Cart />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
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
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/orders-history",
    element: <OrderHistory />,
  },
  {
    path: "/payment-success",
    element: <SuccessPage />,
  },
  {
    path: "/payment-failed",
    element: <FailedPage />,
  },
  // {
  //   path: "/manager",
  //   element: <ManagerLayout />,
  //   children: [
  //     {
  //       path: "",
  //       element: <Dashboard />,
  //     },
  //     {
  //       path: "products",
  //       element: <Product />,
  //     },
  //     {
  //       path: "inventory",
  //       element: <Inventory />,
  //     },
  //     {
  //       path: "menu-management",
  //       element: <MenuManagement />,
  //     },
  //     {
  //       path: "staffs",
  //       element: <Staff />,
  //     },
  //   ],
  // },
  {
    path: "/pos",
    element: <POSLayout />,
    children: [
      {
        path: "",
        element: <DashboardPOS />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      { path: "sales", element: <Sales /> },
    ],
  },

  {
    path: "*",
    element: <h1>404</h1>,
  },
]);

export default router;
