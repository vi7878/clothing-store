import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPackage, FiRefreshCw, FiShield, FiHeart, FiPhone, FiMail, FiClock, FiMapPin } from 'react-icons/fi';

const values = [
  {
    icon: <FiPackage size={26} />,
    title: 'Швидка доставка',
    desc: 'Відправляємо замовлення протягом 24 годин. Безкоштовна доставка від 3 000 UAH. Доставка Пн–Нд: 9:00–19:00.',
  },
  {
    icon: <FiRefreshCw size={26} />,
    title: 'Зручне повернення',
    desc: '14 днів на повернення без зайвих запитань — просто, чесно, для вас.',
  },
  {
    icon: <FiShield size={26} />,
    title: 'Якість перш за все',
    desc: 'Кожен виріб проходить суворий контроль якості перед відправкою до вас.',
  },
  {
    icon: <FiHeart size={26} />,
    title: 'З турботою про вас',
    desc: "Підтримка клієнтів 7 днів на тиждень — ми завжди на зв'язку та готові допомогти.",
  },
];

const team = [
  {
    name: 'AnnaLiulkova',
    role: 'Front-end розробник',
    img: "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_1920/v1/wearhouse/team/An"
  },
  {
    name: 'vi7878',
    role: 'Back-end розробник',
    img: "https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_1920/v1/wearhouse/team/Vi"
  },
];

const stats = [
  { num: '2026', label: 'рік заснування' },
  { num: '3 000+', label: 'задоволених клієнтів' },
  { num: '115+', label: 'позицій в каталозі' },
  { num: '4.9★', label: 'середня оцінка' },
];

function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('wh-visible');
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeSection({ children, className = '' }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className={`wh-fade ${className}`}>
      {children}
    </div>
  );
}

