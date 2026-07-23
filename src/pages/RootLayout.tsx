import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;