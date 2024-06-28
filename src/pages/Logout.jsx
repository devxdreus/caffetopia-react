import { useEffect, useState } from "react";
import useLogout from "../hooks/useLogout";
import { useLocation, useNavigate } from "react-router-dom";

export default function Logout() {
  const logout = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const signOut = async () => {
    try {
      await logout();
      navigate("/login", { state: { from: { pathname: location.pathname } } });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isSigningOut) {
      setIsSigningOut(true);
      signOut();
    }
  }, [isSigningOut]); // melacak apakah proses logout sudah dimulai dan memastikan berjalan satu kali

  return <p>loading</p>;
}
