import Swal from "sweetalert2";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";

export const UseDeleteProduct = () => {
  const { deleteProduct } = useContext(ProductContext);

  const handleDeleteProduct = (product) => {
    Swal.fire({
      title: `Anda yakin ingin menghapus menu ${product.name}?`,
      showCancelButton: true,
      cancelButtonText: 'Batal',
      confirmButtonText: 'Yakin',
    }).then( async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteProduct(product);
          if (!response.status) {
            Swal.fire({
              title: `${product.name} gagal dihapus`,
              text: response.message,
              icon: 'error',
            });
          }
          Swal.fire({
            title: `${product.name} berhasil dihapus`,
            text: response.data.message,
            icon: 'success',
          });
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: `${product.name} gagal dihapus`,
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
      title: `Anda yakin ingin menghapus category ${category.name}?`,
      text: 'Jika anda menghapus kategori ini maka seluruh produk dalam kategori ini akan ikut terhapus',
      showCancelButton: true,
      cancelButtonText: 'Batal',
      confirmButtonText: 'Yakin',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteCategory(category);
          if (!response.status) {
            Swal.fire({
              title: `${category.name} gagal dihapus`,
              text: response.message,
              icon: 'error',
            });
          }
          Swal.fire({
            title: `${category.name} berhasil dihapus`,
            text: response.data.message,
            icon: 'success',
          });
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: `${category.name} gagal dihapus`,
            text: error.response.data.message,
            icon: 'error',
          });
        }
      }
    });
  };

  return handleDeleteCategory;
};