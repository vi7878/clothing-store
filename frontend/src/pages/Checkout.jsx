import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ShopContext } from '../context/ShopContext';
import { colorOptions } from '../data/colors';
import { Link } from 'react-router-dom';
import { getOptimizedUrl } from '../utils/cloudinary';

const Checkout = () => {
    const { user, token } = useContext(AuthContext);
    const { cartItems, products, getCartTotal, setCartItems } = useContext(ShopContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: user?.first_name || user?.firstName || '',
        lastName: user?.last_name || user?.lastName || '',
        email: user?.email || '',
        address: user?.default_address || '',
    });

    const subtotal = getCartTotal();
    const deliveryFee = subtotal >= 3000 || subtotal === 0 ? 0 : 100;
    const finalTotal = subtotal > 0 ? subtotal + deliveryFee : 0;

    const getTranslatedColorName = (hex) => {
        const translated = colorOptions.find(c => c.hex.toLowerCase() === hex.toLowerCase());
        return translated ? translated.label : hex;
    };

    const validate = () => {
        if (!form.firstName.trim() || !form.lastName.trim() || !form.address.trim()) {
            alert("Будь ласка, заповніть всі обов'язкові поля!");
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        const order_items = cartItems.map(item => {
            const product = products.find(p => p.id === item.id);
            const variant = product?.variants?.find(v => v.size === item.size && v.color_hex === item.color);
            const price = product.has_discount
                ? Math.round(product.base_price * (1 - product.discount_percent / 100))
                : product.base_price;

            return {
                product_variant: variant?.id,
                quantity: item.quantity,
                price_at_purchase: price
            };
        }).filter(item => item.product_variant);

        const orderData = {
            shipping_address: form.address,
            subtotal: subtotal,
            delivery_fee: deliveryFee,
            total_amount: finalTotal,
            payment_method: 'upon_receipt', // default for now
            order_items: order_items
        };

        try {
            const apiUrl = import.meta.env.VITE_API_URL || '/api';
            const response = await fetch(`${apiUrl.endsWith('/') ? apiUrl : apiUrl + '/' }orders/`, {
                // ... settings
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                setCartItems([]);
                navigate('/order-success');
            } else {
                alert('Помилка при оформленні замовлення');
            }
        } catch (error) {
            console.error(error);
            alert('Помилка мережі');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-32 grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
                <h2 className="text-2xl font-black mb-8 uppercase">Оформлення замовлення</h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Ім'я" className="border p-3 w-full" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} />
                        <input type="text" placeholder="Прізвище" className="border p-3 w-full" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} />
                    </div>
                    <input type="email" placeholder="Email" className="border p-3 w-full" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                    <textarea placeholder="Адреса доставки" className="border p-3 w-full h-32" value={form.address} onChange={e => setForm({...form, address: e.target.value})}></textarea>
                    <button onClick={handleSubmit} className="w-full bg-[#0B0035] text-white py-4 font-bold uppercase tracking-widest hover:bg-[#1a0a4a] transition-colors">
                        Підтвердити замовлення
                    </button>
                </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg h-fit">
                <h3 className="text-xl font-bold mb-6">Ваше замовлення</h3>
                <div className="space-y-4 mb-8">
                    {cartItems.map((item, i) => {
                        const product = products.find(p => p.id === item.id);
                        if (!product) return null;
                        const price = product.has_discount
                            ? Math.round(product.base_price * (1 - product.discount_percent / 100))
                            : product.base_price;

                        return (
                            <div key={i} className="flex justify-between items-center border-b pb-4">
                                <div className="flex items-center gap-4">
                                    <Link to={`/product/${product.id}`}>
                                        <img
                                          src={getOptimizedUrl(typeof product.images[0] === 'object' ? product.images[0].image : product.images[0], 'thumbnail')}
                                          className="w-16 h-20 object-cover"
                                          alt=""
                                        />
                                    </Link>
                                    <div>
                                        <Link to={`/product/${product.id}`}>
                                            <p className="font-bold hover:underline">{product.name}</p>
                                        </Link>
                                        <p className="text-sm text-gray-500 capitalize">{item.size} / {getTranslatedColorName(item.color)} x {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="font-bold">{price * item.quantity} грн</p>
                            </div>
                        )
                    })}
                </div>
                <div className="space-y-2 border-t pt-4 font-medium text-gray-600">
                    <div className="flex justify-between"><span>Сума</span><span>{subtotal} грн</span></div>
                    <div className="flex justify-between"><span>Доставка</span><span>{deliveryFee} грн</span></div>
                    <div className="flex justify-between text-black text-xl font-black mt-4 uppercase">
                        <span>Разом</span><span>{finalTotal} грн</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
