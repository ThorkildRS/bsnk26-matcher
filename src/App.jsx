import { useState, useRef, useCallback, useEffect } from "react";

const BASE = import.meta.env.BASE_URL;

const BRAND = {
  dark: "#1a1a2e",
  accent: "#3877f0",
  accentDark: "#3877f0",
  green: "#2dc653",
  red: "#e63946",
  bg: "#ffffff",
  muted: "#6b7280",
  border: "#e5e7eb",
  logo: `${BASE}speakers/bsnk-logo.png`,
};

// Bytt ut bildene i /public/speakers/ med egne bilder (samme filnavn, sirkulært format anbefalt)
const TALKS = [
  { id: 1, title: "Skap verdi med BIM på tvers av porteføljen din", speaker: "Astrid Grøntved Starck", org: "Implement Consulting Group", time: "10:30", part: "DEL 1", tags: ["BIM", "Strategi", "Digitalt samarbeid"], emoji: "🎯", image: `${BASE}speakers/1.png`, desc: "Fra digitale verktøy til helhetlig sammenheng — jobbe strategisk med digitale verktøy på tvers av partnere og prosjektporteføljer." },
  { id: 2, title: "Merverdi av bærekraft i eiendom", speaker: "Magnus Meland Røed", org: "DNB", time: "10:50", part: "DEL 1", tags: ["Bærekraft", "Finans", "Eiendom"], emoji: "🌱", image: `${BASE}speakers/2.jpg`, desc: "Hva kan gi mulig merverdi og redusere risiko i bygg? DNB deler perspektiver i forbindelse med finansiering." },
  { id: 3, title: "Strategisk eiendomsforvaltning – digitalisering som beslutningsstøtte", speaker: "Anne Charlotte Moe", org: "Helse Sør-Øst", time: "11:10", part: "DEL 1", tags: ["Helse", "FM", "Beslutningsstøtte"], emoji: "🏥", image: `${BASE}speakers/3.jpg`, desc: "Økt digitalisering av eiendomsforvaltningen — felles FM-system for drift og forvaltning av eiendommer." },
  { id: 4, title: "Agentic AI in Construction", speaker: "Henri Pitkänen & Kim Nyberg", org: "Trimble", time: "13:00", part: "DEL 2", tags: ["AI", "Automatisering", "MCP"], emoji: "🤖", image: `${BASE}speakers/4-1.png`, image2: `${BASE}speakers/4-2.png`, desc: "Fra passive AI-assistenter til Agentic AI — autonome, måldrevne arbeidsflyter med Tekla Model Assistant." },
  { id: 5, title: "MCP i byggebransjen – praktisk bruk i trygge rammer", speaker: "Jonn Øyvind Hosum", org: "Asplan Viak", time: "13:15", part: "DEL 2", tags: ["MCP", "AI", "Datasikkerhet"], emoji: "🔐", image: `${BASE}speakers/john.png`, desc: "Hvordan nye standarder som MCP muliggjør bruk av KI i fagapplikasjoner uten å gi slipp på kontroll." },
  { id: 6, title: "åpenBIM på skinner", speaker: "Daniel Gomsrud", org: "Bane NOR", time: "13:30", part: "DEL 2", tags: ["IFC 4.3", "IDS", "Infrastruktur"], emoji: "🚂", image: `${BASE}speakers/daniel.jpg`, desc: "BaneNORs syn på BIM og informasjonshåndtering. Dypdykk i krav med eksempler — IFC 4.3, IDS og BCF." },
  { id: 7, title: "AI og IFC som grunnlag for automatisert prosjektering", speaker: "Per Ström", org: "Multiconsult", time: "14:05", part: "DEL 2", tags: ["AI", "IFC", "Prosjektering"], emoji: "⚡", image: `${BASE}speakers/perstrom.jpg`, desc: "IFC-modeller som strukturert datagrunnlag for AI-baserte analyser og automatisert plassering av tekniske installasjoner." },
  { id: 8, title: "Datasikkerhet og internasjonal datalagring", speaker: "Astrid Stenersen & Kine E. Helgeneseth", org: "Advokatfirmaet Selmer", time: "14:25", part: "DEL 2", tags: ["Juss", "Datasikkerhet", "Sky"], emoji: "⚖️", image: `${BASE}speakers/astrid.png`, image2: `${BASE}speakers/KineE selmer.jpg`, desc: "Utfordringer ved BIM-plattformer og skytjenester — risiko for at utenlandske myndigheter kan kreve utlevering av data." },
  { id: 9, title: "Åpen BIM i praksis: Gartnerløkka-prosjektet", speaker: "Marius Drevland & Mića Gavrić", org: "Rambøll", time: "14:45", part: "DEL 2", tags: ["åpenBIM", "IDS", "Vegprosjekt"], emoji: "🛣️", image: `${BASE}speakers/Marius Drevland.jpg`, image2: `${BASE}speakers/Mića Gavrić.jpg`, desc: "BIMbot-flyt med åpne standarder i E18/E39 Gartnerløkka. Bedre flyt, høyere datakvalitet og raskere beslutninger." },
  { id: 10, title: "IFC, bSDD and GS1 – how it all fits together", speaker: "Artur Tomczak & Knut Mathiesen", org: "buildingSMART Int. / GS1", time: "15:20", part: "DEL 3", tags: ["IFC", "Standarder", "Sporbarhet"], emoji: "🔗", image: `${BASE}speakers/artur.png`, image2: `${BASE}speakers/knut.mat.jpg`, desc: "GS1-identifikatorer koblet med IFC og bSDD — digital tråd for produkt- og anleggsinformasjon." },
  { id: 11, title: "En entreprenørs sømløse informasjonsflyt", speaker: "Egil Berg & Knut Jøssang", org: "NCC / Pipelife Norge", time: "15:40", part: "DEL 3", tags: ["Entreprenør", "Samhandling", "Effektivisering"], emoji: "🏗️", image: `${BASE}speakers/Egilberg.jpg`, image2: `${BASE}speakers/knut.png`, desc: "Sømløs informasjonsflyt for mer effektive prosesser, bedre beslutninger og tryggere prosjektgjennomføring." },
  { id: 12, title: "Prosjektering av bruer med BIM", speaker: "Gaute Nordbotten", org: "Statens vegvesen", time: "16:00", part: "DEL 3", tags: ["Bru", "BIM", "Regelverk"], emoji: "🌉", image: `${BASE}speakers/GauteNordbotten_trykk (1).jpg`, desc: "9 år med BIM-modeller til prosjekteringskontroll — erfaringer og arbeid knyttet til regelverk." },
  { id: 13, title: "Bruk av KI og gamification", speaker: "Berna Shalci & Sofie I. Nicolaisen", org: "Newbringer / Standard Norge", time: "16:35", part: "DEL 4", tags: ["AI", "Gamification", "Standarder"], emoji: "🎮", image: `${BASE}speakers/berna.jpg`, image2: `${BASE}speakers/Sofie.png`, desc: "Utforsk hvordan kunstig intelligens og gamification kan brukes i BAE-bransjen." },
  { id: 14, title: "BIM/digitalisering for gjenoppbygging av Ukraina", speaker: "Katrin Johannesdottir", org: "VDC Infra", time: "16:55", part: "DEL 4", tags: ["Ukraina", "BIM", "Gjenoppbygging"], emoji: "💙", image: `${BASE}speakers/katrin.jpg`, desc: "Hvordan BIM og digitalisering kan bidra til gjenoppbygging etter krig." }
];

