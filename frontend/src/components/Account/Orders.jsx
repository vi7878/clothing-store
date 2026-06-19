import { useState, useContext } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';

const Orders = () => {
  const { orders } = useContext(ShopContext);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleOrder = (id) => {
    if (expandedOrderId === id) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(id);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="animate-fade-in text-center py-20">
        <h3 className="text-2xl font-bold mb-4 text-[#0B0035]">Мої замовлення</h3>
        <p className="text-gray-500 mb-8">У вас ще немає замовлень</p>
        <Link
          to="/"
          className="inline-block bg-[#0B0035] text-white px-8 py-3 rounded-md uppercase text-sm font-bold hover:bg-[#1a0a4a] transition-colors"
        >
          Перейти до покупок
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h3 className="text-2xl font-bold mb-8 text-[#0B0035]">Мої замовлення</h3>

      <div className="flex flex-col gap-6">
        {orders.map((order) => {
          const isExpanded = expandedOrderId === order.id;

          return (
            <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md bg-white">
              <div
                onClick={() => toggleOrder(order.id)}
                className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors gap-4 relative"
              >
                <div className="w-full sm:w-1/3 flex flex-col justify-center">
                  <h4 className="font-bold text-lg text-[#0B0035] mb-1">№{order.id}</h4>

                  <div className="flex items-center gap-2">
                    <p className={`${order.statusColor} font-semibold text-sm uppercase tracking-wide`}>
                      {order.status}
                    </p>
                    <span className="text-gray-300">•</span>
                    <p className="text-gray-500 text-xs">
                      {order.statusDate}
                    </p>
                  </div>
                </div>

                <div className="w-full flex-1 flex justify-start sm:justify-center items-center">
                  <div className="flex items-center gap-3">
                    {order.items.slice(0, 5).map((item) => (
                      <img
                        key={item.id}
                        src={typeof item.images[0] === 'object' ? item.images[0].image : item.images[0]}
                        alt={item.name}
                        className="w-16 h-20 object-cover rounded-md shadow-sm border border-gray-100 text-[10px] text-gray-400 break-words overflow-hidden bg-gray-50"
                      />
                    ))}

                    {order.items.length > 5 && (
                      <div className="w-9 h-9 rounded-full bg-[#0B0035] text-white flex items-center justify-center text-sm font-bold shadow-sm">
                        +{order.items.length - 5}
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full sm:w-16 flex justify-end text-gray-400">
                  {isExpanded ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
                </div>
              </div>

              {isExpanded && (
                <div className="p-5 border-t border-gray-100 bg-white">

                  <div className="flex flex-col gap-4 mb-8">
                    {order.items.map(item => (
                      <div key={item.id} className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
                        <img
                          src={typeof item.images[0] === 'object' ? item.images[0].image : item.images[0]}
                          alt={item.name}
                          className="w-16 h-20 object-cover rounded text-[10px] text-gray-400 break-words overflow-hidden bg-gray-50"
                        />
                        <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-2">
                          <div>
                            <h5 className="font-bold text-[#0B0035]">{item.name}</h5>
                            <p className="text-xs text-gray-400 mt-1">Артикул: {item.article}</p>

                            <p className="text-xs text-gray-500 mt-1">
                              Розмір: <span className="font-semibold text-gray-700">{item.size}</span>
                              <span className="mx-2 text-gray-300">|</span>
                              Колір: <span className="font-semibold text-gray-700">{item.color}</span>
                            </p>

                            <p className="text-sm text-gray-600 mt-2">{item.price} грн × {item.qty}</p>
                          </div>
                          <div className="text-left sm:text-right">
                            {item.oldPrice && (
                              <p className="text-xs text-gray-400 line-through mb-1">{item.oldPrice} грн</p>
                            )}
                            <p className="font-bold text-[#B2412E]">{item.price * item.qty} грн</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-5 rounded-lg text-sm text-gray-600 space-y-3">
                    <div className="flex justify-between border-b border-gray-200 border-dotted pb-2">
                      <span>Спосіб оплати</span>
                      <span className="text-right">{order.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 border-dotted pb-2">
                      <span>Доставка</span>
                      <span className="text-right">{order.deliveryCost}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="font-bold text-base text-[#0B0035]">Разом</span>
                      <span className="font-bold text-lg text-[#0B0035]">{order.total}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center sm:justify-end">
                    <button className="w-full sm:w-auto bg-[#0B0035] text-white px-8 py-3 rounded-md uppercase text-sm font-bold hover:bg-[#1a0a4a] transition-colors">
                      Повторити замовлення
                    </button>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
