import React from "react";
import { C, FONT, Org } from "./theme";

const S = { stroke: C.ink, strokeWidth: 4, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/** Dutch stepped-gable building. viewBox 160×200. */
export const Building: React.FC<{ org: Org; width?: number; dim?: number }> = ({
  org,
  width = 170,
  dim = 0,
}) => {
  const facade =
    "M20,192 L20,58 L34,58 L34,44 L48,44 L48,30 L62,30 L62,14 L98,14 L98,30 L112,30 L112,44 L126,44 L126,58 L140,58 L140,192 Z";
  return (
    <svg
      width={width}
      height={(width * 200) / 160}
      viewBox="0 0 160 200"
      style={{ filter: dim ? `grayscale(${dim}) opacity(${1 - dim * 0.35})` : undefined, overflow: "visible" }}
    >
      <path d={facade} fill={org.facade} {...S} />
      {org.variant === "water" ? (
        <g fill="none" stroke={org.accent} strokeWidth={4} strokeLinecap="round">
          <path d="M62,40 q6,-6 12,0 t12,0 t12,0" />
          <path d="M62,52 q6,-6 12,0 t12,0 t12,0" />
        </g>
      ) : (
        <circle cx={80} cy={42} r={9} fill={C.surface} {...S} strokeWidth={3.5} />
      )}
      {[
        [38, 78],
        [94, 78],
        [38, 118],
        [94, 118],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={28} height={26} rx={3} fill={C.surface} {...S} strokeWidth={3.5} />
      ))}
      <path d="M66,192 L66,166 a14,14 0 0 1 28,0 L94,192" fill={org.accent} {...S} strokeWidth={3.5} />
      <line x1={4} y1={192} x2={156} y2={192} {...S} />
    </svg>
  );
};

export const OrgLabel: React.FC<{ org: Org; size?: number }> = ({ org, size = 22 }) => (
  <div
    style={{
      fontFamily: FONT,
      fontSize: size,
      fontWeight: 700,
      color: C.ink,
      textAlign: "center",
      whiteSpace: "nowrap",
    }}
  >
    {org.name}
  </div>
);

