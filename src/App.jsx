import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, ChevronDown, Menu, X, Rocket, Share2, Award, 
  Server, Code, Shield, Zap, ArrowRight, Play, Download, 
  Star, Users, TrendingUp, Globe2, Activity, Mail as MailIcon,
  CheckCircle, Zap as ZapIcon, Monitor, Smartphone, Router
} from 'lucide-react';

// 颜色主题 - 优化后的配色方案
const THEME = {
  primary: '#403ab4',
  primaryLight: '#5b4dd4',
  primaryDark: '#2e2a8a',
  accent: '#6366f1',
  white: '#ffffff',
  black: '#000000',
  bgDark: '#0a0a0f',
  gray900: '#12141c',
  gray800: '#1a1d27',
  gray700: '#252a36',
  gray600: '#323844',
  gray500: '#4a5568',
  gray400: '#8892a6',
  gray300: '#c4c9d4',
  gray200: '#e2e5ea',
  textPrimary: '#ffffff',
  textSecondary: '#e2e5ea',
  textMuted: '#8892a6',
};

const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold, rootMargin: '0px 0px -100px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, hasAnimated]);

  return { ref, isVisible };
};

const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offset;
};

const AnimatedSection = ({ children, animation = 'slideUp', delay = 0 }) => {
  const { ref, isVisible } = useScrollAnimation(0.05);
  const animations = {
    slideUp: 'animate-slide-up',
    slideDown: 'animate-slide-down',
    fadeIn: 'animate-fade-in',
    scaleIn: 'animate-scale-in',
  };

  return (
    <div 
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isVisible ? animations[animation] : 'opacity-0 translate-y-16'}`}
      style={{ transitionDelay: delay + 'ms' }}
    >
      {children}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight;
      setScrollProgress(Math.min(scrollY / maxScroll, 1));
      setScrolled(scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    { name: 'Smart Access', href: '/Info/SmartAccess.aspx', icon: ZapIcon },
    { name: 'Premium Access', href: '/Info/PremiumAccess.aspx', icon: Star },
    { name: 'Group Access', href: '/Info/GroupAccess.aspx', icon: Users },
  ];

  const prices = [
    { name: '产品价格', href: '/Price.aspx' },
    { name: '免费注册', href: '/signupbyemail.aspx' },
  ];

  const languages = [
    { name: 'English', code: 'en' },
    { name: '简体中文', code: 'cn' },
    { name: '繁體中文', code: 'tw' },
    { name: 'Deutsch', code: 'de' },
    { name: 'Français', code: 'fr' },
    { name: '日本語', code: 'jp' },
    { name: '한국어', code: 'kr' },
  ];

  const navbarOpacity = scrolled ? 0.98 : Math.min(scrollProgress * 0.9, 0.9);
  const navbarBlur = scrolled ? 20 : scrollProgress * 15;

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: `rgba(10, 10, 15, ${navbarOpacity})`,
        backdropFilter: `blur(${navbarBlur}px)`,
        boxShadow: scrolled ? '0 4px 30px rgba(64, 58, 180, 0.15)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(64, 58, 180, 0.2)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center group">
              <img 
                src="/newindex/images/logo-4.png" 
                alt="Nexitally" 
                className="h-10 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-lg"
                style={{filter: scrolled ? 'none' : 'brightness(1.1)'}}
              />
            </a>
          </div>

          <nav className="hidden lg:flex items-center space-x-6">
            <div className="relative group" onMouseEnter={() => setActiveDropdown('products')} onMouseLeave={() => setActiveDropdown(null)}>
              <button className="text-gray-300 hover:text-white px-3 py-2 flex items-center gap-1 transition-all duration-200 hover:scale-105">产品 <ChevronDown className="w-4 h-4" /></button>
              {activeDropdown === 'products' && (
                <div className="absolute top-full left-0 mt-2 bg-gray-800/98 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl shadow-black/50 py-2 min-w-48 animate-slide-down" style={{borderColor: THEME.primary + '40', animation: 'slideDown 0.3s ease-out'}}>
                  {products.map((product) => (
                    <a key={product.name} href={product.href} className="flex items-center gap-2 px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200">
                      {product.icon && <product.icon className="w-4 h-4" style={{color: THEME.primary}} />}
                      <span>{product.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="relative group" onMouseEnter={() => setActiveDropdown('price')} onMouseLeave={() => setActiveDropdown(null)}>
              <button className="text-gray-300 hover:text-white px-3 py-2 flex items-center gap-1 transition-all duration-200 hover:scale-105">价格 <ChevronDown className="w-4 h-4" /></button>
              {activeDropdown === 'price' && (
                <div className="absolute top-full left-0 mt-2 bg-gray-800/98 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl py-2 min-w-40" style={{borderColor: THEME.primary + '40', animation: 'slideDown 0.3s ease-out'}}>
                  {prices.map((price) => (<a key={price.name} href={price.href} className="block px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200">{price.name}</a>))}
                </div>
              )}
            </div>

            <a href="#" className="text-gray-300 hover:text-white transition-all duration-200 hover:scale-105">全球节点</a>
            <a href="#" className="text-gray-300 hover:text-white transition-all duration-200 hover:scale-105">客户端下载</a>
            <a href="#" className="text-gray-300 hover:text-white transition-all duration-200 hover:scale-105">支持</a>

            <div className="flex items-center gap-3 ml-4">
              <a href="/signupbyemail.aspx?a=1&f=1" className="px-4 py-2 text-gray-300 hover:text-white transition-all duration-200 hover:scale-105">免费注册</a>
              <a href="/Main.aspx" className="px-6 py-2.5 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg" 
                 style={{
                   background: 'linear-gradient(135deg, ' + THEME.primary + ' 0%, ' + THEME.primaryLight + ' 100%)',
                   boxShadow: '0 4px 15px ' + THEME.primary + '50'
                 }}
                 onMouseEnter={(e) => {
                   e.target.style.transform = 'translateY(-2px) scale(1.02)';
                   e.target.style.boxShadow = '0 8px 25px ' + THEME.primary + '60';
                 }}
                 onMouseLeave={(e) => {
                   e.target.style.transform = 'translateY(0) scale(1)';
                   e.target.style.boxShadow = '0 4px 15px ' + THEME.primary + '50';
                 }}
              >登入</a>
            </div>

            <div className="relative group ml-4" onMouseEnter={() => setActiveDropdown('lang')} onMouseLeave={() => setActiveDropdown(null)}>
              <button className="text-gray-300 hover:text-white px-3 py-2 flex items-center gap-1 transition-all duration-200"><Globe className="w-4 h-4" /> <ChevronDown className="w-4 h-4" /></button>
              {activeDropdown === 'lang' && (
                <div className="absolute top-full right-0 mt-2 bg-gray-800/98 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl py-2 min-w-36" style={{borderColor: THEME.primary + '40', animation: 'slideDown 0.3s ease-out'}}>
                  {languages.map((lang) => (<button key={lang.code} className="block w-full text-left px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200">{lang.name}</button>))}
                </div>
              )}
            </div>
          </nav>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-gray-300 hover:text-white p-2 transition-all duration-200">{isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-gray-900/98 backdrop-blur-xl border-t border-gray-800">
          <div className="px-4 py-6 space-y-3">
            <div>
              <button onClick={() => setActiveDropdown(activeDropdown === 'prod' ? null : 'prod')} className="text-gray-300 hover:text-white flex items-center justify-between w-full py-3 transition-all duration-200">产品 <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'prod' ? 'rotate-180' : ''}`} /></button>
              {activeDropdown === 'prod' && (<div className="mt-2 pl-4 space-y-2 border-l-2 border-gray-700 ml-2">{products.map((p) => <a key={p.name} href={p.href} className="block py-2.5 text-gray-400 hover:text-white transition-all duration-200">{p.name}</a>)}</div>)}
            </div>
            <a href="#" className="block text-gray-300 py-3 border-b border-gray-800 transition-all duration-200 hover:text-white hover:pl-2">全球节点</a>
            <a href="#" className="block text-gray-300 py-3 border-b border-gray-800 transition-all duration-200 hover:text-white hover:pl-2">客户端下载</a>
            <a href="#" className="block text-gray-300 py-3 border-b border-gray-800 transition-all duration-200 hover:text-white hover:pl-2">支持</a>
            <div className="flex gap-3 pt-4">
              <a href="/signupbyemail.aspx?a=1&f=1" className="flex-1 px-4 py-3 text-center text-gray-300 border border-gray-600 rounded-lg transition-all duration-200 hover:border-white hover:text-white">免费注册</a>
              <a href="/Main.aspx" className="flex-1 px-4 py-3 text-center text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg" style={{background: 'linear-gradient(135deg, ' + THEME.primary + ' 0%, ' + THEME.primaryLight + ' 100%)'}}>登入</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const Hero = () => {
  const offset = useParallax(0.3);
  const offset2 = useParallax(0.1);

  return (
    <section className="relative overflow-hidden pt-20" style={{background: 'linear-gradient(180deg, ' + THEME.bgDark + ' 0%, ' + THEME.gray900 + ' 50%, ' + THEME.primaryDark + ' 100%)'}}>
      {/* 视差背景层 */}
      <div className="absolute inset-0 overflow-hidden" style={{transform: `translateY(${offset * 0.5}px)`}}>
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(' + THEME.primary + '08 1px, transparent 1px), linear-gradient(90deg, ' + THEME.primary + '08 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.6
        }}></div>
      </div>
      
      {/* 浮动光球 - 视差效果 */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-25 blur-3xl" style={{
        background: 'radial-gradient(circle, ' + THEME.primary + ' 0%, transparent 70%)',
        transform: `translateY(${-offset}px)`,
        animation: 'pulse 4s ease-in-out infinite'
      }}></div>
      
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl" style={{
        background: 'radial-gradient(circle, ' + THEME.accent + ' 0%, transparent 70%)',
        transform: `translateY(${offset * 0.7}px)`,
        animation: 'pulse 4s ease-in-out infinite 1s'
      }}></div>

      {/* 装饰性粒子 */}
      <div className="absolute inset-0" style={{transform: `translateY(${offset2}px)`}}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 rounded-full animate-pulse" style={{
            background: THEME.primary,
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            opacity: Math.random() * 0.5 + 0.2,
            animationDelay: Math.random() * 2 + 's'
          }}></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center min-h-screen py-24">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-10 animate-fade-in" style={{background: THEME.primary + '15', border: '1px solid ' + THEME.primary + '40'}}>
              <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{background: '#22c55e', boxShadow: '0 0 12px #22c55e'}}></span>
              <span className="text-sm font-medium" style={{color: THEME.primary}}>全球网络加速服务</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight animate-slide-up" style={{animationDelay: '0.1s'}}>
              <span style={{
                background: 'linear-gradient(135deg, ' + THEME.white + ' 0%, ' + THEME.primary + ' 50%, ' + THEME.accent + ' 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>NEXITALLY</span>
            </h1>
            
            <p className="text-gray-400 text-xl md:text-1.25rem mb-10 leading-relaxed animate-slide-up" style={{animationDelay: '0.2s', color: THEME.gray300}}>
              获取与全球数百内容供应商互联的网络加速服务
              <br />
              <span style={{color: THEME.primary, fontWeight: 500}}>高达 2000Mbps 的单线接入能力</span>
            </p>

            <div className="flex flex-wrap gap-10 mb-12 justify-center lg:justify-start animate-slide-up" style={{animationDelay: '0.3s'}}>
              <div className="text-center lg:text-left">
                <div className="text-4xl md:text-5xl font-bold" style={{color: THEME.primary}}>100+</div>
                <div className="text-gray-500 text-sm mt-1">全球节点</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-4xl md:text-5xl font-bold" style={{color: THEME.primary}}>2000</div>
                <div className="text-gray-500 text-sm mt-1">Mbps 带宽</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-4xl md:text-5xl font-bold" style={{color: THEME.primary}}>99.9%</div>
                <div className="text-gray-500 text-sm mt-1">可用性</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-5 justify-center lg:justify-start animate-slide-up" style={{animationDelay: '0.4s'}}>
              <a href="/signup.aspx?a=1&f=1" className="group px-10 py-4.5 text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-2.5 hover:shadow-2xl hover:scale-105" 
                 style={{
                   background: 'linear-gradient(135deg, ' + THEME.primary + ' 0%, ' + THEME.primaryLight + ' 100%)',
                   boxShadow: '0 8px 30px ' + THEME.primary + '50'
                 }}
                 onMouseEnter={(e) => {e.target.style.transform = 'translateY(-3px) scale(1.02)'; e.target.style.boxShadow = '0 12px 40px ' + THEME.primary + '60';}}
                 onMouseLeave={(e) => {e.target.style.transform = 'translateY(0) scale(1)'; e.target.style.boxShadow = '0 8px 30px ' + THEME.primary + '50';}}
              >
                免费注册 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </a>
              <button className="px-10 py-4.5 border border-gray-600 text-gray-300 font-semibold rounded-xl transition-all duration-300 flex items-center gap-2.5 hover:scale-105" 
                      style={{borderColor: THEME.primary + '60', color: THEME.gray300}}
                      onMouseEnter={(e) => {
                        e.target.style.background = THEME.primary + '15';
                        e.target.style.borderColor = THEME.primary;
                        e.target.style.color = THEME.white;
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 8px 25px ' + THEME.primary + '20';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.borderColor = THEME.primary + '60';
                        e.target.style.color = THEME.gray300;
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
              >
                <Play className="w-5 h-5" /> 了解更多
              </button>
            </div>
          </div>

          <div className="hidden lg:block order-1 lg:order-2 relative" style={{transform: `translateY(${offset * 0.3}px)`}}>
            <div className="relative" style={{perspective: '1500px'}}>
              <img 
                src="/images/dc3bb92c-9fd1-4785-9439-80832e4d7e2b.png" 
                alt="Nexitally" 
                className="w-full max-w-lg mx-auto relative z-10"
                style={{
                  filter: 'drop-shadow(0 30px 60px rgba(64, 58, 180, 0.4))',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  animation: 'float 8s ease-in-out infinite',
                  transform: 'perspective(1000px) rotateY(-5deg)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'perspective(1000px) rotateY(-2deg) scale(1.05)';
                  e.target.style.filter = 'drop-shadow(0 40px 80px rgba(64, 58, 180, 0.5))';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'perspective(1000px) rotateY(-5deg) scale(1)';
                  e.target.style.filter = 'drop-shadow(0 30px 60px rgba(64, 58, 180, 0.4))';
                }}
              />
              
              {/* 装饰光效 */}
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-35 blur-3xl" style={{
                background: 'linear-gradient(135deg, ' + THEME.primary + ', ' + THEME.accent + ')',
                animation: 'pulse 3s ease-in-out infinite',
                filter: 'blur(40px)'
              }}></div>
              
              <div className="absolute -bottom-8 -left-12 w-40 h-40 rounded-full opacity-25 blur-2xl" style={{
                background: 'linear-gradient(135deg, ' + THEME.accent + ', ' + THEME.primaryLight + ')',
                animation: 'pulse 4s ease-in-out infinite 1.5s',
                filter: 'blur(30px)'
              }}></div>

              {/* 装饰边框 */}
              <div className="absolute -inset-4 border border-white/5 rounded-3xl" style={{transform: 'translateZ(-20px)'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* 滚动指示器 */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-10 h-16 rounded-full flex justify-center pt-3 border-2" style={{borderColor: THEME.primary + '50'}}>
          <div className="w-1.5 h-4 rounded-full animate-pulse" style={{background: 'linear-gradient(to bottom, ' + THEME.primary + ', ' + THEME.accent + ')'}}></div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div 
      ref={ref}
      className={`group relative p-8 rounded-2.5xl overflow-hidden transition-all duration-500 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-12'}`}
      style={{ 
        transitionDelay: (index * 120) + 'ms',
        background: isHovered ? 'linear-gradient(145deg, ' + THEME.gray800 + ' 0%, ' + THEME.gray900 + ' 100%)' : 'linear-gradient(145deg, ' + THEME.gray800 + ' 0%, ' + THEME.gray900 + ' 60%)',
        border: '1px solid ' + (isHovered ? THEME.primary : THEME.gray700),
        transform: isHovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: isHovered ? '0 25px 50px -12px ' + THEME.primary + '30' : '0 4px 20px rgba(0,0,0,0.3)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 背景光效 */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500" style={{
        opacity: isHovered ? 1 : 0,
        background: 'radial-gradient(circle at center, ' + THEME.primary + '08 0%, transparent 70%)'
      }}></div>
      
      {/* 边框发光 */}
      <div className="absolute inset-0 rounded-2.5xl opacity-0 transition-opacity duration-500" style={{
        opacity: isHovered ? 1 : 0,
        padding: '1px',
        background: 'linear-gradient(145deg, ' + THEME.primary + ', ' + THEME.accent + ')'
      }}>
        <div className="w-full h-full rounded-[19px]" style={{background: THEME.gray900}}></div>
      </div>

      <div className="relative z-10">
        {/* 序号 */}
        <div className="absolute top-5 right-5 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base transition-all duration-300"
             style={{
               background: isHovered ? 'linear-gradient(145deg, ' + THEME.primary + ', ' + THEME.primaryLight + ')' : THEME.gray700,
               color: isHovered ? THEME.white : THEME.gray400,
               transform: isHovered ? 'rotate(6deg) scale(1.1)' : 'rotate(0) scale(1)',
               boxShadow: isHovered ? '0 4px 15px ' + THEME.primary + '40' : 'none'
             }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* 图标 */}
        <div className="relative mb-7">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500"
               style={{
                 background: isHovered ? 'linear-gradient(145deg, ' + THEME.primary + ' 0%, ' + THEME.primaryLight + ' 100%)' : 'linear-gradient(145deg, ' + THEME.primary + '25 0%, ' + THEME.primary + '10 100%)',
                 transform: isHovered ? 'scale(1.15) rotate(5deg)' : 'scale(1) rotate(0)',
                 boxShadow: isHovered ? '0 10px 35px ' + THEME.primary + '50' : '0 4px 15px rgba(0,0,0,0.2)'
               }}>
            <Icon className="w-10 h-10 transition-all duration-300" style={{color: isHovered ? THEME.white : THEME.primary}} />
          </div>
        </div>

        {/* 标题 */}
        <h3 className="text-xl font-semibold text-white mb-4 transition-all duration-300"
            style={{color: isHovered ? THEME.primary : THEME.textPrimary}}>
          {title}
        </h3>
        
        {/* 描述 */}
        <p className="text-gray-400 leading-relaxed transition-colors duration-300"
           style={{color: isHovered ? THEME.gray300 : THEME.gray400}}>
          {description}
        </p>

        {/* 箭头按钮 */}
        <div className={`mt-7 flex items-center gap-2.5 transition-all duration-500 ${isHovered ? 'opacity-100 translate-x-2' : 'opacity-0 translate-x-0'}`}
             style={{color: THEME.primary}}>
          <span className="text-sm font-medium">免费注册</span>
          <ArrowRight className="w-4.5 h-4.5" />
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const features = [
    { icon: Rocket, title: '专线传输', description: '运营商直签专线，全球跨区域低延迟大带宽数据传输，享受专属带宽和稳定性保障' },
    { icon: Share2, title: 'BGP 互联互通', description: '与 100+ 运营商、内容提供商、互联网交换中心直接互联，自动选择最优路由' },
    { icon: Award, title: '优质全球资源', description: '自有 AS 与全球尖端数据资源，覆盖亚洲、欧洲、美洲、非洲与大洋洲主要核心网络' },
    { icon: Server, title: '稳定可靠的骨干网络', description: '全冗余设计，多线路备份，让您面对复杂多变的网络环境安枕无忧' },
    { icon: Code, title: '全平台客户端支持', description: '支持 Windows、Mac、Linux、iOS、Android、路由器等所有主流设备' },
    { icon: Shield, title: '企业级安全保障', description: '256-bit AES 加密，零日志政策，多重安全认证，保护您的数据安全' },
  ];

  return (
    <section className="py-36 relative overflow-hidden" style={{background: THEME.bgDark}}>
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-12" style={{background: 'radial-gradient(circle, ' + THEME.primary + ' 0%, transparent 70%)'}}></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-10" style={{background: 'radial-gradient(circle, ' + THEME.accent + ' 0%, transparent 70%)'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <AnimatedSection animation="slideUp" delay={0}>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8" style={{background: THEME.primary + '15', border: '1px solid ' + THEME.primary + '40'}}>
              <ZapIcon className="w-4.5 h-4.5" style={{color: THEME.primary}} />
              <span className="text-sm font-medium" style={{color: THEME.primary}}>核心优势</span>
            </div>
            <h2 className="text-4xl md:text-5.5xl font-bold text-white mb-6">了解我们的<span style={{color: THEME.primary}}>优势</span></h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed" style={{color: THEME.gray400}}>我们先进的网络基础设施建设可以满足您苛刻的业务需求</p>
          </div>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {features.map((f, i) => <FeatureCard key={i} index={i} {...f} />)}
        </div>
      </div>
    </section>
  );
};

const GlobalNetwork = () => {
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation(0.1);
  const offset = useParallax(0.2);
  
  return (
    <section className="py-36 relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, ' + THEME.bgDark + ' 0%, ' + THEME.gray900 + ' 50%, ' + THEME.primaryDark + ' 100%)'
    }}>
      {/* 视差背景 */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, ' + THEME.primary + '08 0%, transparent 70%)',
        transform: `translateY(${-offset * 0.3}px)`
      }}></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <AnimatedSection animation="slideUp" delay={0}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5.5xl font-bold text-white mb-6">全球<span style={{color: THEME.primary}}>网络覆盖</span></h2>
            <p className="text-gray-400 text-lg" style={{color: THEME.gray400}}>100+ 节点覆盖全球主要国家和地区</p>
          </div>
        </AnimatedSection>
        
        <AnimatedSection animation="slideUp" delay={200}>
          <div className="rounded-3xl p-10 mb-16" style={{
            background: 'linear-gradient(145deg, ' + THEME.gray800 + '80 0%, ' + THEME.gray800 + '40 100%)',
            border: '1px solid ' + THEME.gray700,
            backdropFilter: 'blur(10px)'
          }}>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
              {['美国', '英国', '德国', '日本', '新加坡', '澳大利亚', '加拿大', '法国', '荷兰', '韩国', '香港', '台湾'].map((country, idx) => (
                <div key={idx} 
                  className="group rounded-xl p-6 cursor-pointer transition-all duration-300"
                  style={{
                    background: THEME.gray700 + '40',
                    border: '1px solid ' + THEME.gray600,
                    transform: 'translateY(0)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                    e.currentTarget.style.background = THEME.primary + '20';
                    e.currentTarget.style.borderColor = THEME.primary;
                    e.currentTarget.style.boxShadow = '0 10px 30px ' + THEME.primary + '20';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.background = THEME.gray700 + '40';
                    e.currentTarget.style.borderColor = THEME.gray600;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <Globe className="w-5 h-5" style={{color: THEME.primary}} />
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  </div>
                  <div className="text-white font-medium text-sm">{country}</div>
                  <div className="text-gray-500 text-xs mt-1.5">{Math.floor(Math.random() * 50 + 100)}ms</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
        
        <div ref={statsRef} className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 ${statsVisible ? 'animate-slide-up' : 'opacity-0 translate-y-12'}`}>
          {[{icon: Globe2, label: '覆盖国家', value: '50+'}, {icon: Server, label: '服务器数量', value: '200+'}, {icon: Activity, label: '带宽容量', value: '50Tbps'}, {icon: Users, label: '活跃用户', value: '100万+'}].map((stat, idx) => (
            <div key={idx} 
              className="text-center p-8 rounded-2.5xl transition-all duration-300 cursor-pointer"
              style={{
                background: THEME.gray800 + '60',
                border: '1px solid ' + THEME.gray700
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.background = THEME.primary + '12';
                e.currentTarget.style.borderColor = THEME.primary;
                e.currentTarget.style.boxShadow = '0 15px 35px ' + THEME.primary + '15';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = THEME.gray800 + '60';
                e.currentTarget.style.borderColor = THEME.gray700;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <stat.icon className="w-11 h-11 mx-auto mb-4" style={{color: THEME.primary}} />
              <div className="text-3.5xl font-bold text-white mb-2.5">{stat.value}</div>
              <div className="text-gray-500" style={{color: THEME.gray400}}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingCard = ({ price, period, total, title, featured = false, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div 
      ref={ref}
      className={`relative p-8 rounded-2.5xl transition-all duration-500 cursor-pointer ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-12'}`}
      style={{ 
        transitionDelay: (index * 120) + 'ms',
        background: featured 
          ? 'linear-gradient(145deg, ' + THEME.primary + '18 0%, ' + THEME.primary + '08 100%)' 
          : 'linear-gradient(145deg, ' + THEME.gray800 + ' 0%, ' + THEME.gray800 + ' 60%)',
        border: '2px solid ' + (featured ? THEME.primary : THEME.gray700),
        transform: isHovered ? 'translateY(-12px) scale(1.03)' : 'translateY(0) scale(1)',
        boxShadow: featured 
          ? (isHovered ? '0 25px 50px -12px ' + THEME.primary + '40' : '0 15px 35px -5px ' + THEME.primary + '25')
          : (isHovered ? '0 20px 40px -10px ' + THEME.primary + '20' : '0 4px 20px rgba(0,0,0,0.2)')
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {featured && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="text-white text-sm font-medium px-5 py-2 rounded-full shadow-lg"
                style={{background: 'linear-gradient(135deg, ' + THEME.primary + ', ' + THEME.primaryLight + ')'}}>
            推荐方案
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-5" style={{color: featured ? THEME.primary : THEME.white}}>{price}</h1>
        
        <button className="w-full py-3.5 rounded-xl font-semibold transition-all duration-300"
                style={{
                  background: featured 
                    ? 'linear-gradient(135deg, ' + THEME.primary + ' 0%, ' + THEME.primaryLight + ' 100%)' 
                    : THEME.gray700,
                  color: THEME.white,
                  boxShadow: featured ? '0 4px 15px ' + THEME.primary + '40' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!featured) {
                    e.target.style.background = THEME.primary;
                    e.target.style.transform = 'scale(1.02)';
                    e.target.style.boxShadow = '0 4px 20px ' + THEME.primary + '30';
                  } else {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 8px 25px ' + THEME.primary + '50';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!featured) {
                    e.target.style.background = THEME.gray700;
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'none';
                  } else {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = '0 4px 15px ' + THEME.primary + '40';
                  }
                }}
        >
          加入购物车
        </button>
        
        {period && <p className="text-gray-500 mt-3.5 text-sm" style={{color: THEME.gray400}}>{period}，总计 {total} 元</p>}
      </div>

      {title && (
        <div className="text-center pt-6 border-t" style={{borderColor: featured ? THEME.primary + '50' : THEME.gray700}}>
          <h4 className="font-semibold" style={{color: featured ? THEME.primary : THEME.white}}>{title}</h4>
        </div>
      )}
    </div>
  );
};

const Pricing = () => {
  const plans = [
    { price: '￥ 71/月', period: '共31天', total: '71' }, { price: '￥ 60/月', period: '共186天', total: '360' },
    { price: '￥ 52/月', period: '共372天', total: '624' }, { price: '￥ 117.46/月', period: '共31天', total: '117.46', title: 'Premium Access' },
    { price: '￥ 99/月', period: '共186天', total: '594', title: 'Premium Access' }, { price: '￥ 91.87/月', period: '共372天', total: '1102.44', title: 'Premium Access' },
    { price: '￥ 162/月', title: 'Premium Access', featured: true }, { price: '￥ 45.15/月', title: 'Group Access' },
  ];
  
  return (
    <section className="py-36 relative overflow-hidden" style={{background: THEME.gray900}}>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-10" style={{background: 'radial-gradient(circle, ' + THEME.primary + ' 0%, transparent 70%)'}}></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-10" style={{background: 'radial-gradient(circle, ' + THEME.accent + ' 0%, transparent 70%)'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <AnimatedSection animation="slideUp" delay={0}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8" style={{background: THEME.primary + '15', border: '1px solid ' + THEME.primary + '40'}}>
              <TrendingUp className="w-4.5 h-4.5" style={{color: THEME.primary}} />
              <span className="text-sm font-medium" style={{color: THEME.primary}}>灵活定价</span>
            </div>
            <h2 className="text-4xl md:text-5.5xl font-bold text-white mb-6">选择适合您的<span style={{color: THEME.primary}}>方案</span></h2>
            <p className="text-gray-400 text-lg" style={{color: THEME.gray400}}>灵活的定价方案，满足不同用户的需求</p>
          </div>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p, i) => <PricingCard key={i} index={i} {...p} />)}
        </div>
      </div>
    </section>
  );
};

const ClientDownload = () => {
  const clients = [
    { icon: Monitor, name: 'Windows', desc: 'Windows 7/8/10/11' }, { icon: Monitor, name: 'macOS', desc: 'Intel & Apple Silicon' },
    { icon: Smartphone, name: 'iOS', desc: 'iPhone & iPad' }, { icon: Smartphone, name: 'Android', desc: '手机与平板' },
    { icon: Server, name: 'Linux', desc: 'Ubuntu, Debian, CentOS' }, { icon: Router, name: '路由器', desc: 'OpenWRT, ASUS, Netgear' },
  ];
  
  return (
    <section className="py-36 relative overflow-hidden" style={{background: THEME.bgDark}}>
      <div className="max-w-7xl mx-auto px-4">
        <AnimatedSection animation="slideUp" delay={0}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5.5xl font-bold text-white mb-6">全平台<span style={{color: THEME.primary}}>客户端支持</span></h2>
            <p className="text-gray-400 text-lg" style={{color: THEME.gray400}}>一键下载，随时随地享受高速网络</p>
          </div>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((c, i) => (
            <AnimatedSection key={i} animation="slideUp" delay={i * 100}>
              <div 
                className="group rounded-2.5xl p-8 cursor-pointer transition-all duration-500"
                style={{
                  background: 'linear-gradient(145deg, ' + THEME.gray800 + ' 0%, ' + THEME.gray800 + ' 60%)',
                  border: '1px solid ' + THEME.gray700,
                  transform: 'translateY(0)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                  e.currentTarget.style.background = 'linear-gradient(145deg, ' + THEME.primary + '12 0%, ' + THEME.primary + '05 100%)';
                  e.currentTarget.style.borderColor = THEME.primary;
                  e.currentTarget.style.boxShadow = '0 20px 40px -10px ' + THEME.primary + '30';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.background = 'linear-gradient(145deg, ' + THEME.gray800 + ' 0%, ' + THEME.gray800 + ' 60%)';
                  e.currentTarget.style.borderColor = THEME.gray700;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="flex items-center gap-5">
                  <div className="w-18 h-18 rounded-2xl flex items-center justify-center transition-transform duration-300"
                       style={{
                         background: 'linear-gradient(145deg, ' + THEME.primary + '25 0%, ' + THEME.primary + '10 100%)'
                       }}>
                    <c.icon className="w-9 h-9" style={{color: THEME.primary}} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{c.name}</h3>
                    <p className="text-gray-500 text-sm mt-0.5" style={{color: THEME.gray400}}>{c.desc}</p>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-2.5 transition-opacity duration-300" style={{color: THEME.primary}}>
                  <Download className="w-4.5 h-4.5" />
                  <span className="text-sm font-medium">立即下载</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const products = [
    {name: 'Smart Access', href: '/Info/SmartAccess.aspx'}, 
    {name: 'Premium Access', href: '/Info/PremiumAccess.aspx'}, 
    {name: 'Group Access', href: '/Info/GroupAccess.aspx'}, 
    {name: 'Enterprise Service', href: '/Info/EnterpriseService.aspx'}
  ];
  const prices = [{name: '产品价格', href: '/Price.aspx'}, {name: '免费注册', href: '/SignUp.aspx'}];
  
  return (
    <footer className="pt-20 pb-8" style={{background: THEME.bgDark, borderTop: '1px solid ' + THEME.gray800}}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <img src="/newindex/images/logo-2.png" alt="Nexitally" className="h-12 mb-6" />
            <p className="text-gray-400 mb-6 leading-relaxed" style={{color: THEME.gray400}}>Nexitally 提供全球领先的网络加速服务，帮助用户突破网络限制，畅享全球互联网。</p>
            <a href="mailto:support@nexitally.com" className="hover:opacity-80 transition-opacity flex items-center gap-2.5" style={{color: THEME.primary}}>
              <MailIcon className="w-5 h-5" /> 
              <span style={{color: THEME.gray300}}>support@nexitally.com</span>
            </a>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">产品</h4>
            <ul className="space-y-4">
              {products.map(p => (
                <li key={p.name}>
                  <a href={p.href} className="transition-colors duration-200 hover:text-white" style={{color: THEME.gray400}}>{p.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">价格</h4>
            <ul className="space-y-4">
              {prices.map(p => (
                <li key={p.name}>
                  <a href={p.href} className="transition-colors duration-200 hover:text-white" style={{color: THEME.gray400}}>{p.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">支持</h4>
            <ul className="space-y-4">
              <li><a href="#" className="transition-colors duration-200 hover:text-white" style={{color: THEME.gray400}}>使用帮助</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-white" style={{color: THEME.gray400}}>常见问题</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-white" style={{color: THEME.gray400}}>联系客服</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{borderTop: '1px solid ' + THEME.gray800}}>
          <p className="text-gray-500 text-sm" style={{color: THEME.gray500}}>© {new Date().getFullYear()} Nexitally. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="transition-colors duration-200 hover:text-white" style={{color: THEME.gray500}}>隐私政策</a>
            <a href="#" className="transition-colors duration-200 hover:text-white" style={{color: THEME.gray500}}>服务条款</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App = () => (
  <div className="" style={{background: THEME.bgDark, color: THEME.textPrimary}}>
    <style>{`
      @keyframes float { 
        0%, 100% { transform: translateY(0px); } 
        50% { transform: translateY(-25px); } 
      }
      @keyframes pulse { 
        0%, 100% { opacity: 0.3; transform: scale(1); } 
        50% { opacity: 0.6; transform: scale(1.1); } 
      }
      @keyframes slide-up { 
        from { opacity: 0; transform: translateY(70px); } 
        to { opacity: 1; transform: translateY(0); } 
      }
      @keyframes slide-down { 
        from { opacity: 0; transform: translateY(-20px); } 
        to { opacity: 1; transform: translateY(0); } 
      }
      @keyframes fade-in { 
        from { opacity: 0; } 
        to { opacity: 1; } 
      }
      .animate-slide-up { animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      .animate-slide-down { animation: slide-down 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
    `}</style>
    
    <Navbar />
    
    <main>
      <Hero />
      <Features />
      <GlobalNetwork />
      <Pricing />
      <ClientDownload />
    </main>
    
    <Footer />
  </div>
);

export default App;
