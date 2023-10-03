import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';

const Home = () => {
  const [message, setMessage] = useState(''); 
  const [products, setProducts] = useState([]);
  const [btn_name, setBtnName] = useState('Logout');
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [productsPerPage] = useState(3); // Number of products to display per page
  const [selectedProducts, setSelectedProducts] = useState([]); // For selected products

  useEffect(() => {
 
    const token = localStorage.getItem('token');

    if (!token) {
      
      setMessage('unauthorized');
      setBtnName('Login');
    } else {
     
      axios.get('http://localhost:8080/api/home', {
        headers: {
          'Authorization': token
        }
      })
      .then(response => {
        if (response.data.status === 'ok') {
          setMessage(response.data.message);
          setProducts(response.data.products); 
          const savedSelectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
          setSelectedProducts(savedSelectedProducts);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  // Calculate the index range of products to display for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Function to change the current page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle checkbox changes and update selectedProducts
  const handleCheckboxChange = (productId) => {
    const updatedSelectedProducts = [...selectedProducts];
    if (selectedProducts.includes(productId)) {
      // Remove product from selectedProducts if already selected
      updatedSelectedProducts.splice(updatedSelectedProducts.indexOf(productId), 1);
    } else {
      // Add product to selectedProducts if not selected
      updatedSelectedProducts.push(productId);
    }
    setSelectedProducts(updatedSelectedProducts);
    // Save selectedProducts in local storage
    localStorage.setItem('selectedProducts', JSON.stringify(updatedSelectedProducts));
  };

  return (
    <div>
      <h1 className='heading'>All Products</h1>
      {message === 'unauthorized' ? (
        <div>{message}</div>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Select</th> 
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product._id}>
                  <td style={{ width: '90vw', height: 'auto', maxWidth: '150px', maxHeight: '150px' }}>
                    <img src={product.imgUrl} alt='product images' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product._id)}
                      onChange={() => handleCheckboxChange(product._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination controls */}
          <div className="pagination">
            {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
              <button key={i + 1} onClick={() => paginate(i + 1)}>
                {i + 1}
              </button>
            ))}
          </div>
          <div className='footer'>

          <button onClick={logout}>{btn_name}</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
