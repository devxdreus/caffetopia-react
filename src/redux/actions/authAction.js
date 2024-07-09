// import axios from "axios";
import Swal from 'sweetalert2';
import { setToken, setUser } from '../reducers/authReducer';
import axios from '../../api/axios';

// Login
export const login = (user, navigate) => async (dispatch) => {
    try {
        const response = await axios.post('/login', user);
        localStorage.setItem('username', user.username);
        localStorage.setItem('role', response.data.payload.role);
        dispatch(setToken(response.data.payload.accessToken));
        dispatch(setUser(user));
        if (response.data.payload.role == 'admin') {
            navigate('/products', { replace: true });
        } else {
            navigate('/', { replace: true });
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
            title: error.response.data.message,
            text: 'Incorrect username or password',
            icon: 'error',
        });
    }
};

export const register = (user, navigate) => async () => {
    try {
        const response = await axios.post('/register', user); // Coba registrasi

        if (!response.status) {
            Swal.fire({
                title: 'Error!',
                text: 'Username or email already registered',
                icon: 'error',
                confirmButtonText: 'Ok',
            }); // Menampilkan alert jika registrasi gagal
        }

        Swal.fire({
            title: 'Success!',
            text: 'new user added successfully',
            icon: 'success',
            confirmButtonText: 'Ok',
        }); // Menampilkan alert jika registrasi berhasil
        navigate('/login'); // Setelah user berhasil registrasi, akan dipindahkan ke halaman login
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Username or email already registered',
            icon: 'error',
            confirmButtonText: 'Ok',
        }); // Menampilkan alert jika registrasi gagal
        console.error('login page', error);
    }
};

export const logoutUser = () => (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
};
