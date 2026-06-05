import { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const statusMap = {
  'pending': { label: 'В обробці', color: 'text-blue-500' },
  'paid': { label: 'Оплачено', color: 'text-indigo-600' },
  'shipped': { label: 'Відправлено', color: 'text-orange-500' },
  'delivered': { label: 'Виконано', color: 'text-green-600' },
  'cancelled': { label: 'Скасовано', color: 'text-red-500' },
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '/api';
        const response = await fetch(`${apiUrl.endsWith('/') ? apiUrl : apiUrl + '/' }orders/`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleOrder = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  if (loading) return <div className="py-10 text-center">Завантаження замовлень...</div>;

  if (orders.length === 0) return (
    <div className="py-10 text-center">
      <h3 className="text-xl font-bold mb-4">У вас ще немає замовлень</h3>
      <p className="text-gray-500">Ваші майбутні покупки з'являться тут.</p>
    </div>
  );

  return (
    <div className="animate-fade-in">
      <h3 className="text-2xl font-bold mb-8 text-[#0B0035]">Мої замовлення</h3>

      <div className="flex flex-col gap-6">
        {orders.map((order) => {
          const isExpanded = expandedOrderId === order.id;
          const statusInfo = statusMap[order.status] || { label: order.status, color: 'text-gray-500' };
          const formattedDate = new Date(order.created_at).toLocaleString('uk-UA', {
            day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
          });

          return (
            <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md bg-white">
              <div
                onClick={() => toggleOrder(order.id)}
                className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors gap-4 relative"
              >
                <div className="w-full sm:w-1/3 flex flex-col justify-center">
                  <h4 className="font-bold text-lg text-[#0B0035] mb-1">№{order.id}</h4>

                  <div className="flex items-center gap-2">
                    <p className={`${statusInfo.color} font-semibold text-sm uppercase tracking-wide`}>
                      {statusInfo.label}
                    </p>
                    <span className="text-gray-300">•</span>
                    <p className="text-gray-500 text-xs">
                      {formattedDate}
                    </p>
                  </div>
                </div>

                <div className="w-full flex-1 flex justify-start sm:justify-center items-center">
                  <div className="flex items-center gap-3">
                    {order.items.slice(0, 5).map((item) => (
                      <img
                        key={item.id}
                        src={item.product_image || '/placeholder.jpg'}
                        alt={item.product_name}
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
                          src={item.product_image || '/placeholder.jpg'}
                          alt={item.product_name}
                          className="w-16 h-20 object-cover rounded text-[10px] text-gray-400 break-words overflow-hidden bg-gray-50"
                        />
                        <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-2">
                          <div>
                            <h5 className="font-bold text-[#0B0035]">{item.product_name}</h5>

                            <p className="text-xs text-gray-500 mt-1">
                              Розмір: <span className="font-semibold text-gray-700">{item.size_name}</span>
                              <span className="mx-2 text-gray-300">|</span>
                              Колір: <span className="font-semibold text-gray-700">{item.color_name}</span>
                            </p>

                            <p className="text-sm text-gray-600 mt-2">{item.price_at_purchase} грн × {item.quantity}</p>
                          </div>
                          <div className="text-left sm:text-right">
                            <p className="font-bold text-[#B2412E]">{item.price_at_purchase * item.quantity} грн</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-5 rounded-lg text-sm text-gray-600 space-y-3">
                    <div className="flex justify-between border-b border-gray-200 border-dotted pb-2">
                      <span>Спосіб оплати</span>
                      <span className="text-right">{order.payment_method === 'card_online' ? 'Оплата картою онлайн' : 'Оплата при отриманні'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 border-dotted pb-2">
                      <span>Адреса доставки</span>
                      <span className="text-right max-w-[200px] truncate" title={order.shipping_address}>{order.shipping_address}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 border-dotted pb-2">
                      <span>Доставка</span>
                      <span className="text-right">{order.delivery_fee === "0.00" ? 'Безкоштовно' : `${order.delivery_fee} грн`}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="font-bold text-base text-[#0B0035]">Разом</span>
                      <span className="font-bold text-lg text-[#0B0035]">{order.total_amount} грн</span>
                    </div>
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
