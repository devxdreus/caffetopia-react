import Swal from "sweetalert2";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";

export const UseDeleteProduct = () => {
  const { deleteProduct } = useContext(ProductContext);

  const handleDeleteProduct = (product) => {
    Swal.fire({
      title: `Are you sure want to remove the menu ${product.name}?`,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes',
    }).then( async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteProduct(product);
          if (!response.status) {
            Swal.fire({
              title: `${product.name} Failed to delete`,
              text: response.message,
              icon: 'error',
            });
          }
          Swal.fire({
            title: `${product.name} Successfully deleteds`,
            text: response.data.message,
            icon: 'success',
          });
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: `${product.name} Failed to delete`,
            text: error.response.data.message,
            icon: 'error',
          });
        }
      }
    });
  }

  return handleDeleteProduct;
}

export const UseDeleteCategory = () => {
  const { deleteCategory } = useContext(ProductContext);

  const handleDeleteCategory = (category) => {
    Swal.fire({
      title: `Are you sure you want to delete category ${category.name}?`,
      text: 'If you delete this category, all products in this category will be deleted ',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteCategory(category);
          if (!response.status) {
            Swal.fire({
              title: `${category.name} Failed to delete`,
              text: response.message,
              icon: 'error',
            });
          }
          Swal.fire({
            title: `${category.name} Successfully deleteds`,
            text: response.data.message,
            icon: 'success',
          });
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: `${category.name} Failed to delete`,
            text: error.response.data.message,
            icon: 'error',
          });
        }
      }
    });
  };

  return handleDeleteCategory;
};