const About = () => {
  return (
    <div className="bg-white overflow-hidden pb-20">

      {/* HERO */}
      <section className="relative bg-[#0B0035] text-white min-h-[550px] flex items-center px-6 md:px-16 py-20">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://res.cloudinary.com/bavwkvmr/image/upload/c_limit,f_auto,q_auto,w_1920/v1/wearhouse/banners/about-bg"
            alt="Wearhouse background"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0035] via-[#B2412E]/20 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1700px] mx-auto w-full">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1 border border-[#B2412E] text-[#B2412E] text-xs font-bold uppercase tracking-widest mb-6">
              Про нас
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.05] mb-8 uppercase">
              Wearhouse —<br />
              <span className="text-[#B2412E]">одяг,</span> що<br />
              говорить за тебе
            </h1>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-lg border-l-2 border-[#B2412E] pl-6">
              Ми створюємо речі для людей, які цінують стиль, комфорт і якість — без жодних компромісів.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1700px] mx-auto px-6 md:px-16 mt-24">

        {/* STORY & STATS */}
        <FadeSection className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="pr-0 md:pr-10">
            <h2 className="text-4xl md:text-5xl font-black text-[#0B0035] uppercase mb-8 wh-title-line">
              Наша історія
            </h2>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Wearhouse народився з простої ідеї: якісний одяг не повинен коштувати цілий статок, а модний — не означає незручний. Ми стартували як невеликий шоурум у центрі міста, де кожен виріб підбирався вручну.
              </p>
              <p>
                Сьогодні ми — повноцінний онлайн-магазин із власними колекціями для жінок і чоловіків. Проте наш підхід залишився незмінним: увага до деталей, чесні ціни та безмежна повага до кожного покупця.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-4 md:space-y-6 translate-y-8">
              <div className="bg-[#E6F1F9] p-8 rounded-tr-[40px] shadow-sm">
                <span className="block text-4xl md:text-5xl font-black text-[#0B0035] mb-2">{stats[0].num}</span>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stats[0].label}</span>
              </div>
              <div className="bg-white border border-gray-200 p-8 shadow-sm hover:border-[#B2412E] transition-colors">
                <span className="block text-4xl md:text-5xl font-black text-[#B2412E] mb-2">{stats[1].num}</span>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stats[1].label}</span>
              </div>
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="bg-[#0B0035] text-white p-8 shadow-sm hover:bg-[#150259] transition-colors">
                <span className="block text-4xl md:text-5xl font-black mb-2">{stats[2].num}</span>
                <span className="text-sm font-bold text-gray-300 uppercase tracking-widest">{stats[2].label}</span>
              </div>
              <div className="bg-[#f8f8f8] p-8 rounded-bl-[40px] shadow-sm">
                <span className="block text-4xl md:text-5xl font-black text-[#0B0035] mb-2">{stats[3].num}</span>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stats[3].label}</span>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* VALUES */}
        <FadeSection className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#0B0035] uppercase wh-title-line">
              Чому обирають нас
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="group relative bg-white border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#B2412E] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <div className="w-14 h-14 bg-[#E6F1F9] text-[#0B0035] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#0B0035] group-hover:text-white transition-colors duration-500">
                  {icon}
                </div>
                <h3 className="font-black text-[#0B0035] text-lg mb-3 uppercase tracking-wide">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </FadeSection>

        {/* MANIFESTO BAND */}
        <FadeSection className="mb-32">
          <div className="relative bg-[#B2412E] text-white overflow-hidden py-24 px-10 md:px-20 text-center flex flex-col items-center shadow-lg">
            <FiHeart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[250px] md:text-[350px] text-white/10 select-none pointer-events-none stroke-1" />
            <h2 className="text-3xl md:text-5xl font-black leading-tight uppercase max-w-4xl relative z-10">
              "Бути собою — це головний <span className="text-[#0B0035]">тренд</span>. Ми створюємо речі, щоб його підкреслити"
            </h2>
            <div className="w-20 h-1 bg-white mt-10 opacity-50 relative z-10"></div>
          </div>
        </FadeSection>

        {/* TEAM */}
        <FadeSection className="mb-32 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-black text-[#0B0035] uppercase mb-16 wh-title-line">
            Команда
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-12 lg:gap-24 w-full max-w-4xl">
            {team.map(({ name, role, img }) => (
              <div key={name} className="flex flex-col items-center group cursor-pointer">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-6 relative bg-gray-100 shadow-md">
                  <img
                    src={img}
                    alt={name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#0B0035] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>
                <h3 className="font-black text-[#0B0035] text-2xl uppercase tracking-tight">{name}</h3>
                <p className="text-[#B2412E] text-sm font-bold uppercase tracking-widest mt-2">{role}</p>
              </div>
            ))}
          </div>
        </FadeSection>

        {/* CONTACTS*/}
        <FadeSection className="mb-32">
          <h2 className="text-4xl md:text-5xl font-black text-[#0B0035] uppercase mb-16 wh-title-line">
            Зв'язок з нами
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FiPhone size={24} />, label: 'Телефон', value: '+38 (0123) 45-67-89' },
              { icon: <FiMail size={24} />, label: 'Email', value: 'support@wearhouse.ua' },
              { icon: <FiClock size={24} />, label: 'Графік', value: 'Пн–Нд: 9:00 – 19:00' },
              { icon: <FiMapPin size={24} />, label: 'Адреса', value: 'бул. Шевченка, 00, м. Черкаси' },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex flex-col items-start border-b-2 border-gray-100 pb-6 hover:border-[#B2412E] transition-colors group">
                <div className="text-[#B2412E] mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {icon}
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                <p className="font-black text-[#0B0035] text-lg">{value}</p>
              </div>
            ))}
          </div>
        </FadeSection>

        {/* CTA*/}
        <FadeSection>
          <div className="bg-[#E6F1F9] p-10 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-black text-[#0B0035] uppercase mb-4">
                Готові оновити гардероб?
              </h2>
              <p className="text-gray-600 text-lg max-w-xl">
                Перегляньте наші нові колекції — унікальний дизайн, який підкреслить вашу індивідуальність
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <Link
                to="/shop/women"
                className="flex items-center justify-center gap-3 bg-[#0B0035] text-white px-10 py-5 font-bold uppercase text-sm hover:bg-[#B2412E] hover:shadow-lg transition-all duration-300"
              >
                Жіночий каталог <FiArrowRight size={18} />
              </Link>
              <Link
                to="/shop/men"
                className="flex items-center justify-center gap-3 bg-white border-2 border-[#0B0035] text-[#0B0035] px-10 py-5 font-bold uppercase text-sm hover:bg-[#0B0035] hover:text-white transition-all duration-300"
              >
                Чоловічий каталог <FiArrowRight size={18} />
              </Link>
            </div>
          </div>
        </FadeSection>

      </div>
    </div>
  )
}

export default About
