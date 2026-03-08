import { useState, useEffect, useRef } from "react";

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Outfit:wght@300;400;500&display=swap');

    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --cream: #F2EBE0;
      --warm-white: #FAF7F2;
      --linen: #EAE0D2;
      --espresso: #211409;
      --bark: #5C3D1E;
      --terracotta: #B8622A;
      --sage: #7C8C6A;
      --sand: #C9B89A;
      --text: #2E1D0E;
      --muted: #8C7A68;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--warm-white);
      color: var(--text);
      font-family: 'Outfit', sans-serif;
      font-weight: 300;
      overflow-x: hidden;
    }

    body::after {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
      opacity: 0.035;
      pointer-events: none;
      z-index: 9999;
    }

    ::selection { background: var(--terracotta); color: var(--warm-white); }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--linen); }
    ::-webkit-scrollbar-thumb { background: var(--sand); border-radius: 3px; }

    .nav-link {
      font-family: 'Outfit', sans-serif;
      font-size: 13px;
      font-weight: 400;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--bark);
      text-decoration: none;
      cursor: pointer;
      transition: color 0.3s ease;
    }
    .nav-link:hover { color: var(--terracotta); }

    .section-label {
      font-family: 'Outfit', sans-serif;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--terracotta);
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .section-label::before {
      content: '';
      display: block;
      width: 30px;
      height: 1px;
      background: var(--terracotta);
    }

    .display-font {
      font-family: 'Cormorant Garamond', serif;
    }

    .product-card {
      background: var(--cream);
      border: 1px solid var(--sand);
      border-radius: 2px;
      overflow: hidden;
      transition: transform 0.4s ease, box-shadow 0.4s ease;
      cursor: pointer;
    }
    .product-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 50px rgba(33,20,9,0.12);
    }
    .product-card:hover .product-img-overlay {
      opacity: 1;
    }
    .product-img-overlay {
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .btn-primary {
      background: var(--espresso);
      color: var(--warm-white);
      border: none;
      padding: 14px 36px;
      font-family: 'Outfit', sans-serif;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      cursor: pointer;
      transition: background 0.3s ease, transform 0.2s ease;
      border-radius: 1px;
      text-decoration: none;
      display: inline-block;
    }
    .btn-primary:hover {
      background: var(--terracotta);
      transform: translateY(-1px);
    }

    .btn-outline {
      background: transparent;
      color: var(--espresso);
      border: 1px solid var(--espresso);
      padding: 13px 35px;
      font-family: 'Outfit', sans-serif;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.3s ease;
      border-radius: 1px;
      text-decoration: none;
      display: inline-block;
    }
    .btn-outline:hover {
      background: var(--espresso);
      color: var(--warm-white);
      transform: translateY(-1px);
    }

    .stitch-border {
      border: 2px dashed var(--sand);
      border-radius: 2px;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    @keyframes slideRight {
      from { transform: scaleX(0); }
      to { transform: scaleX(1); }
    }
    @keyframes waBounce {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.08); }
    }

    .animate-fadeup { animation: fadeUp 0.8s ease both; }
    .animate-fadein { animation: fadeIn 0.8s ease both; }
    .delay-1 { animation-delay: 0.15s; }
    .delay-2 { animation-delay: 0.3s; }
    .delay-3 { animation-delay: 0.45s; }
    .delay-4 { animation-delay: 0.6s; }

    .wa-btn {
      position: fixed;
      bottom: 28px;
      right: 28px;
      width: 58px;
      height: 58px;
      background: #25D366;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 6px 24px rgba(37,211,102,0.4);
      cursor: pointer;
      z-index: 1000;
      animation: waBounce 2.5s ease-in-out infinite;
      transition: transform 0.2s ease;
      text-decoration: none;
    }
    .wa-btn:hover {
      animation: none;
      transform: scale(1.12);
    }

    input, textarea {
      width: 100%;
      background: transparent;
      border: none;
      border-bottom: 1px solid var(--sand);
      padding: 10px 0;
      font-family: 'Outfit', sans-serif;
      font-size: 14px;
      font-weight: 300;
      color: var(--text);
      outline: none;
      transition: border-color 0.3s ease;
    }
    input::placeholder, textarea::placeholder { color: var(--muted); }
    input:focus, textarea:focus { border-bottom-color: var(--terracotta); }
    textarea { resize: none; }

    .divider-ornament {
      display: flex;
      align-items: center;
      gap: 16px;
      color: var(--sand);
    }
    .divider-ornament::before, .divider-ornament::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--sand);
    }

    @media (max-width: 768px) {
      .hero-title { font-size: clamp(52px, 14vw, 90px) !important; }
      .nav-links { display: none; }
      .products-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
      .about-grid { grid-template-columns: 1fr !important; }
      .contact-grid { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

// SVG Bag Illustrations
const BagSVG = ({ type = "tote", color = "#C9B89A", accent = "#5C3D1E" }) => {
  const bags = {
    tote: (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <rect x="40" y="70" width="120" height="110" rx="4" fill={color} />
        <rect x="40" y="70" width="120" height="110" rx="4" stroke={accent} strokeWidth="1.5" strokeDasharray="4 3"/>
        <path d="M70 70 C70 40 80 30 100 30 C120 30 130 40 130 70" stroke={accent} strokeWidth="3" fill="none" strokeLinecap="round"/>
        <rect x="55" y="100" width="90" height="1.5" fill={accent} opacity="0.3"/>
        <rect x="55" y="115" width="60" height="1.5" fill={accent} opacity="0.3"/>
        <circle cx="100" cy="135" r="5" fill={accent} opacity="0.4"/>
        <rect x="92" y="130" width="16" height="10" rx="2" stroke={accent} strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    shoulder: (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <path d="M145 55 C155 40 165 35 160 55" stroke={accent} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <rect x="50" y="75" width="100" height="105" rx="8" fill={color} />
        <rect x="50" y="75" width="100" height="105" rx="8" stroke={accent} strokeWidth="1.5" strokeDasharray="4 3"/>
        <path d="M50 105 L150 105" stroke={accent} strokeWidth="1" opacity="0.4"/>
        <circle cx="100" cy="140" r="6" fill={accent} opacity="0.5"/>
        <path d="M94 134 L106 134 L108 152 L92 152 Z" fill={accent} opacity="0.3"/>
      </svg>
    ),
    shopper: (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <rect x="25" y="65" width="150" height="120" rx="3" fill={color}/>
        <rect x="25" y="65" width="150" height="120" rx="3" stroke={accent} strokeWidth="1.5" strokeDasharray="5 3"/>
        <path d="M60 65 L60 50 Q60 38 75 38 L125 38 Q140 38 140 50 L140 65" stroke={accent} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <rect x="40" y="100" width="120" height="1.5" fill={accent} opacity="0.3"/>
        <text x="65" y="138" fontFamily="serif" fontSize="22" fill={accent} opacity="0.5" fontStyle="italic">HOXZOL</text>
      </svg>
    ),
    crossbody: (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <rect x="55" y="75" width="90" height="90" rx="6" fill={color}/>
        <rect x="55" y="75" width="90" height="90" rx="6" stroke={accent} strokeWidth="1.5" strokeDasharray="4 3"/>
        <path d="M55 95 Q30 85 25 60" stroke={accent} strokeWidth="2" fill="none" strokeLinecap="round"/>
        <circle cx="25" cy="58" r="5" fill={accent} opacity="0.5"/>
        <rect x="68" y="107" width="64" height="38" rx="3" stroke={accent} strokeWidth="1" fill="none" opacity="0.5"/>
        <path d="M85 107 L85 95 Q85 88 100 88 Q115 88 115 95 L115 107" stroke={accent} strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    market: (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <path d="M30 80 L170 80 L155 175 L45 175 Z" fill={color}/>
        <path d="M30 80 L170 80 L155 175 L45 175 Z" stroke={accent} strokeWidth="1.5" strokeDasharray="5 3" fill="none"/>
        <path d="M70 80 C70 50 80 35 100 35 C120 35 130 50 130 80" stroke={accent} strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M45 120 L155 120" stroke={accent} strokeWidth="1" opacity="0.3"/>
        <path d="M50 140 L150 140" stroke={accent} strokeWidth="1" opacity="0.3"/>
        <path d="M55 160 L145 160" stroke={accent} strokeWidth="1" opacity="0.3"/>
      </svg>
    ),
    weekend: (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <rect x="20" y="80" width="160" height="100" rx="10" fill={color}/>
        <rect x="20" y="80" width="160" height="100" rx="10" stroke={accent} strokeWidth="1.5" strokeDasharray="5 3" fill="none"/>
        <path d="M70 80 L70 65 Q70 55 100 55 Q130 55 130 65 L130 80" stroke={accent} strokeWidth="2.5" fill="none"/>
        <rect x="20" y="95" width="160" height="12" rx="0" fill={accent} opacity="0.12"/>
        <rect x="75" y="117" width="50" height="30" rx="3" stroke={accent} strokeWidth="1.5" fill="none" opacity="0.6"/>
        <path d="M85 117 L85 108 Q85 102 100 102 Q115 102 115 108 L115 117" stroke={accent} strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  };
  return bags[type] || bags.tote;
};

const products = [
  { id: 1, type: "tote", name: "Linen Tote", subtitle: "Günlük kullanım için", color: "#DDD0BB", accent: "#4A2E12", price: "₺450", tag: "Yeni" },
  { id: 2, type: "shoulder", name: "Omuz Çantası", subtitle: "El işi detaylı", color: "#C8B89F", accent: "#3D2010", price: "₺380", tag: "Favori" },
  { id: 3, type: "shopper", name: "Büyük Shopper", subtitle: "Geniş iç hacim", color: "#B8A888", accent: "#52340F", price: "₺520", tag: "" },
  { id: 4, type: "crossbody", name: "Mini Crossbody", subtitle: "Kompakt & şık", color: "#C9B49A", accent: "#6B3C15", price: "₺290", tag: "Çok Satan" },
  { id: 5, type: "market", name: "Market Tote", subtitle: "Dayanıklı bez", color: "#D5C8B0", accent: "#44280A", price: "₺220", tag: "" },
  { id: 6, type: "weekend", name: "Weekend Bag", subtitle: "Hafta sonu yolculuk", color: "#BFA98C", accent: "#3A2008", price: "₺680", tag: "Özel" },
];

// Navbar
const Navbar = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navStyle = {
    position: "fixed",
    top: 0, left: 0, right: 0,
    zIndex: 500,
    transition: "all 0.4s ease",
    background: scrolled ? "rgba(250,247,242,0.95)" : "transparent",
    backdropFilter: scrolled ? "blur(12px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(201,184,154,0.3)" : "1px solid transparent",
  };

  const scroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <div onClick={() => scroll("hero")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32 }}>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 12 L32 12 L29 32 L11 32 Z" fill="#C4714A" opacity="0.9"/>
              <path d="M15 12 C15 6 18 4 20 4 C22 4 25 6 25 12" stroke="#2A1A0E" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <path d="M8 18 L32 18" stroke="#FAF7F2" strokeWidth="1" opacity="0.5"/>
            </svg>
          </div>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, color: "#211409", letterSpacing: "0.08em" }}>
            HOXZOL
          </span>
        </div>

        {/* Nav links */}
        <div className="nav-links" style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {[["koleksiyon", "Koleksiyon"], ["hakkimizda", "Hakkımızda"], ["iletisim", "İletişim"]].map(([id, label]) => (
            <span key={id} className="nav-link" onClick={() => scroll(id)}>{label}</span>
          ))}
          <a
            href="https://wa.me/905556074476?text=Merhaba%2C%20HOXZOL%20çantaları%20hakkında%20bilgi%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: "10px 24px", fontSize: 11 }}
          >
            Sipariş Ver
          </a>
        </div>

        {/* Mobile menu */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 4 }} className="mobile-menu-btn">
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
            <rect width="22" height="2" fill="#2A1A0E"/>
            <rect y="7" width="16" height="2" fill="#2A1A0E"/>
            <rect y="14" width="22" height="2" fill="#2A1A0E"/>
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{ background: "rgba(250,247,242,0.98)", padding: "20px 32px 24px", borderTop: "1px solid var(--sand)", display: "flex", flexDirection: "column", gap: 20 }}>
          {[["koleksiyon", "Koleksiyon"], ["hakkimizda", "Hakkımızda"], ["iletisim", "İletişim"]].map(([id, label]) => (
            <span key={id} className="nav-link" onClick={() => scroll(id)} style={{ fontSize: 14 }}>{label}</span>
          ))}
        </div>
      )}

      <style>{`.mobile-menu-btn { display: none !important; } @media (max-width: 768px) { .nav-links { display: none !important; } .mobile-menu-btn { display: block !important; } }`}</style>
    </nav>
  );
};

