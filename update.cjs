const fs = require('fs');

let code = fs.readFileSync('g:/car-service/src/App.tsx', 'utf8');

const heroRegex = /\{\/\* Hero Section \*\/\}([\s\S]*?)\{\/\* Services Section \*\/\}/;
const newHero = `{/* Hero Section */}
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
          <h1 className="text-[clamp(40px,7vw,90px)] font-black tracking-[-2px] leading-[1.1] mb-6 max-w-[900px] uppercase group">
            <span className="text-transparent transition-colors duration-500 group-hover:text-text-white" style={{ WebkitTextStroke: '2px var(--color-text-white)' }}>Профессиональный</span><br />
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
          <div className="border-t border-border-color pt-8 w-full max-w-[800px] flex gap-8 items-center flex-wrap">
            <div className="text-[10px] text-text-dim tracking-[2px] uppercase font-bold">Нам доверяют</div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⭐️</span>
                <div className="flex flex-col">
                  <span className="text-sm font-black leading-none mb-1">4.9</span>
                  <span className="text-[9px] text-text-gray uppercase tracking-[1px]">Яндекс.Карты</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🛡️</span>
                <div className="flex flex-col">
                  <span className="text-sm font-black leading-none mb-1">Оригинал</span>
                  <span className="text-[9px] text-text-gray uppercase tracking-[1px]">Запчасти</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📄</span>
                <div className="flex flex-col">
                  <span className="text-sm font-black leading-none mb-1">ISO 9001</span>
                  <span className="text-[9px] text-text-gray uppercase tracking-[1px]">Сертификат</span>
                </div>
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

      {/* Services Section */}`;
code = code.replace(heroRegex, newHero);


const contactRightRegex = /<motion\.div \n              initial=\{\{ opacity: 0, y: 40 \}\}\n              whileInView=\{\{ opacity: 1, y: 0 \}\}\n              viewport=\{\{ once: true \}\}\n              className="flex flex-col gap-\[2px\]"\n            >([\s\S]*?)<\/motion\.div>/;

const newContactRight = `<motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-[2px]"
            >
              <div className="grid grid-cols-2 gap-[2px]">
                <div className="bg-bg-panel border border-border-color p-5 lg:p-[30px]">
                  <div className="text-[10px] font-bold tracking-[3px] uppercase text-text-gray mb-4">Телефон</div>
                  <div className="text-sm lg:text-lg font-bold mb-1">+7 (495) 123-45-67</div>
                  <div className="text-[10px] lg:text-xs text-text-dim">Ежедневно с 9:00 до 21:00</div>
                </div>
                <div className="bg-bg-panel border border-border-color p-5 lg:p-[30px]">
                  <div className="text-[10px] font-bold tracking-[3px] uppercase text-text-gray mb-4">Email</div>
                  <div className="text-sm lg:text-lg font-bold mb-1 truncate">info@porsche-service.ru</div>
                  <div className="text-[10px] lg:text-xs text-text-dim">Ответ в течение 2 часов</div>
                </div>
              </div>
              <div className="bg-bg-panel border border-border-color p-5 lg:p-[30px] flex flex-col md:flex-row gap-5 justify-between">
                <div>
                  <div className="text-[10px] font-bold tracking-[3px] uppercase text-text-gray mb-4">Адрес</div>
                  <div className="text-base font-bold mb-1">Москва, ул. Автозаводская, 23</div>
                  <div className="text-[10px] lg:text-xs text-text-dim">Бесплатная парковка для клиентов</div>
                </div>
                <div className="min-w-[150px]">
                  <div className="text-[10px] font-bold tracking-[3px] uppercase text-text-gray mb-4">Часы работы</div>
                  <div className="text-[11px] font-semibold">Пн-Пт: 9:00 — 21:00</div>
                  <div className="text-[11px] font-semibold mt-1">Сб: 10:00 — 18:00</div>
                  <div className="text-[11px] text-text-gray mt-1">Вс: Выходной</div>
                </div>
              </div>
              
              {/* Map Box */}
              <div className="bg-bg-panel border border-border-color p-1 relative h-[250px] md:h-[300px] overflow-hidden group">
                <iframe 
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3A7a19280d90bd669a710fe3577d48d0115e61d87e148de4ad4b055d7b51db2706&amp;source=constructor" 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  className="grayscale contrast-125 opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 pointer-events-auto"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none border border-border-light/20 z-10 m-1"></div>
              </div>
            </motion.div>`;
code = code.replace(contactRightRegex, newContactRight);

fs.writeFileSync('g:/car-service/src/App.tsx', code, 'utf8');
console.log('App.tsx updated successfully.');
