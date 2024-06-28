/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import axios from '../api/axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get('/categories');
          const data = response.data.payload;
          setCategories(data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      }

      const fetchProducts = async () => {
        try {
          const response = await axios.get("/products");
          const data = response.data.payload;
          setProducts(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      fetchCategories();
      fetchProducts();
    }, []);

    const addProductToCart = (product) => {
      setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.id === product.id);
        if (existingProduct) {
          return prevCart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          // return [...prevCart, { ...product, quantity: 1 }];
          return [...prevCart, {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
          }];
        }
      });
    };

    const removeProductFromCart = (productId) => {
      setCart((prevCart) => {
        return prevCart.reduce((acc, item) => {
          if (item.id === productId) {
            if (item.quantity > 1) {
              acc.push({ ...item, quantity: item.quantity - 1 });
            }
          } else {
            acc.push(item);
          }
          return acc;
        }, []);
      });
    };

    const clearCart = () => {
      setCart([]);
    };

    const addProductOnCart = (productId) => {
      setCart((prevCart) => {
        return prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      });
    };

    const deleteProduct = async (product) => {
      try {
        const response = await axios.delete(`/products/${product.id}`);
        if (!response.status) {
          return response.message;
        }
        setProducts(prevProducts => prevProducts.filter((i) => i.id !== product.id));
        return response;
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    }

    const deleteCategory = async (category) => {
      try {
        const response = await axios.delete(`/categories/${category.id}`);
        if (!response.status) {
          return response.message;
        }
        setCategories(prevCategories => prevCategories.filter(i => i.id !== category.id));
        setProducts(prevProducts => prevProducts.filter(i => i.category_id !== category.id));
        return response;
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    }

    return (
      <ProductContext.Provider value={{ cart, setCart, addProductToCart, clearCart, products, categories, addProductOnCart, removeProductFromCart, deleteProduct, deleteCategory }}>
        {children}
      </ProductContext.Provider>
    );
};
