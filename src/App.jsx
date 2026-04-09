import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Menu, X, MapPin, Phone, Mail, Clock,
  ChevronDown, ArrowRight, Users, Sparkles,
  GlassWater, Shield, Wind, Star
} from 'lucide-react';

/* ─── Scroll-triggered fade-in wrapper ─── */
function FadeInUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Data ─── */
const NAV_ITEMS = [
  { label: 'Experiencia', id: 'experiencia' },
  { label: 'Espacios', id: 'espacios' },
  { label: 'Servicios', id: 'servicios' },
  { label: 'Galería', id: 'galeria' },
  { label: 'Contacto', id: 'contacto' },
];

const SERVICES = [
  {
    title: 'Bodas',
    subtitle: 'Ceremonies of Distinction',
    desc: 'Diseño floral a medida, alta gastronomía y vistas panorámicas de 360° para el día más importante de su vida. Cada boda en Las Ventanas es una obra maestra irrepetible.',
    image: 'https://www.salonlasventanas.com/img/pan1.jpg',
  },
  {
    title: 'Eventos Corporativos',
    subtitle: 'Executive Excellence',
    desc: 'El escenario perfecto para juntas directivas, lanzamientos de producto y galas corporativas de alto nivel. Tecnología de vanguardia en un entorno de elegancia inigualable.',
    image: 'https://www.salonlasventanas.com/img/pan2.jpg',
  },
  {
    title: 'Celebraciones Sociales',
    subtitle: 'Moments Elevated',
    desc: 'Quinceañeras, aniversarios y celebraciones privadas transformadas en experiencias cinematográficas en las alturas de Monterrey.',
    image: 'https://www.salonlasventanas.com/img/pan3.jpg',
  },
];

const AMENITIES = [
  { icon: Users, title: 'Capacidad 1,200', desc: 'Salón principal con amplitud para hasta 1,200 invitados sin comprometer la elegancia del espacio.' },
  { icon: Wind, title: 'Terraza Lounge', desc: 'Terraza al aire libre con vistas panorámicas de la ciudad, brisa nocturna y ambientación lounge.' },
  { icon: GlassWater, title: 'Barra Premium', desc: 'Coctelería de autor y sommelier dedicado. Carta de vinos curada para cada tipo de evento.' },
  { icon: Shield, title: 'Privacidad Total', desc: 'Acceso controlado al Piso 10. Seguridad privada y discreción absoluta para su evento.' },
  { icon: Clock, title: 'Horarios Flexibles', desc: 'Su evento fluye a su propio ritmo. Extensiones de horario y logística impecable de montaje.' },
  { icon: Sparkles, title: 'Servicio Concierge', desc: 'Coordinación integral desde el primer contacto. Un solo interlocutor para toda la experiencia.' },
];

const GALLERY = [
  { src: 'https://www.salonlasventanas.com/img/pan1.jpg', alt: 'Salón principal', span: 'md:col-span-2 md:row-span-2' },
  { src: 'https://www.salonlasventanas.com/img/pan2.jpg', alt: 'Vista panorámica' },
  { src: 'https://www.salonlasventanas.com/img/pan3.jpg', alt: 'Iluminación ambiental' },
  { src: 'https://www.salonlasventanas.com/img/pan4.jpg', alt: 'Terraza' },
  { src: 'https://www.salonlasventanas.com/img/maseta.jpg', alt: 'Detalles del espacio', span: 'md:col-span-2' },
];