// Hero Section
const Hero = () => (
  <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", background: "var(--cream)" }}>
    {/* Background texture lines */}
    <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(201,184,154,0.15) 40px)", pointerEvents: "none" }} />

    {/* Decorative circle */}
    <div style={{ position: "absolute", right: "-10%", top: "50%", transform: "translateY(-50%)", width: "55vw", height: "55vw", maxWidth: 700, maxHeight: 700, borderRadius: "50%", background: "radial-gradient(circle, #E8D9C2 0%, transparent 70%)", pointerEvents: "none", opacity: 0.7 }} />

    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 32px 80px", width: "100%", position: "relative" }}>
      <div style={{ maxWidth: 680 }}>
        <p className="section-label animate-fadeup" style={{ marginBottom: 28 }}>El Yapımı · Özgün Tasarım</p>

        <h1
          className="display-font animate-fadeup delay-1 hero-title"
          style={{ fontSize: "clamp(60px, 10vw, 110px)", fontWeight: 300, lineHeight: 0.92, color: "var(--espresso)", letterSpacing: "-0.02em", marginBottom: 32 }}
        >
          Her çanta<br />
          <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>bir hikaye</em><br />
          anlatır.
        </h1>

        {/* Animated underline */}
        <div className="animate-fadein delay-2" style={{ width: 80, height: 2, background: "var(--terracotta)", marginBottom: 32, transformOrigin: "left", animation: "slideRight 1s 0.6s ease both" }} />

        <p className="animate-fadeup delay-2" style={{ fontSize: 16, lineHeight: 1.8, color: "var(--bark)", marginBottom: 44, maxWidth: 440, fontWeight: 300 }}>
          El emeği ile üretilen, kaliteli malzemelerden tasarlanan HOXZOL çantaları — hem gündelik hem de özel anlara eşlik eder.
        </p>

        <div className="animate-fadeup delay-3" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={() => document.getElementById("koleksiyon")?.scrollIntoView({ behavior: "smooth" })}>
            Koleksiyonu Keşfet
          </button>
          <a
            href="https://wa.me/905556074476?text=Merhaba%2C%20HOXZOL%20çantaları%20hakkında%20bilgi%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            WhatsApp ile Sipariş
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fadeup delay-4" style={{ display: "flex", gap: 40, marginTop: 56, paddingTop: 40, borderTop: "1px solid var(--sand)", flexWrap: "wrap" }}>
          {[["100%", "El Yapımı"], ["Doğal", "Malzeme"], ["Özel", "Tasarım"]].map(([num, label]) => (
            <div key={label}>
              <div className="display-font" style={{ fontSize: 28, fontWeight: 500, color: "var(--espresso)" }}>{num}</div>
              <div style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating bag illustration */}
      <div style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", width: "min(38vw, 380px)", height: "min(38vw, 380px)", animation: "float 5s ease-in-out infinite" }}>
        <BagSVG type="shopper" color="#D4C4A8" accent="#2A1A0E" />
      </div>
    </div>

    {/* Bottom scroll hint */}
    <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "var(--muted)" }}>
      <span style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase" }}>Aşağı Kaydır</span>
      <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, var(--muted), transparent)", animation: "fadeIn 2s 1s ease both" }} />
    </div>
  </section>
);

