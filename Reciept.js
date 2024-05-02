import { useCart } from './CartContext';
function ReceiptPage() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const handleClear = () =>{
        cart.clearCart();
    }
    return (
        <div className="info">
            <h1>Receipt</h1>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        <h3>{item.name_stay}</h3>
                        <p>Price: ${item.price}</p>
                    </li>
                ))}
            </ul>
            
            <p>Total Paid: ${totalPrice}</p>
            Enjoy your stay!
            <div className='link-button'>
                <a href="/Home">Home</a>
            </div>
        </div>
    );
}

export default ReceiptPage;
