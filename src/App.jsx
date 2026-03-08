import { useState, useEffect } from "react";

// Hook: ekran genişliğini takip et
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
};

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

    html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }

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
    ::-webkit-scrollbar { width: 4px; }
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
      padding: 8px 0;
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
      flex-shrink: 0;
    }

    .display-font { font-family: 'Cormorant Garamond', serif; }

    .product-card {
      background: var(--cream);
      border: 1px solid var(--sand);
      border-radius: 2px;
      overflow: hidden;
      transition: transform 0.4s ease, box-shadow 0.4s ease;
      cursor: pointer;
    }
    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 40px rgba(33,20,9,0.12);
    }
    .product-img-overlay {
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .product-card:hover .product-img-overlay { opacity: 1; }

    @media (hover: none) {
      .product-img-overlay { opacity: 0 !important; }
      .product-card:hover { transform: none; box-shadow: none; }
    }

    .btn-primary {
      background: var(--espresso);
      color: var(--warm-white);
      border: none;
      padding: 14px 32px;
      font-family: 'Outfit', sans-serif;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      cursor: pointer;
      transition: background 0.3s ease;
      border-radius: 1px;
      text-decoration: none;
      display: inline-block;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }
    .btn-primary:hover { background: var(--terracotta); }
    .btn-primary:active { opacity: 0.85; }

    .btn-outline {
      background: transparent;
      color: var(--espresso);
      border: 1.5px solid var(--espresso);
      padding: 13px 31px;
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
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }
    .btn-outline:hover { background: var(--espresso); color: var(--warm-white); }
    .btn-outline:active { opacity: 0.85; }

    .stitch-border {
      border: 2px dashed var(--sand);
      border-radius: 2px;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
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
    @keyframes waBounce {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.08); }
    }

    .animate-fadeup { animation: fadeUp 0.7s ease both; }
    .delay-1 { animation-delay: 0.12s; }
    .delay-2 { animation-delay: 0.24s; }
    .delay-3 { animation-delay: 0.36s; }
    .delay-4 { animation-delay: 0.48s; }

    .wa-btn {
      position: fixed;
      bottom: 24px;
      right: 20px;
      width: 56px;
      height: 56px;
      background: #25D366;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(37,211,102,0.45);
      cursor: pointer;
      z-index: 1000;
      animation: waBounce 2.5s ease-in-out infinite;
      text-decoration: none;
      -webkit-tap-highlight-color: transparent;
    }
    .wa-btn:active { animation: none; transform: scale(0.92); }

    input, textarea {
      width: 100%;
      background: transparent;
      border: none;
      border-bottom: 1px solid var(--sand);
      padding: 10px 0;
      font-family: 'Outfit', sans-serif;
      font-size: 16px;
      font-weight: 300;
      color: var(--text);
      outline: none;
      transition: border-color 0.3s ease;
      border-radius: 0;
      -webkit-appearance: none;
    }
    input::placeholder, textarea::placeholder { color: var(--muted); }
    input:focus, textarea:focus { border-bottom-color: var(--terracotta); }
    textarea { resize: none; }
  `}</style>
);

// SVG Canta Ilustrasyonlari
const BagSVG = ({ type = "tote", color = "#C9B89A", accent = "#5C3D1E" }) => {
  const bags = {
    tote: (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <rect x="40" y="70" width="120" height="110" rx="4" fill={color} />
        <rect x="40" y="70" width="120" height="110" rx="4" stroke={accent} strokeWidth="1.5" strokeDasharray="4 3"/>
        <path d="M70 70 C70 40 80 30 100 30 C120 30 130 40 130 70" stroke={accent} strokeWidth="3" fill="none" strokeLinecap="round"/>
        <rect x="55" y="100" width="90" height="1.5" fill={accent} opacity="0.3"/>
        <rect x="55" y="115" width="60" height="1.5" fill={accent} opacity="0.3"/>
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
      </svg>
    ),
    weekend: (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <rect x="20" y="80" width="160" height="100" rx="10" fill={color}/>
        <rect x="20" y="80" width="160" height="100" rx="10" stroke={accent} strokeWidth="1.5" strokeDasharray="5 3" fill="none"/>
        <path d="M70 80 L70 65 Q70 55 100 55 Q130 55 130 65 L130 80" stroke={accent} strokeWidth="2.5" fill="none"/>
        <rect x="20" y="95" width="160" height="12" rx="0" fill={accent} opacity="0.12"/>
        <rect x="75" y="117" width="50" height="30" rx="3" stroke={accent} strokeWidth="1.5" fill="none" opacity="0.6"/>
      </svg>
    ),
  };
  return bags[type] || bags.tote;
};

const products = [
  { id: 1, type: "tote",      name: "Linen Tote",     subtitle: "Günlük kullanım",  color: "#DDD0BB", accent: "#4A2E12", price: "₺450", tag: "Yeni" },
  { id: 2, type: "shoulder",  name: "Omuz Çantası",   subtitle: "El işi detaylı",   color: "#C8B89F", accent: "#3D2010", price: "₺380", tag: "Favori" },
  { id: 3, type: "shopper",   name: "Büyük Shopper",  subtitle: "Geniş iç hacim",   color: "#B8A888", accent: "#52340F", price: "₺520", tag: "" },
  { id: 4, type: "crossbody", name: "Mini Crossbody", subtitle: "Kompakt & şık",    color: "#C9B49A", accent: "#6B3C15", price: "₺290", tag: "Çok Satan" },
  { id: 5, type: "market",    name: "Market Tote",    subtitle: "Dayanıklı bez",    color: "#D5C8B0", accent: "#44280A", price: "₺220", tag: "" },
  { id: 6, type: "weekend",   name: "Weekend Bag",    subtitle: "Hafta sonu",       color: "#BFA98C", accent: "#3A2008", price: "₺680", tag: "Özel" },
];

// NAVBAR
const Navbar = () => {
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
      background: scrolled || menuOpen ? "rgba(250,247,242,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(201,184,154,0.3)" : "1px solid transparent",
      transition: "all 0.4s ease",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: isMobile ? "0 20px" : "0 32px",
        height: isMobile ? 62 : 72,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div onClick={() => scroll("hero")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, flexShrink: 0 }}>
            <svg viewBox="0 0 40 40" fill="none">
              <path d="M8 12 L32 12 L29 32 L11 32 Z" fill="#C4714A" opacity="0.9"/>
              <path d="M15 12 C15 6 18 4 20 4 C22 4 25 6 25 12" stroke="#2A1A0E" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <path d="M8 18 L32 18" stroke="#FAF7F2" strokeWidth="1" opacity="0.5"/>
            </svg>
          </div>
          <span className="display-font" style={{ fontSize: isMobile ? 20 : 24, fontWeight: 600, color: "#211409", letterSpacing: "0.08em" }}>HOXZOL</span>
        </div>

        {!isMobile && (
          <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {[["koleksiyon","Koleksiyon"],["hakkimizda","Hakkımızda"],["iletisim","İletişim"]].map(([id, lbl]) => (
              <span key={id} className="nav-link" onClick={() => scroll(id)}>{lbl}</span>
            ))}
            <a href="https://wa.me/905000000000?text=Merhaba%2C%20HOXZOL%20çantaları%20hakkında%20bilgi%20almak%20istiyorum."
               target="_blank" rel="noopener noreferrer" className="btn-primary"
               style={{ padding: "10px 22px", fontSize: 11 }}>
              Sipariş Ver
            </a>
          </div>
        )}

        {isMobile && (
          <button onClick={() => setMenuOpen(o => !o)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "10px 4px", display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-end" }}>
            <span style={{ display: "block", width: 22, height: 2, background: "#2A1A0E", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }}/>
            <span style={{ display: "block", width: 16, height: 2, background: "#2A1A0E", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }}/>
            <span style={{ display: "block", width: 22, height: 2, background: "#2A1A0E", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }}/>
          </button>
        )}
      </div>

      {isMobile && menuOpen && (
        <div style={{ background: "rgba(250,247,242,0.98)", borderTop: "1px solid var(--sand)", padding: "8px 20px 20px", display: "flex", flexDirection: "column" }}>
          {[["koleksiyon","Koleksiyon"],["hakkimizda","Hakkımızda"],["iletisim","İletişim"]].map(([id, lbl]) => (
            <span key={id} className="nav-link" onClick={() => scroll(id)}
              style={{ fontSize: 15, padding: "14px 0", borderBottom: "1px solid rgba(201,184,154,0.25)" }}>{lbl}</span>
          ))}
          <a href="https://wa.me/905000000000?text=Merhaba%2C%20HOXZOL%20çantaları%20hakkında%20bilgi%20almak%20istiyorum."
             target="_blank" rel="noopener noreferrer" className="btn-primary"
             style={{ marginTop: 16, textAlign: "center" }}>
            Sipariş Ver
          </a>
        </div>
      )}
    </nav>
  );
};

// HERO
const Hero = () => {
  const isMobile = useIsMobile();
  return (
    <section id="hero" style={{ minHeight: "100svh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", background: "var(--cream)" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(201,184,154,0.12) 40px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: isMobile ? "-30%" : "-8%", top: "50%", transform: "translateY(-50%)", width: isMobile ? "80vw" : "50vw", height: isMobile ? "80vw" : "50vw", borderRadius: "50%", background: "radial-gradient(circle, #E8D9C2 0%, transparent 70%)", pointerEvents: "none", opacity: 0.6 }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "100px 20px 80px" : "120px 32px 80px", width: "100%", position: "relative" }}>
        <div style={{ maxWidth: isMobile ? "100%" : 640 }}>
          <p className="section-label animate-fadeup" style={{ marginBottom: 24 }}>El Yapımı · Özgün Tasarım</p>

          <h1 className="display-font animate-fadeup delay-1"
            style={{ fontSize: isMobile ? "clamp(46px,13vw,68px)" : "clamp(60px,9vw,110px)", fontWeight: 300, lineHeight: 0.95, color: "var(--espresso)", letterSpacing: "-0.02em", marginBottom: 28 }}>
            Her çanta<br/>
            <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>bir hikaye</em><br/>
            anlatır.
          </h1>

          <div className="animate-fadeup delay-1" style={{ width: 60, height: 2, background: "var(--terracotta)", marginBottom: 28 }} />

          <p className="animate-fadeup delay-2" style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.8, color: "var(--bark)", marginBottom: 36, maxWidth: 420 }}>
            El emeği ile üretilen, kaliteli malzemelerden tasarlanan HOXZOL çantaları — hem gündelik hem özel anlara eşlik eder.
          </p>

          <div className="animate-fadeup delay-3" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn-primary"
              onClick={() => document.getElementById("koleksiyon")?.scrollIntoView({ behavior: "smooth" })}
              style={{ flex: isMobile ? "1 1 auto" : "none", textAlign: "center", padding: "14px 28px" }}>
              Koleksiyonu Gör
            </button>
            <a href="https://wa.me/905000000000?text=Merhaba%2C%20HOXZOL%20çantaları%20hakkında%20bilgi%20almak%20istiyorum."
               target="_blank" rel="noopener noreferrer" className="btn-outline"
               style={{ flex: isMobile ? "1 1 auto" : "none", textAlign: "center", padding: "13px 27px" }}>
              WhatsApp Sipariş
            </a>
          </div>

          <div className="animate-fadeup delay-4" style={{ display: "flex", gap: isMobile ? 24 : 40, marginTop: 48, paddingTop: 36, borderTop: "1px solid var(--sand)", flexWrap: "wrap" }}>
            {[["100%","El Yapımı"],["Doğal","Malzeme"],["Özel","Tasarım"]].map(([num, lbl]) => (
              <div key={lbl}>
                <div className="display-font" style={{ fontSize: isMobile ? 24 : 30, fontWeight: 500, color: "var(--espresso)" }}>{num}</div>
                <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginTop: 3 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {!isMobile && (
          <div style={{ position: "absolute", right: "4%", top: "50%", transform: "translateY(-50%)", width: "min(36vw, 360px)", height: "min(36vw, 360px)", animation: "float 5s ease-in-out infinite" }}>
            <BagSVG type="shopper" color="#D4C4A8" accent="#2A1A0E" />
          </div>
        )}
      </div>

      <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "var(--muted)" }}>
        <span style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase" }}>Aşağı Kaydır</span>
        <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, var(--muted), transparent)" }} />
      </div>
    </section>
  );
};

// URUN GALERİSİ
const ProductGallery = () => {
  const isMobile = useIsMobile();

  return (
    <section id="koleksiyon" style={{ padding: isMobile ? "72px 20px" : "100px 32px", background: "var(--warm-white)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: isMobile ? 32 : 52 }}>
          <p className="section-label" style={{ marginBottom: 14 }}>Koleksiyon</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
            <h2 className="display-font" style={{ fontSize: isMobile ? "clamp(32px,10vw,48px)" : "clamp(36px,5vw,58px)", fontWeight: 400, color: "var(--espresso)", lineHeight: 1.1 }}>
              Seçilmiş <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>Çanta Serisi</em>
            </h2>
            {!isMobile && <p style={{ maxWidth: 300, color: "var(--muted)", lineHeight: 1.8, fontSize: 13 }}>Her model özenle seçilmiş malzemelerle el yapımı olarak üretilmektedir.</p>}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: isMobile ? 12 : 24 }}>
          {products.map((p) => (
            <div key={p.id} className="product-card">
              <div style={{ background: p.color, padding: isMobile ? "20px 16px 12px" : "28px 24px 16px", position: "relative", height: isMobile ? 160 : 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {p.tag && (
                  <div style={{ position: "absolute", top: 10, left: 10, background: "var(--espresso)", color: "var(--warm-white)", padding: "3px 9px", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    {p.tag}
                  </div>
                )}
                <div style={{ width: isMobile ? 90 : 130, height: isMobile ? 90 : 130 }}>
                  <BagSVG type={p.type} color={p.color} accent={p.accent} />
                </div>
                {!isMobile && (
                  <div className="product-img-overlay" style={{ position: "absolute", inset: 0, background: "rgba(33,20,9,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <a href={`https://wa.me/905000000000?text=Merhaba%2C%20${encodeURIComponent(p.name)}%20için%20sipariş%20vermek%20istiyorum.`}
                       target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 10, padding: "9px 18px" }}>
                      Sipariş Ver
                    </a>
                  </div>
                )}
              </div>

              <div style={{ padding: isMobile ? "12px 14px 14px" : "18px 22px 22px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                  <div style={{ minWidth: 0 }}>
                    <h3 className="display-font" style={{ fontSize: isMobile ? 16 : 21, fontWeight: 500, color: "var(--espresso)", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</h3>
                    {!isMobile && <p style={{ fontSize: 11, color: "var(--muted)" }}>{p.subtitle}</p>}
                  </div>
                  <span className="display-font" style={{ fontSize: isMobile ? 15 : 20, fontWeight: 600, color: "var(--terracotta)", flexShrink: 0 }}>{p.price}</span>
                </div>

                {isMobile ? (
                  <a href={`https://wa.me/905000000000?text=Merhaba%2C%20${encodeURIComponent(p.name)}%20için%20sipariş%20vermek%20istiyorum.`}
                     target="_blank" rel="noopener noreferrer"
                     style={{ display: "block", marginTop: 10, background: "var(--espresso)", color: "var(--warm-white)", textAlign: "center", textDecoration: "none", padding: "9px 0", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}>
                    Sipariş Ver
                  </a>
                ) : (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(201,184,154,0.4)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", gap: 5 }}>
                      {["Doğal","El Yapımı"].map(t => (
                        <span key={t} style={{ fontSize: 9, padding: "3px 8px", border: "1px solid var(--sand)", borderRadius: 12, color: "var(--muted)" }}>{t}</span>
                      ))}
                    </div>
                    <a href={`https://wa.me/905000000000?text=Merhaba%2C%20${encodeURIComponent(p.name)}%20hakkında%20bilgi%20almak%20istiyorum.`}
                       target="_blank" rel="noopener noreferrer"
                       style={{ color: "var(--terracotta)", fontSize: 12, fontWeight: 500, textDecoration: "none" }}>
                      Detay →
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: isMobile ? 28 : 48, background: "var(--espresso)", padding: isMobile ? "24px 20px" : "36px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ color: "var(--sand)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>Özel Tasarım</p>
            <h3 className="display-font" style={{ fontSize: isMobile ? 20 : 28, fontWeight: 400, color: "var(--warm-white)" }}>Kişiye özel çanta siparişi.</h3>
          </div>
          <a href="https://wa.me/905000000000?text=Merhaba%2C%20özel%20tasarım%20çanta%20sipariş%20etmek%20istiyorum."
             target="_blank" rel="noopener noreferrer"
             style={{ background: "var(--terracotta)", color: "var(--warm-white)", padding: "12px 22px", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'Outfit', sans-serif", fontWeight: 500, flexShrink: 0 }}>
            WhatsApp'tan Yaz →
          </a>
        </div>
      </div>
    </section>
  );
};

// HAKKIMIZDA
const About = () => {
  const isMobile = useIsMobile();
  return (
    <section id="hakkimizda" style={{ padding: isMobile ? "72px 20px" : "100px 32px", background: "var(--linen)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <div style={{ background: "#D5C9B5", padding: isMobile ? 28 : 44, borderRadius: 2, position: "relative" }}>
              <div style={{ width: "100%", height: isMobile ? 240 : 330 }}>
                <BagSVG type="tote" color="#C4B49A" accent="#2A1A0E" />
              </div>
              <div className="stitch-border" style={{ position: "absolute", inset: 12, pointerEvents: "none" }} />
            </div>
            <div style={{ position: "absolute", bottom: -14, right: isMobile ? 12 : -14, background: "var(--warm-white)", padding: "14px 20px", boxShadow: "0 8px 28px rgba(33,20,9,0.12)", minWidth: 130 }}>
              <div className="display-font" style={{ fontSize: 32, fontWeight: 500, color: "var(--terracotta)" }}>5+</div>
              <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>Yıllık deneyim</p>
            </div>
            <div style={{ position: "absolute", top: -14, left: 20, background: "var(--terracotta)", color: "var(--warm-white)", padding: "6px 14px", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              El Yapımı
            </div>
          </div>

          <div style={{ paddingTop: isMobile ? 20 : 0 }}>
            <p className="section-label" style={{ marginBottom: 18 }}>Hakkımızda</p>
            <h2 className="display-font" style={{ fontSize: isMobile ? "clamp(30px,9vw,46px)" : "clamp(36px,4vw,52px)", fontWeight: 400, color: "var(--espresso)", lineHeight: 1.15, marginBottom: 22 }}>
              Ellerin izi,<br/>
              <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>doğanın dokusu</em>
            </h2>
            <p style={{ color: "var(--bark)", lineHeight: 1.9, marginBottom: 14, fontSize: 14 }}>
              HOXZOL, el emeği ve özgün tasarım anlayışıyla doğdu. Her çanta; dikkatli el işçiliği, kaliteli doğal malzemeler ve kişiye özel detaylar içerir.
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.9, marginBottom: 28, fontSize: 13 }}>
              Fabrika üretimine değil emeğe inanıyoruz. Her dikiş, yıllarca yanınızda olacağı düşünülerek yapılıyor.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
              {[
                { icon: "✦", title: "Doğal Malzeme", desc: "Bez, deri, jüt — uzun ömürlü" },
                { icon: "✦", title: "El İşçiliği",   desc: "Her çanta biricik, her dikişte özen" },
                { icon: "✦", title: "Özel Sipariş",  desc: "Renk, boyut, desen — size özel" },
              ].map(v => (
                <div key={v.title} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--terracotta)", fontSize: 11, marginTop: 3, flexShrink: 0 }}>{v.icon}</span>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14, color: "var(--espresso)", marginBottom: 1 }}>{v.title}</div>
                    <div style={{ fontSize: 13, color: "var(--muted)" }}>{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-primary"
              onClick={() => document.getElementById("iletisim")?.scrollIntoView({ behavior: "smooth" })}
              style={{ width: isMobile ? "100%" : "auto", textAlign: "center", padding: "14px 32px" }}>
              İletişime Geç
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ILETISIM
const Contact = () => {
  const isMobile = useIsMobile();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.message) return;
    const msg = `Merhaba, ben ${form.name}. ${form.message}`;
    window.open(`https://wa.me/905000000000?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="iletisim" style={{ padding: isMobile ? "72px 20px" : "100px 32px", background: "var(--warm-white)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80 }}>
          <div>
            <p className="section-label" style={{ marginBottom: 18 }}>İletişim</p>
            <h2 className="display-font" style={{ fontSize: isMobile ? "clamp(30px,9vw,46px)" : "clamp(36px,4vw,52px)", fontWeight: 400, color: "var(--espresso)", lineHeight: 1.15, marginBottom: 18 }}>
              Sipariş ya da soru için<br/>
              <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>buradayız.</em>
            </h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.9, marginBottom: 28, fontSize: 13 }}>
              Özel tasarım, toplu sipariş ya da sorularınız için WhatsApp veya formu kullanabilirsiniz.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .98h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>, label: "WhatsApp", value: "+90 500 000 00 00", href: "https://wa.me/905000000000" },
                { icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label: "E-posta", value: "info@hoxzol.com", href: "mailto:info@hoxzol.com" },
                { icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>, label: "Instagram", value: "@hoxzol", href: "https://instagram.com/hoxzol" },
              ].map(item => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                   style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none", color: "inherit", padding: "13px 16px", border: "1px solid var(--sand)" }}>
                  <div style={{ color: "var(--terracotta)", flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 2 }}>{item.label}</div>
                    <div style={{ fontSize: 13, color: "var(--espresso)" }}>{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div style={{ background: "var(--cream)", padding: isMobile ? 22 : 44 }}>
            <h3 className="display-font" style={{ fontSize: 24, fontWeight: 400, color: "var(--espresso)", marginBottom: 26 }}>Mesaj Gönder</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {[
                { key: "name",  label: "Adınız",  type: "text",  ph: "Ad Soyad" },
                { key: "email", label: "E-posta", type: "email", ph: "ornek@mail.com" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 6 }}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 6 }}>Mesajınız</label>
                <textarea rows={4} placeholder="Sipariş detayları veya sorunuz..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              </div>
              <button className="btn-primary" onClick={handleSubmit}
                style={{ width: "100%", textAlign: "center", padding: "15px 0", background: sent ? "var(--sage)" : undefined, transition: "background 0.3s" }}>
                {sent ? "✓ WhatsApp'a Yönlendirildi" : "WhatsApp ile Gönder"}
              </button>
              <p style={{ fontSize: 11, color: "var(--muted)", textAlign: "center" }}>Form gönderildiğinde WhatsApp'a yönlendirileceksiniz.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// FOOTER
const Footer = () => {
  const isMobile = useIsMobile();
  return (
    <footer style={{ background: "var(--espresso)", padding: isMobile ? "44px 20px 24px" : "56px 32px 28px", color: "var(--sand)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr auto", gap: isMobile ? 32 : 60, marginBottom: 36 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <svg viewBox="0 0 40 40" fill="none" width={26} height={26}>
                <path d="M8 12 L32 12 L29 32 L11 32 Z" fill="#C4714A" opacity="0.9"/>
                <path d="M15 12 C15 6 18 4 20 4 C22 4 25 6 25 12" stroke="#FAF7F2" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <path d="M8 18 L32 18" stroke="#FAF7F2" strokeWidth="1" opacity="0.4"/>
              </svg>
              <span className="display-font" style={{ fontSize: 20, fontWeight: 600, color: "#FAF7F2", letterSpacing: "0.08em" }}>HOXZOL</span>
            </div>
            <p style={{ fontSize: 12, color: "rgba(201,184,154,0.6)", lineHeight: 1.8, maxWidth: 240 }}>El yapımı, özgün tasarım çantalar. Her parçada bir özen.</p>
          </div>

          <div style={{ display: "flex", gap: isMobile ? 36 : 52, flexWrap: "wrap" }}>
            <div>
              <p style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(201,184,154,0.4)", marginBottom: 12 }}>Bölümler</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {[["koleksiyon","Koleksiyon"],["hakkimizda","Hakkımızda"],["iletisim","İletişim"]].map(([id, lbl]) => (
                  <span key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                    style={{ fontSize: 12, color: "var(--sand)", cursor: "pointer" }}>{lbl}</span>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(201,184,154,0.4)", marginBottom: 12 }}>İletişim</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                <a href="https://wa.me/905000000000" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "var(--sand)", textDecoration: "none" }}>WhatsApp</a>
                <a href="https://instagram.com/hoxzol" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "var(--sand)", textDecoration: "none" }}>Instagram</a>
                <a href="mailto:info@hoxzol.com" style={{ fontSize: 12, color: "var(--sand)", textDecoration: "none" }}>E-posta</a>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(201,184,154,0.15)", paddingTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <p style={{ fontSize: 11, color: "rgba(201,184,154,0.4)" }}>© 2025 HOXZOL. Tüm hakları saklıdır.</p>
          <p className="display-font" style={{ fontSize: 12, color: "rgba(201,184,154,0.3)", fontStyle: "italic" }}>El yapımı ile sevgiyle üretildi.</p>
        </div>
      </div>
    </footer>
  );
};

// WHATSAPP BUTONU
const WAButton = () => (
  <a className="wa-btn"
     href="https://wa.me/905000000000?text=Merhaba%2C%20HOXZOL%20çantaları%20hakkında%20bilgi%20almak%20istiyorum."
     target="_blank" rel="noopener noreferrer">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
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
