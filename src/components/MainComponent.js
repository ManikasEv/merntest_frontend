import React, { useState } from 'react';

function MainComponent() {
  // State to store input values for product update
  const [productId, setProductId] = useState('66ef1ce9f6cefcc60af64cd8');  // Default ID of the product to update
  const [name, setName] = useState('');            // Name of the product
  const [quantity, setQuantity] = useState('');    // Quantity of the product
  const [price, setPrice] = useState('');          // Price of the product
  const [img, setImg] = useState('');              // Image URL of the product (optional)
  const apiUrl = 'https://mern-backend-opal.vercel.app/api/products';
  // Function to handle the update request
  const handleUpdateProduct = async () => {
    const updatedProduct = {
      name,
      quantity: parseInt(quantity),  // Ensure quantity is a number
      price: parseFloat(price),      // Ensure price is a number
      img,
    };

    // Validate input
    if (!productId || !name || isNaN(quantity) || isNaN(price)) {
      alert('Please fill in all fields correctly.');
      return;
    }

    console.log(productId);
    try {
      const response = await fetch(`${apiUrl}/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Product updated successfully:', data);
        alert('Product updated successfully!');
      } else {
        const errorData = await response.json();
        console.error('Error updating product:', errorData.message);
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error making request:', error);
      alert('Failed to update product.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div>
          <label>Product ID</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}  // Update product ID
          />
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter new product name"
          />
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter product quantity"
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter product price"
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            placeholder="Enter image URL"
          />
        </div>
      </div>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={handleUpdateProduct}>Update Product</button>
      </div>
    </div>
  );
}

export default MainComponent;
