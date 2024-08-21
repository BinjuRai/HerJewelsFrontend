import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './review.css';
import logo from "./img/logo.png";


interface ItemDTO {
    itemId: number;
    productName: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
}

interface ReviewPageProps {}

const Review: React.FC<ReviewPageProps> = () => {
    const { productId } = useParams<{ productId?: string }>();
    const selectedProductId: number | null = productId ? parseInt(productId, 10) : null;

    const navigate = useNavigate();
    const [itemDTO, setItemDTO] = useState<ItemDTO | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [showBill, setShowBill] = useState(false);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                if (selectedProductId !== null && !isNaN(selectedProductId)) {
                    const response = await fetch(`http://localhost:8080/item/getById/${selectedProductId}`);
                    if (response.ok) {
                        const data: ItemDTO = await response.json();
                        setItemDTO(data);
                        console.log('Image URL:', data.imageUrl);
                    } else {
                        console.error('Error fetching product data:', response.status);
                    }
                }
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchProductData();
    }, [selectedProductId]);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value, 10) || 1;
        setQuantity(newQuantity);
    };

    const handleBuyClick = async () => {
        setShowBill(true);
    };

    const handleConfirmClick = async () => {
        try {
            const response = await fetch('http://localhost:8080/order/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productName: itemDTO?.productName,
                    price: itemDTO?.price,
                    quantity: quantity,
                    total: (itemDTO?.price || 0) * quantity,
                }),
            });

            if (response.ok) {
                alert('Purchase successful!');
                navigate('/home');
            } else {
                console.error('Error processing purchase:', response.status);
            }
        } catch (error) {
            console.error('Error processing purchase:', error);
        }
    };
    return (
        <>
        <header className="header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-3">
                        <div className="header__logo">
                            <a href="/home">
                                <img src={logo} width={70} height={50} alt="" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <nav className="header__menu mobile-menu">
                            <ul>
                                <li>
                                    <a href="/home">Home</a>
                                </li>
                                <li>
                                    <a href="/shop">Shop</a>
                                </li>
                                <li>
                                    <a href="/admin">Pages</a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                </div>

            </div>
        </header>
        <div className="page-body">
            <div className="image">
                <img src={itemDTO?.imageUrl} height={200} width={500} alt={itemDTO?.productName} className="img-prod" />
            </div>

            <div className="change-page">
                <div className="sliding-page">
                    {itemDTO && (
                        <div className="details">
                            <h3 className="product-name"><b>{itemDTO.productName}</b></h3>
                            <p className="product-price">Price: Rs. {itemDTO.price}</p>
                            <p className="product-description">
                                <span className="description-label"> Description: </span>
                                {itemDTO.description}
                            </p>
                            <label className="quantity-label">
                                Quantity:
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    min="1"
                                />
                            </label>

                            <button
                                className="buy-button"
                                onClick={handleBuyClick}
                            >
                                Buy Now
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {showBill && (
                <>
                    <div className="overlay"></div>
                    <div className="bill-popup">
                        <div className="bill-content">
                            <h3>Bill Summary</h3>
                            <p>Product: {itemDTO?.productName}</p>
                            <p>Quantity: {quantity}</p>
                            <p>Total: Rs. {(itemDTO?.price || 0) * quantity}</p>
                            <button onClick={handleConfirmClick}>Confirm</button>
                        </div>
                    </div>
                </>
            )}
        </div>
        </>
    );
};

export default Review;