// Product Gallery
const ProductGallery = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="koleksiyon" style={{ padding: "100px 32px", background: "var(--warm-white)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 60, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
          <div>
            <p className="section-label" style={{ marginBottom: 16 }}>Koleksiyon</p>
            <h2 className="display-font" style={{ fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 400, color: "var(--espresso)", lineHeight: 1.1 }}>
              Seçilmiş<br /><em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>Çanta Serisi</em>
            </h2>
          </div>
          <p style={{ maxWidth: 320, color: "var(--muted)", lineHeight: 1.8, fontSize: 14 }}>
            Her model, özenle seçilmiş malzemelerle ve yılların tecrübesiyle el yapımı olarak üretilmektedir.
          </p>
        </div>

        <div
          className="products-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
        >
          {products.map((p, i) => (
            <div
              key={p.id}
              className="product-card"
              style={{ animationDelay: `${i * 0.1}s` }}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image area */}
              <div style={{ background: p.color, padding: "32px 28px 20px", position: "relative", height: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {p.tag && (
                  <div style={{ position: "absolute", top: 16, left: 16, background: "var(--espresso)", color: "var(--warm-white)", padding: "4px 12px", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    {p.tag}
                  </div>
                )}
                <div style={{ width: 140, height: 140 }}>
                  <BagSVG type={p.type} color={p.color} accent={p.accent} />
                </div>
                {/* Hover overlay */}
                <div
                  className="product-img-overlay"
                  style={{ position: "absolute", inset: 0, background: "rgba(33,20,9,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <a
                    href={`https://wa.me/905556074476?text=Merhaba%2C%20${encodeURIComponent(p.name)}%20hakkında%20sipariş%20vermek%20istiyorum.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ fontSize: 10, padding: "10px 20px" }}
                  >
                    Sipariş Ver
                  </a>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: "20px 24px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h3 className="display-font" style={{ fontSize: 22, fontWeight: 500, color: "var(--espresso)", marginBottom: 4 }}>{p.name}</h3>
                    <p style={{ fontSize: 12, color: "var(--muted)", letterSpacing: "0.1em" }}>{p.subtitle}</p>
                  </div>
                  <span className="display-font" style={{ fontSize: 20, fontWeight: 600, color: "var(--terracotta)" }}>{p.price}</span>
                </div>

                <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(201,184,154,0.4)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    {["Doğal", "El Yapımı"].map(t => (
                      <span key={t} style={{ fontSize: 10, padding: "3px 10px", border: "1px solid var(--sand)", borderRadius: 12, color: "var(--muted)", letterSpacing: "0.1em" }}>{t}</span>
                    ))}
                  </div>
                  <a
                    href={`https://wa.me/905556074476?text=Merhaba%2C%20${encodeURIComponent(p.name)}%20hakkında%20bilgi%20almak%20istiyorum.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--terracotta)", fontSize: 12, fontWeight: 500, textDecoration: "none", letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: 4 }}
                  >
                    Detay →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Band */}
        <div style={{ marginTop: 60, background: "var(--espresso)", padding: "40px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div>
            <p style={{ color: "var(--sand)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>Özel Tasarım</p>
            <h3 className="display-font" style={{ fontSize: 30, fontWeight: 400, color: "var(--warm-white)" }}>Kişiye özel çanta siparişi alıyoruz.</h3>
          </div>
          <a
            href="https://wa.me/905556074476?text=Merhaba%2C%20özel%20tasarım%20çanta%20sipariş%20etmek%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: "var(--terracotta)", color: "var(--warm-white)", padding: "14px 32px", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'Outfit', sans-serif", fontWeight: 500, flexShrink: 0, transition: "opacity 0.2s" }}
          >
            WhatsApp'tan Yaz →
          </a>
        </div>
      </div>
    </section>
  );
};

// About Section
const About = () => (
  <section id="hakkimizda" style={{ padding: "100px 32px", background: "var(--linen)" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

        {/* Visual side */}
        <div style={{ position: "relative" }}>
          {/* Large bag illustration */}
          <div style={{ background: "#D5C9B5", padding: 48, borderRadius: 2, position: "relative" }}>
            <div style={{ width: "100%", height: 360 }}>
              <BagSVG type="tote" color="#C4B49A" accent="#2A1A0E" />
            </div>
            {/* Stitch border overlay */}
            <div className="stitch-border" style={{ position: "absolute", inset: 16, pointerEvents: "none" }} />
          </div>

          {/* Floating card */}
          <div style={{ position: "absolute", bottom: -20, right: -20, background: "var(--warm-white)", padding: "20px 28px", boxShadow: "0 10px 40px rgba(33,20,9,0.12)", minWidth: 180 }}>
            <div className="display-font" style={{ fontSize: 40, fontWeight: 500, color: "var(--terracotta)" }}>5+</div>
            <p style={{ fontSize: 12, color: "var(--muted)", letterSpacing: "0.1em", marginTop: 4 }}>Yıllık deneyim</p>
          </div>

          {/* Top label */}
          <div style={{ position: "absolute", top: -16, left: 24, background: "var(--terracotta)", color: "var(--warm-white)", padding: "8px 20px", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            El Yapımı
          </div>
        </div>

        {/* Text side */}
        <div>
          <p className="section-label" style={{ marginBottom: 20 }}>Hakkımızda</p>
          <h2 className="display-font" style={{ fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 400, color: "var(--espresso)", lineHeight: 1.15, marginBottom: 28 }}>
            Ellerin izi,<br />
            <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>doğanın dokusu</em>
          </h2>

          <p style={{ color: "var(--bark)", lineHeight: 1.9, marginBottom: 20, fontSize: 15 }}>
            HOXZOL, el emeği ve özgün tasarım anlayışıyla doğdu. Her çanta; dikkatli el işçiliği, kaliteli doğal malzemeler ve kişiye özel detaylar içerir.
          </p>
          <p style={{ color: "var(--muted)", lineHeight: 1.9, marginBottom: 36, fontSize: 14 }}>
            Fabrika üretimine değil, emeğe inanıyoruz. Her dikiş, her seçim; çantanızın yıllarca yanınızda olacağını düşünerek yapılıyor.
          </p>

          {/* Values */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
            {[
              { icon: "✦", title: "Doğal Malzeme", desc: "Bez, deri, jüt — doğadan gelen, uzun ömürlü" },
              { icon: "✦", title: "El İşçiliği", desc: "Her çanta biricik, her dikişte bir özen" },
              { icon: "✦", title: "Özel Sipariş", desc: "Renk, boyut, desen — size özel üretim" },
            ].map(v => (
              <div key={v.title} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span style={{ color: "var(--terracotta)", fontSize: 12, marginTop: 2, flexShrink: 0 }}>{v.icon}</span>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 14, color: "var(--espresso)", marginBottom: 3 }}>{v.title}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)" }}>{v.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <button className="btn-primary" onClick={() => document.getElementById("iletisim")?.scrollIntoView({ behavior: "smooth" })}>
            Bizimle İletişime Geç
          </button>
        </div>
      </div>
    </div>
  </section>
);

// Contact Section
const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.message) return;
    const msg = `Merhaba, ben ${form.name}. ${form.message}`;
    window.open(`https://wa.me/905556074476?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="iletisim" style={{ padding: "100px 32px", background: "var(--warm-white)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>

          {/* Left */}
          <div>
            <p className="section-label" style={{ marginBottom: 20 }}>İletişim</p>
            <h2 className="display-font" style={{ fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 400, color: "var(--espresso)", lineHeight: 1.15, marginBottom: 28 }}>
              Sipariş vermek<br />veya sormak için<br />
              <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>buradayız.</em>
            </h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.9, marginBottom: 44, fontSize: 14 }}>
              Özel tasarım talepleri, toplu sipariş ya da genel sorularınız için WhatsApp üzerinden veya aşağıdaki form ile ulaşabilirsiniz.
            </p>

            {/* Contact items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .98h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  ),
                  label: "WhatsApp",
                  value: "+90 500 000 00 00",
                  href: "https://wa.me/905556074476"
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                  ),
                  label: "E-posta",
                  value: "info@hoxzol.com",
                  href: "mailto:info@hoxzol.com"
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  ),
                  label: "Instagram",
                  value: "@hoxzol",
                  href: "https://instagram.com/hoxzol"
                }
              ].map(item => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 16, textDecoration: "none", color: "inherit", padding: "16px 20px", border: "1px solid var(--sand)", transition: "all 0.3s ease" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "var(--terracotta)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "var(--sand)"}
                >
                  <div style={{ color: "var(--terracotta)", flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 3 }}>{item.label}</div>
                    <div style={{ fontSize: 14, color: "var(--espresso)", fontWeight: 400 }}>{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{ background: "var(--cream)", padding: 48 }}>
            <h3 className="display-font" style={{ fontSize: 28, fontWeight: 400, color: "var(--espresso)", marginBottom: 32 }}>Mesaj Gönder</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div>
                <label style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 8 }}>Adınız</label>
                <input
                  type="text"
                  placeholder="Ad Soyad"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 8 }}>E-posta</label>
                <input
                  type="email"
                  placeholder="ornek@mail.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 8 }}>Mesajınız</label>
                <textarea
                  rows={5}
                  placeholder="Sormak istediğiniz veya sipariş detayları..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                />
              </div>

              <button
                className="btn-primary"
                onClick={handleSubmit}
                style={{ width: "100%", textAlign: "center", background: sent ? "var(--sage)" : undefined, transition: "all 0.3s" }}
              >
                {sent ? "✓ WhatsApp'a Yönlendirildi" : "WhatsApp ile Gönder"}
              </button>

              <p style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", lineHeight: 1.6 }}>
                Form gönderildiğinde WhatsApp'a yönlendirileceksiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer style={{ background: "var(--espresso)", padding: "60px 32px 32px", color: "var(--sand)" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40, marginBottom: 48 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width={32} height={32}>
              <path d="M8 12 L32 12 L29 32 L11 32 Z" fill="#C4714A" opacity="0.9"/>
              <path d="M15 12 C15 6 18 4 20 4 C22 4 25 6 25 12" stroke="#FAF7F2" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <path d="M8 18 L32 18" stroke="#FAF7F2" strokeWidth="1" opacity="0.4"/>
            </svg>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, color: "#FAF7F2", letterSpacing: "0.08em" }}>HOXZOL</span>
          </div>
          <p style={{ fontSize: 13, color: "rgba(201,184,154,0.6)", lineHeight: 1.8, maxWidth: 260 }}>El yapımı, özgün tasarım çantalar. Her parça bir özen, her dikişte bir hikaye.</p>
        </div>

        <div style={{ display: "flex", gap: 60, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(201,184,154,0.5)", marginBottom: 16 }}>Bölümler</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[["koleksiyon", "Koleksiyon"], ["hakkimizda", "Hakkımızda"], ["iletisim", "İletişim"]].map(([id, label]) => (
                <span key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })} style={{ fontSize: 13, color: "var(--sand)", cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#FAF7F2"}
                  onMouseLeave={e => e.target.style.color = "var(--sand)"}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(201,184,154,0.5)", marginBottom: 16 }}>İletişim</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="https://wa.me/905556074476" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "var(--sand)", textDecoration: "none" }}>WhatsApp</a>
              <a href="https://instagram.com/hoxzol" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "var(--sand)", textDecoration: "none" }}>Instagram</a>
              <a href="mailto:info@hoxzol.com" style={{ fontSize: 13, color: "var(--sand)", textDecoration: "none" }}>E-posta</a>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(201,184,154,0.15)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <p style={{ fontSize: 12, color: "rgba(201,184,154,0.4)" }}>© 2025 HOXZOL. Tüm hakları saklıdır.</p>
        <p style={{ fontSize: 11, color: "rgba(201,184,154,0.3)", fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif" }}>El yapımı ile sevgiyle üretildi.</p>
      </div>
    </div>
  </footer>
);

// WhatsApp Floating Button
const WAButton = () => (
  <a
    className="wa-btn"
    href="https://wa.me/905556074476?text=Merhaba%2C%20HOXZOL%20çantaları%20hakkında%20bilgi%20almak%20istiyorum."
    target="_blank"
    rel="noopener noreferrer"
    title="WhatsApp ile Sipariş Ver"
  >
    <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  </a>
);

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <main>
        <Hero />
        <ProductGallery />
        <About />
        <Contact />
      </main>
      <Footer />
      <WAButton />
    </>
  );
}