/* ─── Main App ─── */
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', eventType: '', date: '', guests: '', message: ''
  });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Gracias por su interés. Nos pondremos en contacto con usted a la brevedad.');
  };

  return (
    <div className="min-h-screen bg-ivory font-sans">

      {/* ━━━ Navigation ━━━ */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed w-full z-50 transition-all duration-700 ${
          isScrolled
            ? 'bg-ivory/95 backdrop-blur-md shadow-sm py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            <span className={`font-serif text-xl md:text-2xl tracking-wide transition-colors duration-700 ${
              isScrolled ? 'text-charcoal-dark' : 'text-white'
            }`}>
              Las Ventanas
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${
                  isScrolled
                    ? 'text-stone-600 hover:text-charcoal-dark after:bg-charcoal-dark'
                    : 'text-white/80 hover:text-white after:bg-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contacto"
              className={`font-sans text-[10px] uppercase tracking-widest-plus py-3 px-8 transition-all duration-500 ${
                isScrolled
                  ? 'border border-charcoal-dark text-charcoal-dark hover:bg-charcoal-dark hover:text-ivory'
                  : 'border border-white/70 text-white hover:bg-white hover:text-charcoal-dark'
              }`}
            >
              Agendar Visita
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden transition-colors duration-700 ${
              isScrolled ? 'text-charcoal-dark' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </motion.nav>

      {/* Mobile menu — full screen overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-ivory flex flex-col lg:hidden"
          >
            <div className="flex justify-between items-center px-6 py-6">
              <span className="font-serif text-xl text-charcoal-dark tracking-wide">
                Las Ventanas
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-charcoal-dark"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col flex-1 justify-center px-10 gap-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    setTimeout(() => {
                      const el = document.getElementById(item.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 350);
                  }}
                  className="font-serif text-3xl text-charcoal-dark hover:text-olive-600 transition-colors duration-300"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#contacto"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  setTimeout(() => {
                    const el = document.getElementById('contacto');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 350);
                }}
                className="btn-primary text-center mt-4 w-full"
              >
                Agendar Visita
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━ Hero ━━━ */}
      <section className="relative h-screen flex items-end justify-center overflow-hidden">
        {/* Background image with faded overlay */}
        <div
          className="absolute inset-0 parallax-hero"
          style={{
            backgroundImage: 'url(/hero.png)',
          }}
        />
        {/* Faded warm overlay — quiet luxury feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-dark/50 via-charcoal-dark/40 to-charcoal-dark/30" />

        <div className="relative z-10 text-center px-6 pb-24 md:pb-32 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="section-label text-white/70">Monterrey, Nuevo León</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[1.05] font-normal"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
          >
            Donde la Elegancia<br />
            <span className="italic">Toca el Cielo</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-white font-light leading-relaxed text-base md:text-lg max-w-2xl mx-auto mb-12"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}
          >
            En el Piso 10 de Torre Las Ventanas, junto a la Macroplaza,
            creamos experiencias que perduran en la memoria. Vistas 360°
            de la ciudad para sus momentos más extraordinarios.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#contacto" className="border border-white/60 text-white font-sans text-[11px] uppercase tracking-widest-plus py-5 px-12 hover:bg-white/15 transition-all duration-500 inline-block">
              Solicitar Disponibilidad
            </a>
            <a href="#experiencia" className="border border-white/60 text-white font-sans text-[11px] uppercase tracking-widest-plus py-5 px-12 hover:bg-white/15 transition-all duration-500 inline-block">
              Descubrir el Espacio
            </a>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <ChevronDown className="w-5 h-5 text-stone-400 animate-bounce" />
        </motion.div>
      </section>

      {/* ━━━ Experience / Philosophy ━━━ */}
      <section id="experiencia" className="py-28 md:py-40 bg-ivory">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <FadeInUp>
            <span className="section-label">La Experiencia</span>
          </FadeInUp>

          <FadeInUp delay={0.15}>
            <h2 className="section-heading mb-10">
              "No solo organizamos eventos.<br />
              <span className="italic">Orquestamos legados.</span>"
            </h2>
          </FadeInUp>

          <FadeInUp delay={0.3}>
            <div className="separator mb-10" />
          </FadeInUp>

          <FadeInUp delay={0.4}>
            <p className="body-text max-w-3xl mx-auto mb-16">
              Salón Las Ventanas es un espacio único y diferente, ubicado en el corazón
              de Monterrey. Nuestros enormes ventanales ofrecen vistas panorámicas de la
              ciudad en todas las direcciones, creando un escenario majestuoso donde la
              elegancia, la distinción y el buen gusto se fusionan con el más completo
              y cálido de los servicios.
            </p>
          </FadeInUp>

          {/* Three pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              { number: '1,200', label: 'Capacidad de invitados', sub: 'en salón principal' },
              { number: '360°', label: 'Vistas panorámicas', sub: 'de Monterrey' },
              { number: 'Piso 10', label: 'Torre Las Ventanas', sub: 'junto a Macroplaza' },
            ].map((stat, i) => (
              <FadeInUp key={i} delay={0.2 * i}>
                <div className="group">
                  <p className="font-serif text-5xl md:text-6xl text-charcoal-dark mb-3">
                    {stat.number}
                  </p>
                  <p className="text-[11px] uppercase tracking-widest-plus text-stone-500 font-medium">
                    {stat.label}
                  </p>
                  <p className="text-stone-400 text-sm mt-1">{stat.sub}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Full-width Image Break ━━━ */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 parallax-hero"
          style={{
            backgroundImage: 'url(https://www.salonlasventanas.com/img/pan4.jpg)',
          }}
        />
        <div className="absolute inset-0 bg-charcoal-dark/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <FadeInUp>
            <p className="font-serif text-3xl md:text-5xl text-white text-center px-6 italic max-w-3xl leading-snug">
              La cima de la exclusividad<br />en el corazón de Monterrey
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* ━━━ Spaces / Servicios ━━━ */}
      <section id="espacios" className="py-28 md:py-40 bg-bone">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left — Content */}
            <div>
              <FadeInUp>
                <span className="section-label">Nuestros Espacios</span>
              </FadeInUp>

              <FadeInUp delay={0.15}>
                <h2 className="section-heading mb-12">
                  Cada evento merece<br />
                  <span className="italic">un escenario a su altura</span>
                </h2>
              </FadeInUp>

              <div className="space-y-1">
                {SERVICES.map((service, idx) => (
                  <FadeInUp key={idx} delay={0.1 * idx}>
                    <button
                      onClick={() => setActiveService(idx)}
                      className={`w-full text-left py-6 border-b border-stone-200 transition-all duration-500 group ${
                        activeService === idx ? 'border-charcoal-dark' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`font-serif text-2xl md:text-3xl transition-colors duration-500 ${
                          activeService === idx ? 'text-charcoal-dark' : 'text-stone-400 group-hover:text-stone-600'
                        }`}>
                          {service.title}
                        </h3>
                        <ArrowRight className={`w-5 h-5 transition-all duration-500 ${
                          activeService === idx
                            ? 'text-charcoal-dark translate-x-0 opacity-100'
                            : 'text-stone-300 -translate-x-2 opacity-0 group-hover:opacity-50'
                        }`} />
                      </div>

                      <AnimatePresence mode="wait">
                        {activeService === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            <p className="text-[11px] uppercase tracking-widest-plus text-olive-500 mb-3">
                              {service.subtitle}
                            </p>
                            <p className="body-text text-base">
                              {service.desc}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </FadeInUp>
                ))}
              </div>
            </div>

            {/* Right — Image */}
            <FadeInUp delay={0.3}>
              <div className="relative h-[500px] md:h-[650px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeService}
                    src={SERVICES[activeService].image}
                    alt={SERVICES[activeService].title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bone/30 to-transparent" />
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* ━━━ Services / Amenities ━━━ */}
      <section id="servicios" className="py-28 md:py-40 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <FadeInUp>
              <span className="section-label">Servicios</span>
            </FadeInUp>
            <FadeInUp delay={0.15}>
              <h2 className="section-heading mb-6">El Estándar Las Ventanas</h2>
            </FadeInUp>
            <FadeInUp delay={0.3}>
              <div className="separator" />
            </FadeInUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {AMENITIES.map((amenity, idx) => (
              <FadeInUp key={idx} delay={0.1 * idx}>
                <div className="group p-8 md:p-10 border border-stone-200 hover:border-stone-400 bg-white/50 transition-all duration-500">
                  <amenity.icon className="w-8 h-8 text-olive-500 mb-8 group-hover:text-olive-600 transition-colors duration-500" strokeWidth={1.5} />
                  <h3 className="font-serif text-xl text-charcoal-dark mb-4">
                    {amenity.title}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed font-light">
                    {amenity.desc}
                  </p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Gallery ━━━ */}
      <section id="galeria" className="py-28 md:py-40 bg-bone">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <FadeInUp>
              <span className="section-label">Galería</span>
            </FadeInUp>
            <FadeInUp delay={0.15}>
              <h2 className="section-heading mb-6">Un Recorrido Visual</h2>
            </FadeInUp>
            <FadeInUp delay={0.3}>
              <p className="body-text max-w-2xl mx-auto">
                Descubra la majestuosidad de nuestras instalaciones, donde cada
                ángulo revela una nueva perspectiva de elegancia.
              </p>
            </FadeInUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
            {GALLERY.map((img, idx) => (
              <FadeInUp key={idx} delay={0.08 * idx} className={img.span || ''}>
                <div className="relative w-full h-full overflow-hidden group cursor-pointer">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal-dark/0 group-hover:bg-charcoal-dark/20 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <p className="text-white text-xs uppercase tracking-widest-plus font-sans">
                      {img.alt}
                    </p>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Availability Inquiry Form ━━━ */}
      <section id="contacto" className="py-28 md:py-40 bg-ivory">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Left — Info */}
            <div>
              <FadeInUp>
                <span className="section-label">Contacto</span>
              </FadeInUp>
              <FadeInUp delay={0.15}>
                <h2 className="section-heading mb-8">
                  Consulte<br />
                  <span className="italic">Disponibilidad</span>
                </h2>
              </FadeInUp>
              <FadeInUp delay={0.3}>
                <p className="body-text mb-12">
                  Permítanos conocer su visión. Agende una visita privada a
                  nuestras instalaciones y descubra por qué Las Ventanas es
                  el escenario preferido de los eventos más distinguidos de Monterrey.
                </p>
              </FadeInUp>

              <FadeInUp delay={0.4}>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-olive-500 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="text-charcoal-dark text-sm font-medium mb-1">Ubicación</p>
                      <p className="text-stone-500 text-sm">
                        Piso 10, Torre Las Ventanas<br />
                        Centro, Macroplaza<br />
                        Monterrey, Nuevo León
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-olive-500 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="text-charcoal-dark text-sm font-medium mb-1">Teléfono</p>
                      <p className="text-stone-500 text-sm">+52 (81) 8000-0000</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-olive-500 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="text-charcoal-dark text-sm font-medium mb-1">Correo</p>
                      <p className="text-stone-500 text-sm">contacto@salonlasventanas.com</p>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            </div>

            {/* Right — Form */}
            <FadeInUp delay={0.2}>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Nombre completo"
                    required
                    className="form-input"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="Correo electrónico"
                    required
                    className="form-input"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="Teléfono"
                    className="form-input"
                  />
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleFormChange}
                    required
                    className="form-input appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Tipo de evento</option>
                    <option value="boda">Boda</option>
                    <option value="corporativo">Evento Corporativo</option>
                    <option value="social">Celebración Social</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleFormChange}
                    className="form-input"
                  />
                  <input
                    type="number"
                    name="guests"
                    value={formData.guests}
                    onChange={handleFormChange}
                    placeholder="Número de invitados"
                    min="1"
                    max="1200"
                    className="form-input"
                  />
                </div>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Cuéntenos sobre su evento..."
                  rows={4}
                  className="form-input resize-none"
                />

                <button type="submit" className="btn-primary w-full">
                  Solicitar Disponibilidad
                </button>

                <p className="text-stone-400 text-xs text-center">
                  Responderemos a su consulta dentro de las próximas 24 horas.
                </p>
              </form>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* ━━━ Footer ━━━ */}
      <footer className="bg-charcoal-dark text-stone-400 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Brand */}
            <div>
              <h3 className="font-serif text-2xl text-white mb-4">Las Ventanas</h3>
              <p className="text-stone-500 text-sm leading-relaxed font-light">
                Elegancia, distinción y buen gusto en el corazón
                de Monterrey. El escenario perfecto para sus
                momentos más extraordinarios.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <p className="text-[11px] uppercase tracking-widest-plus text-stone-500 mb-6">
                Navegación
              </p>
              <div className="flex flex-col gap-3">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-stone-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="text-[11px] uppercase tracking-widest-plus text-stone-500 mb-6">
                Contacto
              </p>
              <div className="space-y-3 text-sm">
                <p>Piso 10, Torre Las Ventanas</p>
                <p>Centro, Macroplaza</p>
                <p>Monterrey, N.L., México</p>
                <p className="pt-2">+52 (81) 8000-0000</p>
                <p>contacto@salonlasventanas.com</p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-stone-700/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-stone-600 text-xs tracking-wide">
              © 2026 Salón de Eventos Las Ventanas. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://www.instagram.com/lasventanasmx/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-white transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/salonlasventanas/?locale=es_LA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-white transition-colors duration-300"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
