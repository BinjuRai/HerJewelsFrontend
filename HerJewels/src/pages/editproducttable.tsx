import React, { useState } from 'react';
import './css/adminpanel.css';

const UpdatePro: React.FC = () => {
  const [productId, setId] = useState(0);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

  const handleSearchClick = () => {
    const itemName = name;
    fetch(`http://localhost:8080/item/getByName/${itemName}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch item. Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setId(data.productId);
          setName(data.productName);
          setPrice(data.price);
          setCategory(data.category);
          setDescription(data.description);
          setImageUrl(data.imageUrl);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          // Optionally, handle 404 responses or other errors here
        });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'imageUrl') {
      setImageUrl(e.target.value);
    } else {
      setPrice(Number(e.target.value));
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);

  const handleUpdateClick = () => {
    const updatedData = {
      productId: productId,
      productName: name,
      price: price,
      category: category,
      description: description,
      imageUrl: imageUrl,
    };

    fetch(`http://localhost:8080/item/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to update item. Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Update successful:', data);
        })
        .catch(error => {
          console.error('Error updating data:', error);
        });
  };

  return (
      <div className="addupdel-bg">
        <div className="add-holder">
          <div className="form-group">
            <label>Name:</label>
            <div className="input-group">
              <input
                  className="form-control"
                  value={name}
                  onChange={handleNameChange}
              />
              <button className="btn btn-primary" onClick={handleSearchClick}>Search</button>
            </div>
          </div>

          <div className="form-group">
            <label>Price:</label>
            <input
                className="form-control"
                type="number"
                value={price}
                onChange={handlePriceChange}
            />
            <label>Category:</label>
            <select
                className="form-control"
                value={category}
                onChange={handleCategoryChange}
            >
              <option value="">Select a category</option>
              <option value="Chain">Chain</option>
              <option value="Necklace">Necklace</option>
              <option value="Ring">Ring</option>
              <option value="Ear Ring">Ear Ring</option>
              <option value="Gem">Gem</option>
              <option value="Grills">Grills</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
                className="form-control"
                value={description}
                onChange={handleDescriptionChange}
            />
          </div>

          <div className="form-group">
            <label>Image URL:</label>
            <input
                className="form-control"
                name="imageUrl"
                value={imageUrl}
                onChange={handlePriceChange}
            />
          </div>

          <button className="btn btn-success" onClick={handleUpdateClick}>Update</button>
        </div>
      </div>
  );
};

export default UpdatePro;