function SwipeCard({ talk, onSwipe, style, isTop }) {
  const cardRef = useRef(null);
  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [leaving, setLeaving] = useState(null);

  const handleStart = useCallback((clientX) => {
    if (!isTop) return;
    isDragging.current = true;
    startX.current = clientX;
    currentX.current = clientX;
  }, [isTop]);

  const handleMove = useCallback((clientX) => {
    if (!isDragging.current) return;
    currentX.current = clientX;
    setDragOffset(currentX.current - startX.current);
  }, []);

  const handleEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = currentX.current - startX.current;
    if (Math.abs(diff) > 100) {
      setLeaving(diff > 0 ? "right" : "left");
      setTimeout(() => onSwipe(diff > 0), 350);
    } else {
      setDragOffset(0);
    }
  }, [onSwipe]);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || !isTop) return;
    const ts = (e) => handleStart(e.touches[0].clientX);
    const tm = (e) => { e.preventDefault(); handleMove(e.touches[0].clientX); };
    const te = () => handleEnd();
    const md = (e) => handleStart(e.clientX);
    const mm = (e) => handleMove(e.clientX);
    const mu = () => handleEnd();
    el.addEventListener("touchstart", ts, { passive: false });
    el.addEventListener("touchmove", tm, { passive: false });
    el.addEventListener("touchend", te);
    el.addEventListener("mousedown", md);
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup", mu);
    return () => {
      el.removeEventListener("touchstart", ts);
      el.removeEventListener("touchmove", tm);
      el.removeEventListener("touchend", te);
      el.removeEventListener("mousedown", md);
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseup", mu);
    };
  }, [isTop, handleStart, handleMove, handleEnd]);

  const rotation = dragOffset * 0.06;
  let transform = `translateX(${dragOffset}px) rotate(${rotation}deg)`;
  let trans = isDragging.current ? "none" : "transform 0.35s cubic-bezier(.4,1.6,.6,1)";
  if (leaving === "right") { transform = "translateX(120vw) rotate(25deg)"; trans = "transform 0.35s ease-in"; }
  else if (leaving === "left") { transform = "translateX(-120vw) rotate(-25deg)"; trans = "transform 0.35s ease-in"; }

  const likeOp = Math.min(1, Math.max(0, dragOffset / 120));
  const nopeOp = Math.min(1, Math.max(0, -dragOffset / 120));

  return (
    <div ref={cardRef} style={{
      position: "absolute", width: "100%", height: "100%",
      transform, transition: trans,
      cursor: isTop ? "grab" : "default",
      userSelect: "none", WebkitUserSelect: "none",
      zIndex: isTop ? 10 : 5, ...style,
    }}>
      <div style={{
        width: "100%", height: "100%", borderRadius: 20,
        background: "#fff", border: `1px solid ${BRAND.border}`,
        boxShadow: isTop ? "0 20px 50px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)" : "0 6px 20px rgba(0,0,0,0.04)",
        overflow: "hidden", display: "flex", flexDirection: "column", position: "relative",
      }}>
        {/* Stamps */}
        <div style={{
          position: "absolute", top: 24, left: 20, zIndex: 20,
          border: `3px solid ${BRAND.green}`, borderRadius: 8,
          padding: "3px 14px", color: BRAND.green,
          fontFamily: "'DM Sans', sans-serif", fontSize: 24, fontWeight: 700,
          letterSpacing: 2, transform: "rotate(-12deg)",
          opacity: likeOp, pointerEvents: "none",
        }}>JA!</div>
        <div style={{
          position: "absolute", top: 24, right: 20, zIndex: 20,
          border: `3px solid ${BRAND.red}`, borderRadius: 8,
          padding: "3px 14px", color: BRAND.red,
          fontFamily: "'DM Sans', sans-serif", fontSize: 24, fontWeight: 700,
          letterSpacing: 2, transform: "rotate(12deg)",
          opacity: nopeOp, pointerEvents: "none",
        }}>NEI</div>

        {/* Top accent */}
        <div style={{ height: 5, background: `linear-gradient(90deg, ${BRAND.accentDark}, ${BRAND.accent})`, flexShrink: 0 }} />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "28px 26px 24px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span style={{
                background: `${BRAND.accent}14`, color: BRAND.accentDark,
                borderRadius: 8, padding: "4px 12px", fontSize: 12, fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif", letterSpacing: 0.5,
              }}>{talk.part}</span>
              <span style={{ color: BRAND.muted, fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>kl. {talk.time}</span>
            </div>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 23, fontWeight: 700,
              lineHeight: 1.25, color: BRAND.dark, margin: 0, marginBottom: 14,
            }}>{talk.title}</h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, lineHeight: 1.65,
              color: BRAND.muted, margin: 0,
            }}>{talk.desc}</p>
          </div>

          <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
              {talk.tags.map((tag) => (
                <span key={tag} style={{
                  background: "#f1f5f9", borderRadius: 20, padding: "5px 13px",
                  fontSize: 12, color: "#475569",
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                }}>{tag}</span>
              ))}
            </div>
            <div style={{ borderTop: `1px solid ${BRAND.border}`, paddingTop: 16, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ position: "relative", width: talk.image2 ? 126 : 72, height: 72, flexShrink: 0 }}>
                <img src={talk.image} alt={talk.speaker} style={{
                  width: 72, height: 72, borderRadius: 36,
                  objectFit: "cover", position: "absolute", left: 0, top: 0,
                  background: `linear-gradient(135deg, ${BRAND.accentDark}, ${BRAND.accent})`,
                  border: "3px solid #fff", zIndex: 2,
                }} />
                {talk.image2 && <img src={talk.image2} alt={talk.speaker} style={{
                  width: 72, height: 72, borderRadius: 36,
                  objectFit: "cover", position: "absolute", left: 56, top: 0,
                  background: `linear-gradient(135deg, ${BRAND.accentDark}, ${BRAND.accent})`,
                  border: "3px solid #fff", zIndex: 1,
                }} />}
              </div>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: BRAND.dark }}>{talk.speaker}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: BRAND.muted, marginTop: 1 }}>{talk.org}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultsView({ liked, onReset }) {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);

  const SHARE_URL = "https://bsnk.no";
  const shareText = `Jeg skal delta på #BSNK26! 🎯 Sjekk ut programmet og finn dine favorittforedrag:\n${SHARE_URL}`;



  const handleSharePlatform = (platform) => {
    const encoded = encodeURIComponent(shareText);
    const urls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SHARE_URL)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}&quote=${encoded}`,
      x: `https://x.com/intent/tweet?text=${encoded}`,
    };
    window.open(urls[platform], "_blank", "noopener,noreferrer");
  };

  return (
    <div style={{
      minHeight: "100vh", background: BRAND.bg, padding: "40px 20px",
      display: "flex", flexDirection: "column", alignItems: "center",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{
        maxWidth: 440, width: "100%",
        opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.6s cubic-bezier(.4,0,.2,1)",
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <img src={BRAND.logo} alt="BSNK" style={{ height: 56, marginBottom: 16, display: "inline-block" }} />
          <h1 style={{ fontSize: 30, fontWeight: 700, color: BRAND.dark, margin: 0 }}>Dine favoritter</h1>
        </div>

        {liked.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
            {liked.map((talk, i) => (
              <div key={talk.id} style={{
                display: "flex", alignItems: "center", gap: 14,
                background: "#f8f9fb", border: `1px solid ${BRAND.border}`,
                borderRadius: 14, padding: "14px 16px",
                opacity: show ? 1 : 0, transform: show ? "translateX(0)" : "translateX(-20px)",
                transition: `all 0.4s ease ${0.2 + i * 0.06}s`,
              }}>
                <div style={{ position: "relative", width: talk.image2 ? 92 : 52, height: 52, flexShrink: 0 }}>
                  <img src={talk.image} alt={talk.speaker} style={{
                    width: 52, height: 52, borderRadius: 26,
                    objectFit: "cover", position: "absolute", left: 0, top: 0,
                    background: `linear-gradient(135deg, ${BRAND.accentDark}, ${BRAND.accent})`,
                    border: "2px solid #f8f9fb", zIndex: 2,
                  }} />
                  {talk.image2 && <img src={talk.image2} alt={talk.speaker} style={{
                    width: 52, height: 52, borderRadius: 26,
                    objectFit: "cover", position: "absolute", left: 42, top: 0,
                    background: `linear-gradient(135deg, ${BRAND.accentDark}, ${BRAND.accent})`,
                    border: "2px solid #f8f9fb", zIndex: 1,
                  }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: BRAND.dark, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{talk.title}</div>
                  <div style={{ fontSize: 12, color: BRAND.muted, marginTop: 2 }}>kl. {talk.time} · {talk.speaker}</div>
                </div>
              </div>
            ))}
          </div>
        )}


        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {liked.length > 0 && (<>
            <div style={{ fontSize: 13, fontWeight: 600, color: BRAND.muted, textAlign: "center", marginBottom: -2 }}>Del konferansen</div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              {[
                { key: "linkedin", label: "LinkedIn", color: "#0A66C2", icon: "in" },
                { key: "facebook", label: "Facebook", color: "#1877F2", icon: "f" },
                { key: "x", label: "X", color: "#000000", icon: "X" },
              ].map(p => (
                <button key={p.key} onClick={() => handleSharePlatform(p.key)} style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  padding: "12px 8px", borderRadius: 12,
                  background: "#fff", border: `1.5px solid ${p.color}22`,
                  color: p.color, fontSize: 13, fontWeight: 700,
                  cursor: "pointer", transition: "all 0.2s",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `${p.color}08`; e.currentTarget.style.borderColor = `${p.color}44`; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = `${p.color}22`; }}
                ><span style={{ fontWeight: 900, fontSize: 15 }}>{p.icon}</span> {p.label}</button>
              ))}
            </div>
          </>)}
          <a href="https://event.checkin.no/195802/buildingsmart-norge-konferansen-2026-bsnk26"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: "block", textAlign: "center", padding: "16px 24px", borderRadius: 14,
              background: `linear-gradient(135deg, ${BRAND.accentDark}, ${BRAND.accent})`,
              color: "#fff", fontSize: 16, fontWeight: 700, textDecoration: "none",
              boxShadow: `0 8px 24px ${BRAND.accent}33`, transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = `0 12px 32px ${BRAND.accent}44`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = `0 8px 24px ${BRAND.accent}33`; }}
          >Sikre deg plass til årets konferanse</a>
          <button onClick={onReset} style={{
            background: "none", border: `1px solid ${BRAND.border}`, borderRadius: 14,
            padding: "12px 24px", color: BRAND.muted, fontSize: 14, fontWeight: 500,
            cursor: "pointer", transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.target.style.borderColor = BRAND.accent; e.target.style.color = BRAND.accentDark; }}
          onMouseLeave={e => { e.target.style.borderColor = BRAND.border; e.target.style.color = BRAND.muted; }}
          >Prøv igjen</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState([]);
  const [started, setStarted] = useState(false);
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 100); }, []);

  const handleSwipe = useCallback((isLike) => {
    if (isLike) setLiked(prev => [...prev, TALKS[currentIndex]]);
    setCurrentIndex(prev => prev + 1);
  }, [currentIndex]);

  const handleReset = () => { setCurrentIndex(0); setLiked([]); };

  if (!started) {
    return (
      <div style={{
        minHeight: "100vh", background: BRAND.bg,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "40px 20px", fontFamily: "'DM Sans', sans-serif",
      }}>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <div style={{
          maxWidth: 420, textAlign: "center",
          opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s cubic-bezier(.4,0,.2,1)",
        }}>
          <img src={BRAND.logo} alt="BSNK" style={{ height: 38, marginBottom: 12, display: "inline-block" }} />
          <div style={{ fontSize: 15, fontWeight: 600, color: BRAND.dark, marginBottom: 24, fontFamily: "'DM Sans', sans-serif" }}>buildingSMART Norge konferansen</div>

          <div style={{
            display: "inline-block", background: `${BRAND.accent}10`,
            border: `1px solid ${BRAND.accent}22`, borderRadius: 10, padding: "6px 18px",
            fontSize: 13, color: BRAND.accentDark, letterSpacing: 1.2, fontWeight: 600,
            marginBottom: 28, textTransform: "uppercase",
          }}>15. April 2026 · Clarion Hotel Oslo</div>

          <h1 style={{ fontSize: 40, fontWeight: 700, color: BRAND.dark, margin: 0, lineHeight: 1.2, marginBottom: 16 }}>
            Finn foredragene<br />
            <span style={{
              background: `linear-gradient(135deg, ${BRAND.accentDark}, ${BRAND.accent})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>som matcher deg</span>
          </h1>

          <p style={{ fontSize: 16, lineHeight: 1.7, color: BRAND.muted, margin: 0, marginBottom: 36 }}>
            Swipe gjennom {TALKS.length} foredrag og finn ut<br />hvor mye av BSNK26 som er laget for deg.
          </p>

          <button onClick={() => setStarted(true)} style={{
            padding: "16px 44px", borderRadius: 14,
            background: `linear-gradient(135deg, ${BRAND.accentDark}, ${BRAND.accent})`,
            color: "#fff", fontSize: 17, fontWeight: 700, border: "none", cursor: "pointer",
            boxShadow: `0 8px 30px ${BRAND.accent}30`, transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={e => { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = `0 14px 40px ${BRAND.accent}40`; }}
          onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = `0 8px 30px ${BRAND.accent}30`; }}
          >Start matching →</button>

          <div style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 44, color: "#c4c9d4", fontSize: 13, fontWeight: 500 }}>
            <span>← Skip</span>
            <span>Interessant →</span>
          </div>
        </div>
      </div>
    );
  }

  if (currentIndex >= TALKS.length) {
    return <ResultsView liked={liked} onReset={handleReset} />;
  }

  return (
    <div style={{
      minHeight: "100vh", background: BRAND.bg,
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "20px 20px 24px", fontFamily: "'DM Sans', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: 400, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src={BRAND.logo} alt="BSNK" style={{ height: 28 }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: BRAND.dark, fontFamily: "'DM Sans', sans-serif" }}>buildingSMART Norge konferansen</span>
        </div>
        <span style={{ fontSize: 13, color: BRAND.muted, fontWeight: 500 }}>{currentIndex + 1} / {TALKS.length}</span>
      </div>

      <div style={{ width: "100%", maxWidth: 400, height: 4, borderRadius: 2, background: "#f1f5f9", marginBottom: 18, overflow: "hidden" }}>
        <div style={{
          width: `${(currentIndex / TALKS.length) * 100}%`, height: "100%", borderRadius: 2,
          background: `linear-gradient(90deg, ${BRAND.accentDark}, ${BRAND.accent})`,
          transition: "width 0.4s ease",
        }} />
      </div>

      <div style={{ position: "relative", width: "100%", maxWidth: 400, height: 520 }}>
        {TALKS.slice(currentIndex, currentIndex + 2).reverse().map((talk, i, arr) => (
          <SwipeCard key={talk.id} talk={talk} isTop={i === arr.length - 1} onSwipe={handleSwipe}
            style={i < arr.length - 1 ? { transform: "scale(0.96) translateY(8px)", opacity: 0.6 } : {}} />
        ))}
      </div>

      <div style={{ display: "flex", gap: 20, marginTop: 22, alignItems: "center", justifyContent: "center" }}>
        <button onClick={() => handleSwipe(false)} style={{
          width: 58, height: 58, borderRadius: 29, background: "#fff",
          border: `2px solid ${BRAND.red}33`, display: "flex", alignItems: "center",
          justifyContent: "center", cursor: "pointer", fontSize: 22, color: BRAND.red,
          transition: "all 0.2s", boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = `${BRAND.red}0a`; e.currentTarget.style.borderColor = `${BRAND.red}66`; }}
        onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = `${BRAND.red}33`; }}
        >✕</button>
        <div style={{ fontSize: 13, color: "#c4c9d4", textAlign: "center", minWidth: 55, fontWeight: 500 }}>{TALKS.length - currentIndex} igjen</div>
        <button onClick={() => handleSwipe(true)} style={{
          width: 58, height: 58, borderRadius: 29, background: "#fff",
          border: `2px solid ${BRAND.green}44`, display: "flex", alignItems: "center",
          justifyContent: "center", cursor: "pointer", fontSize: 22, color: BRAND.green,
          transition: "all 0.2s", boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = `${BRAND.green}0a`; e.currentTarget.style.borderColor = `${BRAND.green}66`; }}
        onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = `${BRAND.green}44`; }}
        >♥</button>
      </div>
    </div>
  );
}