export const SpeechBubble: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = C.surface,
}) => (
  <div style={{ position: "relative", display: "inline-block" }}>
    <div
      style={{
        background: color,
        border: `4px solid ${C.ink}`,
        borderRadius: 22,
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
    <svg width={30} height={22} viewBox="0 0 30 22" style={{ position: "absolute", left: "50%", marginLeft: -15, bottom: -18 }}>
      <path d="M2,0 L15,18 L28,0" fill={color} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
    </svg>
  </div>
);

/** Small supplier team behind a laptop. viewBox 300×260. */
export const SupplierTeam: React.FC<{ width?: number; typing?: number }> = ({ width = 300, typing = 0 }) => (
  <svg width={width} height={(width * 260) / 300} viewBox="0 0 300 260" style={{ overflow: "visible" }}>
    {/* people */}
    <circle cx={92} cy={58} r={28} fill="#f2c7a5" {...S} />
    <path d="M44,170 q0,-70 48,-70 q48,0 48,70 Z" fill={C.leaf} {...S} />
    <circle cx={208} cy={64} r={26} fill="#c98f6b" {...S} />
    <path d="M162,170 q0,-64 46,-64 q46,0 46,64 Z" fill={C.sun} {...S} />
    {/* laptop */}
    <rect x={60} y={110} width={180} height={112} rx={10} fill={C.ink} {...S} />
    <rect x={72} y={122} width={156} height={88} rx={4} fill={C.leafDark} />
    <text x={150} y={180} textAnchor="middle" fontFamily="Menlo, monospace" fontWeight={700} fontSize={36} fill={C.sprout}>
      {"</>"}
    </text>
    <rect x={120} y={192} width={20 + 40 * typing} height={5} rx={2} fill={C.sprout} opacity={0.7} />
    <path d="M30,222 L270,222 L282,244 L18,244 Z" fill={C.lineStrong} {...S} />
  </svg>
);

/**
 * Plant in a pot. `growth` 0..1 grows the stem and leaves, `bloom` 0..1 opens the flower.
 * viewBox 300×420, pot sits at the bottom.
 */
export const Plant: React.FC<{ growth: number; bloom?: number; width?: number }> = ({
  growth,
  bloom = 0,
  width = 300,
}) => {
  const base = 330;
  const stemTop = base - 250 * growth;
  const leaves = [
    { t: 0.2, side: -1, color: C.leaf },
    { t: 0.38, side: 1, color: C.sprout },
    { t: 0.56, side: -1, color: C.sprout },
    { t: 0.74, side: 1, color: C.leaf },
  ];
  const sway = Math.sin(growth * 6) * 3;
  return (
    <svg width={width} height={(width * 420) / 300} viewBox="0 0 300 420" style={{ overflow: "visible" }}>
      {growth > 0.02 ? (
        <path
          d={`M150,${base} C ${150 + sway},${base - (base - stemTop) * 0.5} ${150 - sway},${stemTop + 30} 150,${stemTop}`}
          stroke={C.leafDark}
          strokeWidth={9}
          fill="none"
          strokeLinecap="round"
        />
      ) : null}
      {leaves.map((l, i) => {
        const s = Math.max(0, Math.min(1, (growth - l.t) / 0.16));
        if (s <= 0) return null;
        const y = base - 250 * l.t - 10;
        return (
          <g key={i} transform={`translate(150,${y}) scale(${l.side * s},${s}) rotate(-28)`}>
            <path d="M0,0 C 22,-30 70,-34 96,-6 C 70,22 24,22 0,0 Z" fill={l.color} {...S} />
            <path d="M6,-2 L80,-8" stroke={C.ink} strokeWidth={2.5} opacity={0.5} />
          </g>
        );
      })}
      {growth > 0.85 ? (
        <g transform={`translate(150,${stemTop})`}>
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 60 + bloom * 20}) scale(${0.25 + bloom * 0.75})`}>
              <ellipse cx={0} cy={-42} rx={22} ry={38} fill={i % 2 ? C.rose : "#ec9a84"} {...S} />
            </g>
          ))}
          <circle r={14 + bloom * 12} fill={C.sun} {...S} />
        </g>
      ) : null}
      {/* pot */}
      <path d="M86,324 L214,324 L200,408 L100,408 Z" fill={C.rose} {...S} />
      <rect x={78} y={312} width={144} height={26} rx={6} fill="#e48f78" {...S} />
    </svg>
  );
};

export const Check: React.FC<{ size?: number; color?: string }> = ({ size = 56, color = C.leaf }) => (
  <svg width={size} height={size} viewBox="0 0 56 56">
    <circle cx={28} cy={28} r={25} fill={color} stroke={C.ink} strokeWidth={3.5} />
    <path d="M16,29 L25,38 L41,19" stroke={C.surface} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** bloei.me logo mark, as on the site. */
export const LogoMark: React.FC<{ size?: number }> = ({ size = 64 }) => (
  <div
    style={{
      width: size,
      height: size,
      display: "grid",
      placeItems: "center",
      borderRadius: "50% 50% 45% 55%",
      background: C.leaf,
      color: C.surface,
      transform: "rotate(-8deg)",
      fontFamily: FONT,
      fontWeight: 800,
      fontSize: size * 0.52,
    }}
  >
    ↗
  </div>
);

export const Logo: React.FC<{ size?: number }> = ({ size = 64 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: size * 0.3 }}>
    <LogoMark size={size} />
    <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: size * 0.72, letterSpacing: "-0.04em", color: C.ink }}>
      bloei.me
    </span>
  </div>
);

/** A letter with a municipal seal. viewBox 120×150. */
export const Letter: React.FC<{ width?: number; lang?: string }> = ({ width = 120, lang }) => (
  <svg width={width} height={(width * 150) / 120} viewBox="0 0 120 150" style={{ overflow: "visible" }}>
    <path d="M6,4 L88,4 L114,30 L114,146 L6,146 Z" fill={C.surface} {...S} />
    <path d="M88,4 L88,30 L114,30" fill={C.lime} {...S} />
    <circle cx={28} cy={28} r={10} fill={C.leaf} stroke={C.ink} strokeWidth={3} />
    {[56, 70, 84, 98, 112].map((y, i) => (
      <rect key={y} x={20} y={y} width={i === 4 ? 46 : 80} height={6} rx={3} fill={C.line} />
    ))}
    {lang ? (
      <g transform="translate(90,128)">
        <rect x={-26} y={-16} width={52} height={32} rx={10} fill={C.sun} stroke={C.ink} strokeWidth={3} />
        <text x={0} y={7} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={18} fill={C.ink}>
          {lang}
        </text>
      </g>
    ) : null}
  </svg>
);

/** Application window titled "Epistola". */
export const AppWindow: React.FC<{ width?: number; title: string; children?: React.ReactNode }> = ({ width = 380, title, children }) => (
  <div style={{ width, border: `4px solid ${C.ink}`, borderRadius: 22, background: C.surface, overflow: "hidden", boxShadow: "0 18px 44px rgba(22,52,43,.12)" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: C.ink }}>
      {[C.rose, C.sun, C.sprout].map((c) => (
        <span key={c} style={{ width: 14, height: 14, borderRadius: "50%", background: c }} />
      ))}
      <span style={{ marginLeft: 10, fontFamily: FONT, fontWeight: 800, fontSize: 24, color: C.surface, letterSpacing: "-0.02em" }}>{title}</span>
    </div>
    <div style={{ padding: 22, position: "relative" }}>{children}</div>
  </div>
);

/** Pile of paperwork; `sheets` sheets high. */
export const PaperStack: React.FC<{ sheets: number; width?: number }> = ({ sheets, width = 90 }) => {
  const step = 11;
  const h = sheets * step + 30;
  return (
    <svg width={width} height={(h * width) / 90} viewBox={`0 0 90 ${h}`} style={{ overflow: "visible" }}>
      {Array.from({ length: sheets }).map((_, i) => {
        const y = h - 14 - i * step;
        const r = ((i * 37) % 9) - 4;
        return (
          <g key={i} transform={`rotate(${r} 45 ${y})`}>
            <rect x={6} y={y - 10} width={78} height={14} rx={2} fill={i % 3 === 0 ? C.sand : C.surface} stroke={C.ink} strokeWidth={3} />
          </g>
        );
      })}
    </svg>
  );
};

const iconBox = (children: React.ReactNode, size: number, bg: string) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx={50} cy={50} r={46} fill={bg} stroke={C.ink} strokeWidth={4} />
    {children}
  </svg>
);

export const IconTogether: React.FC<{ size?: number }> = ({ size = 120 }) =>
  iconBox(
    <g {...S} strokeWidth={4}>
      <circle cx={34} cy={40} r={9} fill={C.sun} />
      <circle cx={66} cy={40} r={9} fill={C.sky} />
      <circle cx={50} cy={34} r={10} fill={C.surface} />
      <path d="M20,72 q0,-20 14,-20 q14,0 14,20 Z" fill={C.sun} />
      <path d="M52,72 q0,-20 14,-20 q14,0 14,20 Z" fill={C.sky} />
      <path d="M34,74 q0,-26 16,-26 q16,0 16,26 Z" fill={C.surface} />
    </g>,
    size,
    C.lime,
  );

export const IconEasy: React.FC<{ size?: number }> = ({ size = 120 }) =>
  iconBox(
    <g {...S} strokeWidth={4}>
      <path d="M30,74 C 30,44 52,24 76,24 C 76,50 58,70 30,74 Z" fill={C.surface} />
      <path d="M26,80 L62,40" fill="none" />
    </g>,
    size,
    C.sand,
  );

export const IconOpen: React.FC<{ size?: number }> = ({ size = 120 }) =>
  iconBox(
    <g {...S} strokeWidth={4}>
      <path d="M16,50 C 30,28 70,28 84,50 C 70,72 30,72 16,50 Z" fill={C.surface} />
      <circle cx={50} cy={50} r={12} fill={C.leaf} />
      <circle cx={46} cy={46} r={3} fill={C.surface} stroke="none" />
    </g>,
    size,
    C.sky,
  );
