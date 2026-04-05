import { useState, useEffect, FormEvent } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

const SERVICES = [
  {
    id: '01',
    category: 'maintenance',
    name: 'Техобслуживание',
    desc: 'Полное техническое обслуживание по регламенту производителя. Замена масла, фильтров, жидкостей и расходных материалов.',
    duration: '2-4 часа',
    warranty: '12 мес',
    barWidth: '95%',
    icon: (
      <svg className="w-12 h-12 stroke-text-white fill-none stroke-[1.5] mb-6 transition-colors duration-400 group-hover:stroke-accent-red" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="18" strokeWidth="2" />
        <circle cx="24" cy="24" r="8" strokeWidth="2" />
        <line x1="24" y1="6" x2="24" y2="16" strokeWidth="2" />
        <line x1="24" y1="32" x2="24" y2="42" strokeWidth="2" />
        <line x1="6" y1="24" x2="16" y2="24" strokeWidth="2" />
        <line x1="32" y1="24" x2="42" y2="24" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: '02',
    category: 'repair',
    name: 'Двигатель',
    desc: 'Диагностика и ремонт двигателей любой сложности. Капитальный ремонт, замена ГРМ, турбин и систем впрыска.',
    duration: '1-5 дней',
    warranty: '24 мес',
    barWidth: '88%',
    icon: (
      <svg className="w-12 h-12 stroke-text-white fill-none stroke-[1.5] mb-6 transition-colors duration-400 group-hover:stroke-accent-red" viewBox="0 0 48 48">
        <rect x="8" y="20" width="32" height="16" rx="2" strokeWidth="2" />
        <line x1="16" y1="20" x2="16" y2="12" strokeWidth="2" />
        <line x1="32" y1="20" x2="32" y2="12" strokeWidth="2" />
        <line x1="16" y1="12" x2="32" y2="12" strokeWidth="2" />
        <circle cx="24" cy="28" r="4" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: '03',
    category: 'repair',
    name: 'Тормозная система',
    desc: 'Замена тормозных дисков, колодок, суппортов. Прокачка системы, замена тормозной жидкости. Керамические тормоза PCCB.',
    duration: '3-6 часов',
    warranty: '12 мес',
    barWidth: '82%',
    icon: (
      <svg className="w-12 h-12 stroke-text-white fill-none stroke-[1.5] mb-6 transition-colors duration-400 group-hover:stroke-accent-red" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="16" strokeWidth="2" />
        <circle cx="24" cy="24" r="10" strokeWidth="2" />
        <circle cx="24" cy="24" r="4" strokeWidth="2" fill="currentColor" />
        <line x1="24" y1="8" x2="24" y2="14" strokeWidth="2" />
        <line x1="24" y1="34" x2="24" y2="40" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: '04',
    category: 'tuning',
    name: 'Чип-тюнинг',
    desc: 'Программная оптимизация ЭБУ. Увеличение мощности, крутящего момента. Stage 1, 2, 3. Индивидуальная калибровка.',
    duration: '+15-40%',
    warranty: 'Пожизн.',
    barWidth: '90%',
    icon: (
      <svg className="w-12 h-12 stroke-text-white fill-none stroke-[1.5] mb-6 transition-colors duration-400 group-hover:stroke-accent-red" viewBox="0 0 48 48">
        <path d="M 8,36 L 16,20 L 24,28 L 32,12 L 40,24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8" cy="36" r="3" strokeWidth="2" />
        <circle cx="40" cy="24" r="3" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: '05',
    category: 'maintenance',
    name: 'Электрика',
    desc: 'Компьютерная диагностика всех систем. Ремонт электрооборудования, замена датчиков, адаптация блоков управления.',
    duration: '1-3 часа',
    warranty: '6 мес',
    barWidth: '75%',
    icon: (
      <svg className="w-12 h-12 stroke-text-white fill-none stroke-[1.5] mb-6 transition-colors duration-400 group-hover:stroke-accent-red" viewBox="0 0 48 48">
        <rect x="6" y="10" width="36" height="28" rx="3" strokeWidth="2" />
        <line x1="6" y1="20" x2="42" y2="20" strokeWidth="2" />
        <line x1="18" y1="10" x2="18" y2="20" strokeWidth="2" />
        <line x1="30" y1="10" x2="30" y2="20" strokeWidth="2" />
        <rect x="12" y="26" width="8" height="6" rx="1" strokeWidth="1.5" />
        <rect x="28" y="26" width="8" height="6" rx="1" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    id: '06',
    category: 'tuning',
    name: 'Подвеска',
    desc: 'Настройка и ремонт подвески. Замена амортизаторов, пружин, рычагов. Регулировка развала-схождения. Пневмоподвеска.',
    duration: '4-8 часов',
    warranty: '12 мес',
    barWidth: '85%',
    icon: (
      <svg className="w-12 h-12 stroke-text-white fill-none stroke-[1.5] mb-6 transition-colors duration-400 group-hover:stroke-accent-red" viewBox="0 0 48 48">
        <path d="M 12,36 Q 12,24 24,20 Q 36,16 36,12" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="12" cy="36" r="4" strokeWidth="2" />
        <circle cx="36" cy="12" r="4" strokeWidth="2" />
        <line x1="20" y1="30" x2="28" y2="18" strokeWidth="1.5" strokeDasharray="3,3" />
      </svg>
    )
  }
];

const SPECS = [
  {
    title: 'Двигатель и трансмиссия',
    id: '#ENG-001',
    items: [
      { label: 'Тип', value: 'Flat-6' },
      { label: 'Объём', value: '4.0L' },
      { label: 'Мощность', value: '518 л.с.', highlight: true },
      { label: 'Крутящий момент', value: '465 Нм' },
      { label: 'Коробка', value: '7-PDK' },
      { label: 'Привод', value: 'RWD' }
    ]
  },
  {
    title: 'Динамика',
    id: '#PERF-002',
    items: [
      { label: '0-100 км/ч', value: '3.2 сек', highlight: true },
      { label: '0-200 км/ч', value: '10.4 сек' },
      { label: 'Макс. скорость', value: '296 км/ч' },
      { label: 'Нюрбургринг', value: '6:49.33', highlight: true }
    ]
  },
  {
    title: 'Обслуживание',
    id: '#SRV-003',
    items: [
      { label: 'Замена масла', value: '10 000 км' },
      { label: 'Тормоза', value: '30 000 км' },
      { label: 'Свечи', value: '40 000 км' },
      { label: 'Ремень ГРМ', value: 'Цепь' }
    ]
  }
];

const AnimatedCounter = ({ target, label }: { target: number, label: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [target]);

  return (
    <div className="text-center">
      <div className="text-4xl font-black text-accent-red leading-none">{count}</div>
      <div className="text-[9px] text-text-dim tracking-[2px] uppercase mt-2">{label}</div>
    </div>
  );
};

const Barcode = ({ count, className }: { count: number, className?: string }) => {
  return (
    <div className={`flex items-end gap-[1px] h-full ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i} 
          className="bg-current"
          style={{ 
            width: Math.random() > 0.5 ? '2px' : '1px', 
            height: `${Math.random() * 15 + 15}px` 
          }} 
        />
      ))}
    </div>
  );
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);

  const currentDate = new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('success');
    setTimeout(() => setFormStatus('idle'), 3000);
    (e.target as HTMLFormElement).reset();
  };

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="font-sans text-text-white">
      <div className="grid-overlay"></div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50">
        {/* Top Contact Bar */}
        <div className="hidden lg:block bg-bg-dark border-b border-border-color">
          <div className="max-w-[1400px] mx-auto px-5 md:px-10 h-9 flex items-center justify-between text-[9px] text-text-dim tracking-[1px] uppercase font-semibold">
            <div className="flex items-center gap-6">
              <a href="https://yandex.ru/maps/-/CD" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-text-white transition-colors">
                <MapPin className="w-3 h-3" />
                Москва, ул. Автозаводская, 23
              </a>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                Пн-Вс: 9:00 — 21:00
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a href="tel:+74951234567" className="flex items-center gap-1.5 hover:text-text-white transition-colors">
                <Phone className="w-3 h-3" />
                +7 (495) 123-45-67
              </a>
              <a href="mailto:info@porsche-service.ru" className="flex items-center gap-1.5 hover:text-text-white transition-colors">
                <Mail className="w-3 h-3" />
                info@porsche-service.ru
              </a>
              <div className="flex items-center gap-4 border-l border-border-color pl-6 ml-2">
                <a href="https://t.me/porsche_service" target="_blank" rel="noreferrer" className="hover:text-text-white transition-colors">Telegram</a>
                <a href="https://wa.me/74951234567" target="_blank" rel="noreferrer" className="hover:text-text-white transition-colors">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-bg-dark/95 backdrop-blur-xl border-b border-border-color">
          <div className="max-w-[1400px] mx-auto px-5 md:px-10 flex items-center justify-between h-[70px]">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border-2 border-text-white flex items-center justify-center text-lg font-black tracking-tighter">P</div>
              <div>
                <div className="text-sm font-bold tracking-[4px] uppercase">Service Center</div>
                <div className="text-[9px] text-text-gray tracking-[2px] uppercase mt-0.5">Premium Auto Care</div>
              </div>
            </div>
            
            <ul className="hidden md:flex gap-8 list-none">
              {['services', 'specs', 'about', 'contact'].map(item => (
                <li key={item}>
                  <button 
                    onClick={() => scrollTo(item)}
                    className="text-text-gray text-[11px] font-semibold tracking-[2px] uppercase transition-colors hover:text-text-white relative group"
                  >
                    {item === 'services' ? 'Услуги' : item === 'specs' ? 'Спецификации' : item === 'about' ? 'О нас' : 'Контакты'}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-red transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => scrollTo('contact')}
              className="hidden md:block px-6 py-2.5 bg-accent-red text-white border-none text-[10px] font-bold tracking-[2px] uppercase cursor-pointer transition-all hover:bg-accent-red-dark hover:-translate-y-px"
            >
              Записаться
            </button>

            <button 
              className="md:hidden bg-transparent border border-border-light text-text-white px-3 py-2 cursor-pointer text-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              ☰
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-[70px] left-0 w-full bg-bg-dark/98 z-40 border-b border-border-color p-8 md:hidden">
          {['services', 'specs', 'about', 'contact'].map(item => (
            <button 
              key={item}
              onClick={() => scrollTo(item)}
              className="block w-full text-left text-text-gray text-sm font-semibold tracking-[2px] uppercase py-4 border-b border-border-color transition-colors hover:text-accent-red"
            >
              {item === 'services' ? 'Услуги' : item === 'specs' ? 'Спецификации' : item === 'about' ? 'О нас' : 'Контакты'}
            </button>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center pt-[120px] lg:pt-[150px] px-5 md:px-10 pb-[60px] relative z-10 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1200px] mx-auto w-full relative z-10 flex flex-col items-start"
        >
          {/* Trust Badge */}
          <div className="flex items-center gap-3 mb-8 bg-bg-panel border border-border-color px-4 py-2 w-fit shadow-lg shadow-black/20">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] text-text-gray tracking-[2px] uppercase font-bold">Работаем прямо сейчас</span>
          </div>

          {/* H1 SEO Header */}
          <h1 className="text-[clamp(32px,8vw,90px)] font-black tracking-[-1px] md:tracking-[-2px] leading-[1.1] mb-6 max-w-[900px] uppercase group break-words hyphens-auto">
            <span className="text-transparent transition-colors duration-500 group-hover:text-text-white [-webkit-text-stroke:1px_var(--color-text-white)] sm:[-webkit-text-stroke:2px_var(--color-text-white)]">Профессиональный</span><br />
            автосервис <span className="text-accent-red">Porsche</span><br/> в Москве
          </h1>

          {/* Subheading */}
          <p className="text-base text-text-gray max-w-[500px] leading-[1.8] mb-10 font-medium z-10">
            Честная диагностика за 15 минут. Гарантия на работы от 1 года. 
            Оригинальные запчасти и сертифицированные механики, прошедшие обучение в Германии.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-5 mb-16 w-full sm:w-auto">
            <button 
              onClick={() => scrollTo('contact')}
              className="px-8 py-4 bg-accent-red text-white border-none text-[12px] font-bold tracking-[2px] uppercase cursor-pointer transition-all hover:bg-accent-red-dark hover:shadow-[0_0_20px_rgba(230,57,70,0.4)] hover:-translate-y-px"
            >
              Записаться на ремонт
            </button>
            <a 
              href="tel:+74951234567"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-bg-panel border border-border-color text-text-white text-[12px] font-bold tracking-[2px] uppercase cursor-pointer transition-all hover:border-text-white hover:bg-bg-panel-light"
            >
              <Phone className="w-4 h-4" />
              +7 (495) 123-45-67
            </a>
          </div>

          {/* Trust/Certifications */}
          <div className="border-t border-border-color pt-8 w-full max-w-[800px] flex flex-wrap gap-4 items-center">
            <a 
              href="https://yandex.ru/maps/-/CD" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-4 py-3 px-5 border border-border-color bg-bg-panel hover:border-text-white transition-all group"
            >
              <div className="text-xl font-black text-white group-hover:text-accent-red transition-colors">4.9</div>
              <div className="flex flex-col gap-1">
                <div className="flex text-accent-red gap-0.5">
                  {[1,2,3,4,5].map(i => <svg key={i} className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                </div>
                <span className="text-[9px] text-text-dim uppercase tracking-[1px] font-semibold group-hover:text-text-gray transition-colors">Яндекс Отзывы</span>
              </div>
            </a>
            
            <div className="flex items-center gap-3 py-3 px-5 border border-border-color bg-bg-panel/50">
              <svg className="w-5 h-5 stroke-text-white fill-none stroke-[1.5]" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4"/>
              </svg>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-white tracking-[1px] uppercase">Оригинал</span>
                <span className="text-[8px] text-text-dim uppercase tracking-[1px]">Запчасти</span>
              </div>
            </div>

            <div className="flex items-center gap-3 py-3 px-5 border border-border-color bg-bg-panel/50">
              <svg className="w-5 h-5 stroke-text-white fill-none stroke-[1.5]" viewBox="0 0 24 24">
                <rect strokeLinecap="round" strokeLinejoin="round" width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v18"/><path strokeLinecap="round" strokeLinejoin="round" d="m14 9 3 3-3 3"/>
              </svg>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-white tracking-[1px] uppercase">ISO 9001</span>
                <span className="text-[8px] text-text-dim uppercase tracking-[1px]">Сертификат</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Background Image & Effects */}
        <div className="absolute top-0 right-0 w-[100%] lg:w-[65%] h-full opacity-30 lg:opacity-75 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/80 to-transparent lg:hidden z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-bg-dark z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-bg-dark/20 to-bg-dark z-10 hidden lg:block"></div>
          <img 
            src="https://image.qwenlm.ai/public_source/53f2dacb-36d3-4923-9aa7-6fb0e22d5e02/1a6686c2c-301e-426d-81dd-a271a59224ba.png" 
            alt="Porsche Auto Service" 
            className="w-full h-full object-cover object-right-top contrast-110 brightness-90 mix-blend-lighten"
          />
        </div>
      </section>

      <div className="deco-line z-20 relative"></div>

      {/* Services Section */}
      <section id="services" className="py-[120px] px-5 md:px-10 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 max-w-[1400px] mx-auto w-full"
        >
          <div className="text-[10px] tracking-[4px] uppercase text-accent-red font-bold mb-4">// Наши услуги</div>
          <div className="text-[clamp(40px,5vw,72px)] font-black tracking-[-2px] leading-none">Полный спектр<br/>автосервиса</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-0 mb-10 max-w-[1400px] mx-auto"
        >
          {[
            { id: 'all', label: 'Все услуги' },
            { id: 'maintenance', label: 'Обслуживание' },
            { id: 'repair', label: 'Ремонт' },
            { id: 'tuning', label: 'Тюнинг' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-7 py-3.5 border border-border-color text-[10px] font-bold tracking-[2px] uppercase cursor-pointer transition-all ${
                activeTab === tab.id 
                  ? 'bg-accent-red text-white border-accent-red' 
                  : 'bg-bg-panel text-text-gray hover:border-text-gray hover:text-text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] max-w-[1400px] mx-auto">
          {SERVICES.filter(service => activeTab === 'all' || service.category === activeTab).map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-bg-panel border border-border-color p-10 relative overflow-hidden transition-all duration-400 cursor-pointer hover:bg-bg-panel-light hover:border-accent-red hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
            >
              <div className="text-6xl font-black text-border-color leading-none mb-5 transition-colors duration-400 group-hover:text-accent-red">{service.id}</div>
              {service.icon}
              <div className="text-lg font-extrabold tracking-[1px] mb-3 uppercase">{service.name}</div>
              <div className="text-[13px] text-text-gray leading-[1.7] mb-6">{service.desc}</div>
              <div className="border-t border-border-color pt-4">
                <div className="flex justify-between py-1">
                  <span className="text-[9px] text-text-dim tracking-[1px] uppercase">Длительность</span>
                  <span className="text-[11px] font-semibold">{service.duration}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[9px] text-text-dim tracking-[1px] uppercase">Гарантия</span>
                  <span className="text-[11px] font-semibold">{service.warranty}</span>
                </div>
              </div>
              <div className="mt-5 h-[2px] bg-border-color relative overflow-hidden">
                <motion.div 
                  initial={{ width: '0%' }}
                  whileInView={{ width: service.barWidth }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-accent-red"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="deco-line"></div>

      {/* Specs Section */}
      <section id="specs" className="py-[120px] px-5 md:px-10 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 max-w-[1400px] mx-auto w-full"
        >
          <div className="text-[10px] tracking-[4px] uppercase text-accent-red font-bold mb-4">// Спецификации</div>
          <div className="text-[clamp(40px,5vw,72px)] font-black tracking-[-2px] leading-none">Технические<br/>данные</div>
        </motion.div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-[120px]"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden border border-border-color">
              <img 
                src="https://image.qwenlm.ai/public_source/53f2dacb-36d3-4923-9aa7-6fb0e22d5e02/1a6686c2c-301e-426d-81dd-a271a59224ba.png" 
                alt="Porsche GT3 RS Detail" 
                className="w-full h-full object-cover contrast-110 brightness-[0.85]"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent-red/10 to-transparent"></div>
              <div className="absolute top-5 left-5 bg-bg-dark/90 border border-border-color py-3 px-4">
                <div className="text-4xl font-black leading-none">A</div>
                <div className="text-[8px] text-text-gray tracking-[2px] uppercase mt-1">Сертифицирован</div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-[2px]">
              <div className="bg-bg-panel border border-border-color p-5 text-center">
                <div className="text-[28px] font-black text-accent-red">98%</div>
                <div className="text-[9px] text-text-dim tracking-[2px] uppercase mt-1">Довольных клиентов</div>
              </div>
              <div className="bg-bg-panel border border-border-color p-5 text-center">
                <div className="text-[28px] font-black text-accent-red">15+</div>
                <div className="text-[9px] text-text-dim tracking-[2px] uppercase mt-1">Лет опыта</div>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-[2px]">
            {SPECS.map((spec, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-bg-panel border border-border-color p-[30px] transition-colors hover:border-border-light"
              >
                <div className="flex justify-between items-center mb-5 pb-3 border-b border-border-color">
                  <div className="text-[11px] font-bold tracking-[3px] uppercase text-text-gray">{spec.title}</div>
                  <div className="text-[10px] text-text-dim font-semibold">{spec.id}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {spec.items.map((item, i) => (
                    <div key={i}>
                      <div className="text-[9px] text-text-dim tracking-[1px] uppercase mb-1">{item.label}</div>
                      <div className={`text-base font-extrabold ${item.highlight ? 'text-accent-red' : ''}`}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-bg-panel border border-border-color p-[30px] transition-colors hover:border-border-light"
            >
              <div className="flex justify-between items-center mb-5 pb-3 border-b border-border-color">
                <div className="text-[11px] font-bold tracking-[3px] uppercase text-text-gray">Контактная информация</div>
                <div className="text-[10px] text-text-dim font-semibold">#INF-004</div>
              </div>
              <div className="flex flex-col gap-4 sm:gap-3">
                <div className="flex flex-col sm:flex-row sm:justify-between lg:items-center gap-1 sm:gap-0">
                  <span className="text-[11px] text-text-dim">Телефон</span>
                  <span className="text-sm font-bold">+7 (495) 123-45-67</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between lg:items-center gap-1 sm:gap-0">
                  <span className="text-[11px] text-text-dim">Email</span>
                  <span className="text-sm font-bold lg:break-normal break-all">info@porsche-service.ru</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between lg:items-center gap-1 sm:gap-0">
                  <span className="text-[11px] text-text-dim">Адрес</span>
                  <span className="text-sm font-bold sm:text-right">Москва, ул. Автозаводская, 23</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="deco-line"></div>

      {/* About Section */}
      <section id="about" className="py-[120px] px-5 md:px-10 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-[10px] tracking-[4px] uppercase text-accent-red font-bold mb-4">// О сервисе</div>
            <div className="text-[clamp(40px,5vw,72px)] font-black tracking-[-2px] leading-none">Почему мы</div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[2px]">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-bg-panel border border-border-color p-10"
            >
              <div className="text-[10px] font-bold tracking-[3px] uppercase text-text-gray mb-6 pb-4 border-b border-border-color">О компании</div>
              <p className="text-[13px] text-text-gray leading-[1.8]">
                <strong className="text-text-white">Porsche Service Center</strong> — специализированный автосервис с более чем 15-летним опытом работы с автомобилями Porsche. Мы используем только оригинальные запчасти и сертифицированное оборудование.
              </p>
              <p className="text-[13px] text-text-gray leading-[1.8] mt-4">
                Наши мастера прошли обучение на заводах Porsche в Германии и имеют все необходимые сертификаты для работы с любыми моделями.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-6 justify-between sm:justify-start sm:gap-10">
                <AnimatedCounter target={2847} label="Клиентов" />
                <AnimatedCounter target={15} label="Лет опыта" />
                <AnimatedCounter target={98} label="% Качество" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-bg-panel border border-border-color p-10"
            >
              <div className="text-[10px] font-bold tracking-[3px] uppercase text-text-gray mb-6 pb-4 border-b border-border-color">Преимущества</div>
              <ul className="list-none">
                {[
                  'Оригинальные запчасти Porsche',
                  'Сертифицированные механики',
                  'Гарантия на все работы до 24 месяцев',
                  'Современное диагностическое оборудование',
                  'Прозрачное ценообразование',
                  'Комфортная зона ожидания',
                  'Замена автомобиля на время ремонта',
                  'Доставка автомобиля из любой точки города'
                ].map((item, i) => (
                  <li key={i} className="py-3 border-b border-border-color last:border-none text-[13px] text-text-gray flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-accent-red shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-bg-panel border border-border-color p-10"
            >
              <div className="text-[10px] font-bold tracking-[3px] uppercase text-text-gray mb-6 pb-4 border-b border-border-color">Сертификаты</div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-3 bg-bg-panel-light border border-border-color">
                  <div className="w-10 h-10 bg-accent-red flex items-center justify-center font-black text-sm">P</div>
                  <div>
                    <div className="text-xs font-bold">Porsche Certified</div>
                    <div className="text-[9px] text-text-dim">Сертификат #PSC-2024-001</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-bg-panel-light border border-border-color">
                  <div className="w-10 h-10 bg-blue-600 flex items-center justify-center font-black text-sm">I</div>
                  <div>
                    <div className="text-xs font-bold">ISO 9001:2015</div>
                    <div className="text-[9px] text-text-dim">Система менеджмента качества</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-bg-panel-light border border-border-color">
                  <div className="w-10 h-10 bg-emerald-600 flex items-center justify-center font-black text-sm">E</div>
                  <div>
                    <div className="text-xs font-bold">Eco Service</div>
                    <div className="text-[9px] text-text-dim">Экологический стандарт</div>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-border-color">
                <div className="text-[9px] text-text-dim tracking-[2px] uppercase mb-2">Лицензия</div>
                <div className="text-[13px] font-bold font-mono">PSC-RU-2024-000847</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="deco-line"></div>

      {/* Contact Section */}
      <section id="contact" className="py-[120px] px-5 md:px-10 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-[10px] tracking-[4px] uppercase text-accent-red font-bold mb-4">// Запись на сервис</div>
            <div className="text-[clamp(40px,5vw,72px)] font-black tracking-[-2px] leading-none">Свяжитесь<br/>с нами</div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.form 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleFormSubmit}
              className="flex flex-col gap-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="relative">
                  <label className="text-[9px] text-text-dim tracking-[2px] uppercase mb-2 block">Имя</label>
                  <input type="text" className="w-full p-4 bg-bg-panel border border-border-color text-text-white font-sans text-[13px] outline-none transition-colors focus:border-accent-red placeholder:text-text-dim" placeholder="Ваше имя" required />
                </div>
                <div className="relative">
                  <label className="text-[9px] text-text-dim tracking-[2px] uppercase mb-2 block">Телефон</label>
                  <input type="tel" className="w-full p-4 bg-bg-panel border border-border-color text-text-white font-sans text-[13px] outline-none transition-colors focus:border-accent-red placeholder:text-text-dim" placeholder="+7 (___) ___-__-__" required />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="relative">
                  <label className="text-[9px] text-text-dim tracking-[2px] uppercase mb-2 block">Модель авто</label>
                  <input type="text" className="w-full p-4 bg-bg-panel border border-border-color text-text-white font-sans text-[13px] outline-none transition-colors focus:border-accent-red placeholder:text-text-dim" placeholder="Porsche 911 GT3 RS" />
                </div>
                <div className="relative">
                  <label className="text-[9px] text-text-dim tracking-[2px] uppercase mb-2 block">Год выпуска</label>
                  <input type="text" className="w-full p-4 bg-bg-panel border border-border-color text-text-white font-sans text-[13px] outline-none transition-colors focus:border-accent-red placeholder:text-text-dim" placeholder="2024" />
                </div>
              </div>
              <div className="relative">
                <label className="text-[9px] text-text-dim tracking-[2px] uppercase mb-2 block">Тип услуги</label>
                <select className="w-full p-4 bg-bg-panel border border-border-color text-text-white font-sans text-[13px] outline-none transition-colors focus:border-accent-red">
                  <option value="">Выберите услугу</option>
                  <option>Техническое обслуживание</option>
                  <option>Ремонт двигателя</option>
                  <option>Тормозная система</option>
                  <option>Чип-тюнинг</option>
                  <option>Электрика</option>
                  <option>Подвеска</option>
                  <option>Другое</option>
                </select>
              </div>
              <div className="relative">
                <label className="text-[9px] text-text-dim tracking-[2px] uppercase mb-2 block">Сообщение</label>
                <textarea className="w-full p-4 bg-bg-panel border border-border-color text-text-white font-sans text-[13px] outline-none transition-colors focus:border-accent-red placeholder:text-text-dim min-h-[120px] resize-y" placeholder="Опишите проблему или пожелания..."></textarea>
              </div>
              <button 
                type="submit" 
                className={`py-4 px-10 border-none font-sans text-[11px] font-bold tracking-[3px] uppercase cursor-pointer transition-all w-full ${
                  formStatus === 'success' 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-accent-red text-white hover:bg-accent-red-dark hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(230,57,70,0.3)]'
                }`}
              >
                {formStatus === 'success' ? '✓ Заявка отправлена!' : 'Отправить заявку'}
              </button>
            </motion.form>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-[2px]"
            >
              <div className="bg-bg-panel border border-border-color p-[30px]">
                <div className="text-[10px] font-bold tracking-[3px] uppercase text-text-gray mb-4">Телефон</div>
                <div className="text-lg font-bold mb-1">+7 (495) 123-45-67</div>
                <div className="text-xs text-text-dim">Ежедневно с 9:00 до 21:00</div>
              </div>
              <div className="bg-bg-panel border border-border-color p-[30px]">
                <div className="text-[10px] font-bold tracking-[3px] uppercase text-text-gray mb-4">Email</div>
                <div className="text-lg font-bold mb-1">info@porsche-service.ru</div>
                <div className="text-xs text-text-dim">Ответ в течение 2 часов</div>
              </div>
              <div className="bg-bg-panel border border-border-color p-[30px]">
                <div className="text-[10px] font-bold tracking-[3px] uppercase text-text-gray mb-4">Адрес</div>
                <div className="text-lg font-bold mb-1">Москва, ул. Автозаводская, 23</div>
                <div className="text-xs text-text-dim">Бесплатная парковка для клиентов</div>
              </div>
              <div className="bg-bg-panel border border-border-color p-[20px] sm:p-[30px]">
                <div className="text-[10px] font-bold tracking-[3px] uppercase text-text-gray mb-4">Часы работы</div>
                <div className="mt-5">
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-border-color text-xs gap-1 sm:gap-0">
                    <span className="text-text-gray">Понедельник — Пятница</span>
                    <span className="font-semibold">9:00 — 21:00</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-border-color text-xs gap-1 sm:gap-0">
                    <span className="text-text-gray">Суббота</span>
                    <span className="font-semibold">10:00 — 18:00</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 text-xs gap-1 sm:gap-0">
                    <span className="text-text-gray">Воскресенье</span>
                    <span className="font-semibold">Выходной</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-[60px] px-5 md:px-10 border-t border-border-color relative z-10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 border-2 border-text-white flex items-center justify-center text-sm font-black">P</div>
            <div className="text-[10px] text-text-dim tracking-[2px] uppercase">Porsche Service Center © 2024</div>
          </div>
          <Barcode count={80} className="text-text-dim h-10 hidden md:flex" />
          <div className="text-[10px] text-text-dim tracking-[1px]">Все права защищены</div>
        </div>
      </footer>
    </div>
  );
}
