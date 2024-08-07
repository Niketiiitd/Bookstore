import axios from "axios";
import React, { useEffect, useState } from "react";

function Cart({customerId}) {
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const fetchCartItems = () => {
        axios.post('http://localhost:7777/getCartItems', {customerId})
            .then((response) => {
                console.log('Cart items fetched successfully');
                setCartItems(response.data);
                console.log('Cart items:', response.data);
            })
            .catch((error) => {
                console.log('Error fetching cart items', error);
            });
    }
    useEffect(() => {
        fetchCartItems();
    }, []);
    return (
        <div>
            <h1>Cart Page</h1>
            <h1>{customerId}</h1>
        </div>
    );
}
export default Cart;