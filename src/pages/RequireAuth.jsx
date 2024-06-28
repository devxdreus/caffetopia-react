/* eslint-disable react/prop-types */
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"
import { useEffect } from "react";
import Swal from "sweetalert2";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAllowed = auth.roles?.find((role) => allowedRoles.includes(role));
    if (!isAllowed) {
      if (auth.accessToken) {
        navigate(-1, { replace: true });
      } else {
        
        Swal.fire({
          icon: "error",
          title: "Perlu Akses Login",
          text: "Halaman yang anda minta memerlukan akses login, Silahkan login terlebih dahulu",
        }).then((result) => {
          if(result.isConfirmed) {
            navigate('/login', {state: {from: {pathname: location.pathname}}});
          }
        });
      }
    }
  }, [auth, allowedRoles, navigate])

  return auth.roles?.find(role => allowedRoles.includes(role))
      ? ( <Outlet /> )
      : <p>Sabar</p>
}

export default RequireAuth;