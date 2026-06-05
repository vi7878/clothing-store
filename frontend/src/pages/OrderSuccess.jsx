import { Link } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';

const OrderSuccess = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-32 min-h-screen flex flex-col items-center justify-center text-center">
            <FiCheckCircle className="text-green-500 text-7xl mb-6" />
            <h1 className="text-4xl font-black uppercase mb-4">Дякуємо за замовлення!</h1>
            <p className="text-xl text-gray-500 mb-12 max-w-lg">
                Ваше замовлення успішно оформлене. Ми зв'яжемося з вами найближчим часом для підтвердження.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/account" className="bg-[#0B0035] text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-[#1a0a4a] transition-colors">
                    Мої замовлення
                </Link>
                <Link to="/" className="border-2 border-[#0B0035] text-[#0B0035] px-8 py-4 font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors">
                    На головну
                </Link>
            </div>
        </div>
    );
};

export default OrderSuccess;
