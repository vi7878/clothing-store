import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ShopContext } from '../context/ShopContext';

const Checkout = () => {
    const { user } = useContext(AuthContext);
    const { cartItems, products, currency, getCartTotal, setCartItems } = useContext(ShopContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        address: user?.address || '',
    });

    const [errors, setErrors] = useState({});

    const subtotal = getCartTotal();
    const deliveryFee = subtotal >= 3000 || subtotal === 0 ? 0 : 100;
    const finalTotal = subtotal + deliveryFee;

    const validate = () => {
        const newErrors = {};
        if (!form.firstName.trim()) newErrors.firstName = "Обов'язкове поле";
        if (!form.lastName.trim()) newErrors.lastName = "Обов'язкове поле";
        if (!form.email.trim()) newErrors.email = "Обов'язкове поле";
        if (!form.address.trim()) newErrors.address = "Обов'язкове поле";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;
        console.log('Замовлення:', { form, cartItems });
        setCartItems([]);
        navigate('/order-success');
    };

    const inputStyle = (field) =>
        `w-full border ${errors[field] ? 'border-red-500' : 'border-gray-300'} px-4 py-3 outline-none focus:border-[#0B0035] transition-all`;

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 pt-28 min-h-screen">
            <button
                onClick={() => navigate('/cart')}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-6"
            >
                ← Повернутися до кошика
            </button>

            <h1 className="text-3xl font-black uppercase mb-10 border-b border-gray-200 pb-4">Оформлення замовлення</h1>

            <div className="flex flex-col lg:flex-row gap-10">

                <div className="lg:w-3/5">
                    <h2 className="text-lg font-bold uppercase mb-6 text-[#0B0035]">Дані отримувача</h2>

                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm text-gray-600 mb-1">Ім'я *</label>
                                <input
                                    type="text"
                                    value={form.firstName}
                                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                                    className={inputStyle('firstName')}
                                />
                                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm text-gray-600 mb-1">Прізвище *</label>
                                <input
                                    type="text"
                                    value={form.lastName}
                                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                                    className={inputStyle('lastName')}
                                />
                                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Електронна пошта *</label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className={inputStyle('email')}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Адреса доставки *</label>
                            <textarea
                                rows="3"
                                value={form.address}
                                onChange={(e) => setForm({ ...form, address: e.target.value })}
                                placeholder="м. Київ, вул. Хрещатик 1, кв. 10"
                                className={`${inputStyle('address')} resize-none`}
                            />
                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                        </div>
                    </div>
                </div>

                <div className="lg:w-2/5">
                    <div className="bg-[#f9f9f9] p-6 sticky top-[100px]">
                        <h2 className="text-lg font-bold uppercase mb-6 text-[#0B0035]">Ваше замовлення</h2>

                        <div className="flex flex-col gap-3 mb-6 max-h-[300px] overflow-y-auto pr-1">
                            {cartItems.map((item, i) => {
                                const product = products.find(p => p.id === item.id);
                                if (!product) return null;
                                const price = product.has_discount
                                    ? Math.round(product.base_price * (1 - product.discount_percent / 100))
                                    : product.base_price;
                                return (
                                    <div key={i} className="flex gap-3 items-center border-b border-gray-100 pb-3">
                                        <img src={product.images[0]} alt={product.name} className="w-14 object-cover flex-shrink-0" />
                                        <div className="flex-1 text-sm">
                                            <p className="font-medium text-gray-900">{product.name}</p>
                                            <p className="text-gray-500">{item.size} / {item.color}</p>
                                            <p className="text-gray-500">× {item.quantity}</p>
                                        </div>
                                        <span className="font-bold text-sm">{price * item.quantity} {currency}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Товари</span>
                            <span>{subtotal} {currency}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-4">
                            <span className="text-gray-600">Доставка</span>
                            <span>{deliveryFee === 0 ? 'Безкоштовно' : `${deliveryFee} ${currency}`}</span>
                        </div>
                        <div className="flex justify-between font-black text-lg border-t border-gray-300 pt-4 mb-6">
                            <span>Разом</span>
                            <span>{finalTotal} {currency}</span>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-[#0B0035] text-white font-bold py-4 uppercase hover:bg-[#1a0a4a] transition-colors"
                        >
                            Підтвердити замовлення
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Checkout;