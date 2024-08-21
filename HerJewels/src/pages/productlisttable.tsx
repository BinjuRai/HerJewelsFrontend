import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/productlisttable.css';

interface ItemDTO {
  itemId: number;
  productName: string;
  description: string;
  price: number;
  category: string;
}

const ProductListTable: React.FC = () => {
  const [products, setProducts] = useState<ItemDTO[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ItemDTO[]>('http://localhost:8080/item/getAll');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteTableProduct = async (productName: string) => {
    try {
      await axios.delete(`http://localhost:8080/item/deleteByName/${encodeURIComponent(productName)}`);
      setProducts(prevProducts => prevProducts.filter(product => product.productName !== productName));
      console.log('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
      <div className="product-list-container">
        <h2 className="product-list-heading">Product List</h2>
        <table className="product-table">
          <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {products.map(product => (
              <tr key={product.itemId}>
                <td>{product.productName}</td>
                <td>{product.description}</td>
                <td>Rs.{product.price.toFixed(2)}</td>
                <td>{product.category}</td>
                <td>
                  <button onClick={() => handleDeleteTableProduct(product.productName)} className="delete-button">
                    Delete
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default ProductListTable;
