import React, {useEffect, useState} from 'react';
import './css/bootstrap.min.css';
import './css/font-awesome.min.css';
import './css/elegant-icons.css';
import './css/magnific-popup.css';
import './css/nice-select.css';
import './css/owl.carousel.min.css';
import './css/slicknav.min.css';
import './css/style.css';
import logo from './img/logo.png';
import banner1 from './img/banner/banner-1.jpg';
import banner2 from './img/banner/banner-2.jpg';
import banner3 from './img/banner/banner-3.jpg';

import {useNavigate} from "react-router-dom";

    interface Product {
        id: number;
        productName: string;
        price: number;
        category: string;
        imageUrl: string;
    }

    interface ProductCardProps {
        product: Product;
        onViewClick: (data: { productId: number; quantity: number }) => void;
    }

// @ts-ignore
    const ProductCard: React.FC<ProductCardProps> = ({ product, onViewClick }) => {

        const navigate = useNavigate();

        // @ts-ignore
        const handleBuyClick = async (product) => {
            try {
                console.log(product)
                // Navigate to the review page with the updated product list
                navigate(`/review/${product.productId}`);
            } catch (error) {
                console.error('Error handling buy click:', error);
            }
        };


        return (
            <div key={product.id} className="product-card">
                <img src={product.imageUrl} alt={product.productName} className="product-image" />
                <p className="product-name">{product.productName}</p>
                <p className="product-price">Price: Rs.{product.price}</p>
                <p className="product-category">Category: {product.category}</p>
                <button className="view-button" onClick={() => handleBuyClick(product)}>View</button>
            </div>
        );
    };

    const HomePage: React.FC = () => {

        const [products, setProducts] = useState<Product[]>([]);
        const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
        const navigate = useNavigate();



        useEffect(() => {
            fetch('http://localhost:8080/item/getAll')
                .then((response) => response.json())
                .then((data: Product[]) => {
                    console.log(data);  // Log the data to the console
                    setProducts(data);
                })
                .catch((error) => console.error('Error fetching data:', error));
        }, []);


        const handleViewClick = (data: { productId: number; quantity: number }) => {
            const selectedProduct = products.find((product) => product.id === data.productId);

            if (selectedProduct) {
                setSelectedProductId(data.productId);
                navigate(`/review/${data.productId}`);
            }
        };

        useEffect(() => {
            // Navigate to the review page when selectedProductId changes
            if (selectedProductId !== null) {
                navigate(`/review/${selectedProductId}`);
            }
        }, [selectedProductId]);




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
                                    <li className="active">
                                        <a href="/home">Home</a>
                                    </li>
                                    <li>
                                        <a href="/shop">Shop</a>
                                    </li>
                                    <li>
                                        <a href="/admin">Admin</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                    </div>

                </div>
            </header>

            <section className="hero-slider">
                <h1 className="textttt">Make yourself shine</h1>
                <br/>
                <a href="/shop" className="primary-btn">See More</a>
            </section>

            <section className="banner spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 offset-lg-4">
                            <div className="banner__item">
                                <div className="banner__item__pic">
                                    <img src={banner1} alt="" />
                                </div>
                                <div className="banner__item__text">
                                    <h2>Browse Rings</h2>
                                    <a href="/shopr">Shop now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="banner__item banner__item--middle">
                                <div className="banner__item__pic">
                                    <img src={banner2} alt="" />
                                </div>
                                <div className="banner__item__text">
                                    <h2>Browse Necklaces</h2>
                                    <a href="/shopn">Shop now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="banner__item banner__item--last">
                                <div className="banner__item__pic">
                                    <img src={banner3} width={500} height={320} alt="" />
                                </div>
                                <div className="banner__item__text">
                                    <h2>Browse EarRings</h2>
                                    <a href="/shope">Shop now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="product spad">

                <h3 style={{marginLeft:'650px'}}> <b>Latest Products</b> </h3>

                <div className="pro-dis" style={{display: 'flex', flexWrap: 'wrap', width: '100%', color: 'black'}}>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} onViewClick={handleViewClick} />
                    ))}
                </div>

            </section>





            <footer className="footer">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="footer__copyright__text">
                                <p>
                                    Copyright © 2024 All rights reserved
                                </p>
                            </div>
                        </div>
                    </div>

            </footer>


        </>




    );
};

export default HomePage;
