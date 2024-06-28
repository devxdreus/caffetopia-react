import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

export default function Layout() {
  const location = useLocation();

  return (
    <main className="App">
      {location.pathname === '/login' || location.pathname === '/register'
      ? <></>
      : <Navbar />
      }
      <Outlet />
    </main>
  )
}
