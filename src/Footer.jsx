              <div className="mt-4 flex items-center gap-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Download className="w-4 h-4" />
                <span className="text-sm">立即下载</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const products = [
    { name: 'Smart Access', href: '/Info/SmartAccess.aspx' },
    { name: 'Premium Access', href: '/Info/PremiumAccess.aspx' },
    { name: 'Group Access', href: '/Info/GroupAccess.aspx' },
    { name: 'Enterprise Service', href: '/Info/EnterpriseService.aspx' },
  ];

  const prices = [
    { name: '产品价格', href: '/Price.aspx' },
    { name: '免费注册', href: '/SignUp.aspx' },
  ];

  const supports = [
    { name: '使用帮助', href: '#' },
    { name: '常见问题', href: '#' },
    { name: '联系客服', href: '#' },
  ];

  return (
    <footer className="bg-black border-t border-gray-800 pt-20 pb-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 w-full h-full bg-gradient-to-b from-blue-900/10 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Footer Top */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Logo & About */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img 
                src="/newindex/images/logo-2.png" 
                alt="Nexitally" 
                className="h-12"
              />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Nexitally 提供全球领先的网络加速服务，帮助用户突破网络限制，畅享全球互联网。
            </p>
            <div className="flex gap-4">
              {/* Social Icons would go here */}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">产品</h4>
            <ul className="space-y-4">
              {products.map((product) => (
                <li key={product.name}>
                  <a href={product.href} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Prices */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">价格</h4>
            <ul className="space-y-4">
              {prices.map((price) => (
                <li key={price.name}>
                  <a href={price.href} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {price.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">支持</h4>
            <ul className="space-y-4">
              {supports.map((support) => (
                <li key={support.name}>
                  <a href={support.href} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {support.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Nexitally. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">隐私政策</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">服务条款</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">法律声明</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
          animation-delay: 2s;
        }
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
};

export default App;
