// import { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Login from "./pages/Login";
// import Logout from "./pages/Logout";
// import Home from "./pages/Home";
// import Register from "./pages/Register";
// import Checkout from "./pages/Checkout";
// import About from "./pages/About";
// import Products from "./pages/Products";
// // Pastikan hanya ada satu deklarasi untuk AdminProduct
// import AddProduct from "./pages/Admin/AddProduct";
// import UpdateProduct from "./pages/Admin/UpdateProduct";
// import UpdateCategory from "./pages/Admin/UpdateCategory";
// import AddCategory from "./pages/Admin/AddCategory";
// import Orders from "./pages/Admin/Orders"; // Pastikan deklarasi Orders tidak tumpang tindih dengan AdminProduct
// import Report from "./pages/Admin/Report";
// import Layout from "./pages/Layout";
// import NotFound from "./pages/NotFound";
// // import RequireAuth from "./pages/RequireAuth";
// // import PresistLogin from './components/PresistLogin';

// // redux
// import { Provider } from "react-redux";
// import store from "./redux/store";
// import { ProductProvider } from "./context/ProductContext";

// const App = () => {
//   useEffect(() => {
//     AOS.init(
//       {
//         offset: 100,
//         duration: 700,
//         easing: "ease-in",
//         delay: 100,
//       },
//       []
//     );
//   }, []);

//   return (
//     <Provider store={store}>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Layout />}>
//             {/* <Route element={<PresistLogin />}> */}
//             {/* public routes */}
//             <Route path="login" element={<Login />} />
//             <Route path="register" element={<Register />} />
//             <Route path="about" element={<About />} />
//             <Route path="/" element={<Home />} />
//             <ProductProvider>
//               <Route path="products" element={<Products />} />
//               <Route path="checkout" element={<Checkout />} />
//             </ProductProvider>

//             {/* protect routes */}
//             {/* <Route element={<RequireAuth allowedRoles={['member', 'admin']} />} > */}
//             {/* <Route path="checkout" element={<Checkout />} /> */}
//             <Route path="orders" element={<Orders />} />
//             <Route path="logout" element={<Logout />} />
//             {/* </Route> */}

//             {/* <Route element={<RequireAuth allowedRoles={['admin']} />} > */}

//             <Route path="addproduct" element={<AddProduct />} />
//             <Route path="updateproduct/:id" element={<UpdateProduct />} />
//             <Route path="category/update/:id" element={<UpdateCategory />} />
//             <Route path="addcategory" element={<AddCategory />} />
//             <Route path="report" element={<Report />} />
//             {/* </Route> */}
//             <Route path="*" element={<NotFound />} />
//           </Route>
//           {/* </Route> */}
//         </Routes>
//       </Router>
//     </Provider>
//   );
// };

// export default App;

import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Home from './pages/Home';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Products from './pages/Products';
// Pastikan hanya ada satu deklarasi untuk AdminProduct
import AddProduct from './pages/Admin/AddProduct';
import UpdateProduct from './pages/Admin/UpdateProduct';
import UpdateCategory from './pages/Admin/UpdateCategory';
import AddCategory from './pages/Admin/AddCategory';
import Orders from './pages/Admin/Orders'; // Pastikan deklarasi Orders tidak tumpang tindih dengan AdminProduct
import Report from './pages/Admin/Report';
import ReportPrint from './components/print/ReportPrint';
import Layout from './pages/Layout';
import NotFound from './pages/NotFound';
// import RequireAuth from "./pages/RequireAuth";
// import PresistLogin from './components/PresistLogin';

// redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { ProductProvider } from './context/ProductContext';
import DetailOrder from './pages/Admin/DetailOrder';
//import OrderPrint from './components/print/OrderPrint'; 

const App = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 700,
      easing: 'ease-in',
      delay: 100,
    });
  }, []);

  return (
    <Provider store={store}>
      <ProductProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* <Route element={<PresistLogin />}> */}
              {/* public routes */}
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="about" element={<About />} />
              <Route path="/" element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="checkout" element={<Checkout />} />

              {/* protect routes */}
              {/* <Route element={<RequireAuth allowedRoles={['member', 'admin']} />} > */}
              {/* <Route path="checkout" element={<Checkout />} /> */}
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:id" element={<DetailOrder />} />
              <Route path="logout" element={<Logout />} />
              {/* </Route> */}

              {/* <Route element={<RequireAuth allowedRoles={['admin']} />} > */}
              <Route path="addproduct" element={<AddProduct />} />
              <Route path="updateproduct/:id" element={<UpdateProduct />} />
              <Route path="category/update/:id" element={<UpdateCategory />} />
              <Route path="addcategory" element={<AddCategory />} />
              <Route path="report" element={<Report />} />
              <Route path="/print-report" element={<ReportPrint />} />
              {/*<Route path="/print-order/:id" element={<OrderPrint />} /> */}
              {/* </Route> */}
              <Route path="*" element={<NotFound />} />
            </Route>
            {/* </Route> */}
          </Routes>
        </Router>
      </ProductProvider>
    </Provider>
  );
};

export default App;
