import axios from "axios";
import './productaddtable.css';
import  { useState } from 'react';

export interface Product {
    productName: string;
    description: string;
    price: number;
    category: string;
    imageUrl?: string;
}

function ProductAddTable() {

    const [formValue, setFormValue] = useState<Product>({
        productName: '',
        description: '',
        price: 0,
        category: '',
        imageUrl: ''
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { productName, description, price, category, imageUrl } = formValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValue((prevFormValue) => ({ ...prevFormValue, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!productName || !description || !price || !category) {
            alert('Please enter all fields!');
            return;
        }

        setIsLoading(true);

        try {
            const res = await axios.post('http://localhost:8080/item/save', formValue);
            console.log('res', res);
            alert('Product saved successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while saving the product.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="form-container">
                <h2 className="add-product-header">Add Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="insideformofaddproduct">
                        <label className='productlabel'>Product Name:</label>
                        <input className='inputforproduct' name="productName" value={productName} onChange={handleChange} type="text" />
                        <label className='productlabel'>Description:</label>
                        <input className='inputforproduct' name="description" value={description} onChange={handleChange} />
                        <label className='productlabel'>Price:</label>
                        <input className='inputforproduct' name="price"  value={price} onChange={handleChange} type="number" />
                        <label className='productlabel'>Category:</label>
                        <select className='inputforproduct' name="category" value={category} onChange={handleChange}>
                            <option value="">Select a category</option>
                            <option value="Chain">Chain</option>
                            <option value="Necklace">Necklace</option>
                            <option value="Ring">Ring</option>
                            <option value="Ear Ring">Ear Ring</option>
                            <option value="Gem">Gem</option>
                            <option value="Grills">Grills</option>
                        </select>
                        <label className='productlabel'>Image URL:</label>
                        <input className='inputforproduct' name="imageUrl"  value={imageUrl} onChange={handleChange} type="text" />
                    </div>
                    <button type="submit" className='bttnaddproduct' >{isLoading ? <span>Loading....</span> : 'Add Product'}</button>
                </form>
            </div>
        </>
    );
}

export default ProductAddTable;
