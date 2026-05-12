import { useState, useEffect, useRef } from "react";

const glitchKeyframes = `
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;700;800&display=swap');

@keyframes flicker {
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.4; }
  94% { opacity: 1; }
  96% { opacity: 0.2; }
  97% { opacity: 1; }
}

@keyframes scanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}

@keyframes glitch1 {
  0%, 100% { clip-path: inset(0 0 98% 0); transform: translate(-4px, 0); }
  20% { clip-path: inset(30% 0 50% 0); transform: translate(4px, 0); }
  40% { clip-path: inset(60% 0 20% 0); transform: translate(-4px, 0); }
  60% { clip-path: inset(80% 0 5% 0); transform: translate(4px, 0); }
  80% { clip-path: inset(10% 0 70% 0); transform: translate(-4px, 0); }
}

@keyframes glitch2 {
  0%, 100% { clip-path: inset(50% 0 30% 0); transform: translate(4px, 0); }
  25% { clip-path: inset(10% 0 80% 0); transform: translate(-4px, 0); }
  50% { clip-path: inset(70% 0 10% 0); transform: translate(4px, 0); }
  75% { clip-path: inset(20% 0 60% 0); transform: translate(-4px, 0); }
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255, 80, 60, 0); }
  50% { box-shadow: 0 0 0 8px rgba(255, 80, 60, 0.08); }
}

@keyframes drift {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-8px) rotate(0.5deg); }
  66% { transform: translateY(4px) rotate(-0.5deg); }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes noise {
  0%   { background-position: 0% 0%; }
  10%  { background-position: -5% -10%; }
  20%  { background-position: -15% 5%; }
  30%  { background-position: 7% -25%; }
  40%  { background-position: -5% 25%; }
  50%  { background-position: -15% 10%; }
  60%  { background-position: 15% 0%; }
  70%  { background-position: 0% 15%; }
  80%  { background-position: 3% 35%; }
  90%  { background-position: -10% 10%; }
  100% { background-position: 0% 0%; }
}
`;

function GlitchText({ text, fontSize = "clamp(6rem, 20vw, 14rem)" }) {
  return (
    <div
      style={{ position: "relative", display: "inline-block", lineHeight: 1 }}
    >
      <span
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize,
          color: "#0f0f0f",
          position: "relative",
          display: "inline-block",
          animation: "flicker 8s infinite",
          letterSpacing: "-0.04em",
        }}
      >
        {text}
        <span
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            color: "#ff503c",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize,
            letterSpacing: "-0.04em",
            animation: "glitch1 3.5s infinite",
            opacity: 0.85,
            mixBlendMode: "multiply",
          }}
          aria-hidden
        >
          {text}
        </span>
        <span
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            color: "#3caaff",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize,
            letterSpacing: "-0.04em",
            animation: "glitch2 3.5s infinite 0.1s",
            opacity: 0.75,
            mixBlendMode: "multiply",
          }}
          aria-hidden
        >
          {text}
        </span>
      </span>
    </div>
  );
}

function TerminalLine({ children, delay = 0, prompt = true }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s",
        display: "flex",
        gap: "8px",
        fontFamily: "'Space Mono', monospace",
        fontSize: "clamp(11px, 2vw, 13px)",
        color: "#555",
        lineHeight: 1.6,
      }}
    >
      {prompt && <span style={{ color: "#ff503c", flexShrink: 0 }}>{">"}</span>}
      <span>{children}</span>
    </div>
  );
}

function NoiseOverlay() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
        animation: "noise 0.5s steps(1) infinite",
        zIndex: 0,
      }}
    />
  );
}

function GridBackground() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

export default function NotFound() {
  const [hovered, setHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 12,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 8,
    });
  };

  return (
    <>
      <style>{glitchKeyframes}</style>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        style={{
          minHeight: "100vh",
          backgroundColor: "#fafaf8",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Syne', sans-serif",
        }}
      >
        <NoiseOverlay />
        <GridBackground />

        <div
          aria-hidden
          style={{
            position: "fixed",
            top: "10%",
            right: "-5%",
            width: "clamp(200px, 40vw, 500px)",
            height: "clamp(200px, 40vw, 500px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,80,60,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
            animation: "drift 7s ease-in-out infinite",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "fixed",
            bottom: "5%",
            left: "-8%",
            width: "clamp(150px, 35vw, 400px)",
            height: "clamp(150px, 35vw, 400px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(60,170,255,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
            animation: "drift 9s ease-in-out infinite 2s",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "720px",
            width: "100%",
            animation: "fadeUp 0.8s ease-out both",
            transform: `perspective(800px) rotateX(${-coords.y * 0.15}deg) rotateY(${coords.x * 0.15}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 10px",
              border: "1px solid rgba(255,80,60,0.3)",
              borderRadius: "4px",
              marginBottom: "2rem",
              animation: "pulse 3s ease-in-out infinite",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#ff503c",
                display: "inline-block",
                animation: "blink 1.5s step-end infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "11px",
                color: "#ff503c",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              HTTP 404
            </span>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <GlitchText text="404" />
          </div>

          <div
            style={{
              width: "48px",
              height: "3px",
              backgroundColor: "#0f0f0f",
              marginBottom: "1.5rem",
            }}
          />

          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
              color: "#0f0f0f",
              margin: "0 0 0.75rem",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            Page not found.
          </h1>

          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(12px, 2.2vw, 14px)",
              color: "#777",
              margin: "0 0 2.5rem",
              lineHeight: 1.7,
              maxWidth: "440px",
            }}
          >
            The route you requested doesn't exist — it may have moved, been
            deleted, or never existed in the first place.
          </p>

          <div
            style={{
              background: "#f2f1ee",
              border: "1px solid #e0deda",
              borderRadius: "6px",
              padding: "1rem 1.25rem",
              marginBottom: "2.5rem",
            }}
          >
            <TerminalLine delay={300}>
              {"resolve(path) → "}
              <span style={{ color: "#ff503c" }}>null</span>
            </TerminalLine>
            <TerminalLine delay={600}>
              {"matched routes: "}
              <span style={{ color: "#888" }}>0</span>
            </TerminalLine>
            <TerminalLine delay={900}>
              {"suggestion: check your URL or use the button below"}
            </TerminalLine>
            <TerminalLine delay={1200} prompt={false}>
              <span
                style={{
                  display: "inline-block",
                  animation: "blink 1s step-end infinite",
                  color: "#0f0f0f",
                  marginLeft: "4px",
                }}
              >
                ▌
              </span>
            </TerminalLine>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a
              href="/"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 22px",
                backgroundColor: hovered ? "#ff503c" : "#0f0f0f",
                color: "#fff",
                textDecoration: "none",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "0.02em",
                borderRadius: "4px",
                transition: "background-color 0.2s, transform 0.15s",
                transform: hovered ? "translateY(-1px)" : "translateY(0)",
              }}
            >
              ← Back home
            </a>
            <a
              href="javascript:history.back()"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 22px",
                backgroundColor: "transparent",
                color: "#0f0f0f",
                textDecoration: "none",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "0.02em",
                borderRadius: "4px",
                border: "1.5px solid #0f0f0f",
                transition: "border-color 0.2s, color 0.2s",
              }}
            >
              Go back
            </a>
          </div>
        </div>

        <div
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            color: "rgba(0,0,0,0.18)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            zIndex: 1,
          }}
        >
          ERR_ROUTE_NOT_FOUND
        </div>
      </div>
    </>
  );
}
