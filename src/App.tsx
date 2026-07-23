import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/owner/Dashboard";
import BrowseBoutiques from "./pages/BrowseBoutiques";
import ProtectedRoute from "./components/ProtectedRoute";
import ShopDetails from "./pages/shopDetails.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import MyBoutique from "./pages/owner/MyBoutique.tsx";
import MyProducts from "./pages/owner/MyProducts.tsx";
import AddProduct from "./pages/owner/AddProduct.tsx";
import EditProduct from "./pages/owner/EditProduct.tsx";
import Categories from "./pages/Categories";
import CategoryProducts from "./pages/CategoryProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "boutiques", element: <BrowseBoutiques /> },
      { path: "boutiques/:id", element: <ShopDetails /> },
      {path: "products/:id", element: <ProductDetails />},
      {
        path: "dashboard",
        element: (
          <ProtectedRoute allowedRoles={["OWNER"]}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
  path: "dashboard/boutique",
  element: (
    <ProtectedRoute allowedRoles={["OWNER"]}>
      <MyBoutique />
    </ProtectedRoute>
  ),
},
{
  path: "dashboard/products",
  element: (
    <ProtectedRoute allowedRoles={["OWNER"]}>
      <MyProducts />
    </ProtectedRoute>
  ),
},
{
  path: "dashboard/products/new",
  element: (
    <ProtectedRoute allowedRoles={["OWNER"]}>
      <AddProduct />
    </ProtectedRoute>
  ),
},
{
  path: "dashboard/products/:id/edit",
  element: (
    <ProtectedRoute allowedRoles={["OWNER"]}>
      <EditProduct />
    </ProtectedRoute>
  ),
},
{ path: "categories", element: <Categories /> },
{ path: "categories/:category", element: <CategoryProducts /> }

    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;