import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ShopContext } from '../context/ShopContext';

const Checkout = () => {
    const { user } = useContext(AuthContext);
    const { cartItems, products, getCartTotal, setCartItems } = useContext(ShopContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: '',
        address: '',
    });

    const [errors, setErrors] = useState({});

    const subtotal = getCartTotal();
    const deliveryFee = subtotal > 2000 ? 0 : 80;
    const finalTotal = subtotal + deliveryFee;

    const validate = () => {
        const newErrors = {};
        if (!form.firstName.trim()) newErrors.firstName = "Обов'язкове поле";
        if (!form.lastName.trim()) newErrors.lastName = "Обов'язкове поле";
        if (!form.phone.trim()) newErrors.phone = "Обов'язкове поле";
        if (!form.address.trim()) newErrors.address = "Обов'язкове поле";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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
                headers: { 'Content-Type': 'application/json' },
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
                    <input type="text" placeholder="Телефон" className="border p-3 w-full" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
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
                        return (
                            <div key={i} className="flex justify-between items-center border-b pb-4">
                                <div className="flex items-center gap-4">
                                    <img src={product.images[0]?.image || '/placeholder.jpg'} className="w-16 h-20 object-cover" alt="" />
                                    <div>
                                        <p className="font-bold">{product.name}</p>
                                        <p className="text-sm text-gray-500">{item.size} / {item.color} x {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="font-bold">{product.base_price * item.quantity} грн</p>
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
