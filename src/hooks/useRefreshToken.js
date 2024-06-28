import useAuth from "./useAuth";
import { axiosPrivate } from "../api/axios";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axiosPrivate.get('/token');

      setAuth({
        username: localStorage.getItem('username'),
        roles: response.data.payload.roles,
        accessToken: response.data.payload.accessToken,
      });

      return response.data.payload;
    } catch (error) {
     console.error(error);
    }
  }
  return refresh;
}

export default useRefreshToken;
