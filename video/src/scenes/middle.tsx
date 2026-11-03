import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Em, Headline, Scene, clamp, useAppear, usePop } from "../anim";
import { Building, Check, Plant, SupplierTeam } from "../illustrations";
import { C, FONT, MAX_PRICE, ORGS, euro } from "../theme";

const Abs: React.FC<{ x: number; y: number; w?: number; children?: React.ReactNode; style?: React.CSSProperties }> = ({ x, y, w, children, style }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, ...style }}>{children}</div>
);

const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div
    style={{
      background: C.surface,
      border: `4px solid ${C.ink}`,
      borderRadius: 28,
      padding: "28px 32px",
      fontFamily: FONT,
      color: C.ink,
      boxShadow: "0 18px 44px rgba(22,52,43,.12)",
      ...style,
    }}
  >
    {children}
  </div>
);

const Tag: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = C.leaf }) => (
  <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "0.12em", color }}>{children}</div>
);

const PopIn: React.FC<{ delay: number; children: React.ReactNode; origin?: string; slide?: number }> = ({ delay, children, origin = "center", slide = 0 }) => {
  const p = usePop(delay);
  return (
    <div style={{ transform: `translateX(${(1 - p) * slide}px) scale(${slide ? 1 : p})`, opacity: Math.min(1, p * 1.5), transformOrigin: origin }}>
      {children}
    </div>
  );
};

// ── 4. A supplier team makes a concrete offer ────────────────────────────────
export const SceneOffer: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const criteria = ["Brieven in 10 talen", "Huisstijl blijft intact", "Opgeleverd als open source"];
  return (
    <Scene duration={duration}>
      <Headline>
        Een leverancier doet
        <br />
        <Em>één concreet aanbod.</Em>
      </Headline>
      <Abs x={60} y={420}>
        <PopIn delay={10} origin="bottom center">
          <SupplierTeam width={360} typing={(Math.sin(frame / 5) + 1) / 2} />
        </PopIn>
      </Abs>
      <Abs x={460} y={320} w={560}>
        <PopIn delay={30} slide={120}>
          <Card>
            <Tag>CAMPAGNE</Tag>
            <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-0.03em", marginTop: 6, lineHeight: 1.1 }}>
              Epistola: brieven automatisch vertalen
            </div>
            <div style={{ marginTop: 22, display: "grid", gap: 14 }}>
              {criteria.map((c, i) => (
                <div key={c} style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 27, fontWeight: 600 }}>
                  <PopIn delay={70 + i * 22}>
                    <Check size={40} />
                  </PopIn>
                  <span style={{ opacity: interpolate(frame, [70 + i * 22, 82 + i * 22], [0, 1], clamp) }}>{c}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: `3px dashed ${C.line}`, opacity: interpolate(frame, [150, 165], [0, 1], clamp) }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: C.muted }}>Maximumprijs</div>
              <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: "-0.04em" }}>{euro(MAX_PRICE)}</div>
            </div>
          </Card>
        </PopIn>
      </Abs>
    </Scene>
  );
};

// ── 5. Everyone pledges a maximum ────────────────────────────────────────────
const PLEDGE_AT = [35, 75, 115, 200];
const BAR = { x: 80, y: 800, w: 920, scale: 125 };

export const ScenePledge: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = PLEDGE_AT.map((d) => spring({ frame: frame - d - 10, fps, config: { damping: 200 } }));
  const coverage = ORGS.reduce((sum, org, i) => sum + org.cap * progress[i], 0);
  const fullAt = useAppear(PLEDGE_AT[2] + 30, 12);
  let left = 0;
  return (
    <Scene duration={duration}>
      <Headline sub="Uit je eigen, gereserveerde budget. Meer niet.">
        Meedoen?
        <br />
        <Em>Zeg een maximum toe.</Em>
      </Headline>

      {ORGS.map((org, i) => (
        <Abs key={org.name} x={80} y={340 + i * 100} w={560}>
          <PopIn delay={PLEDGE_AT[i]} slide={-80}>
            <div style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: FONT }}>
              <Building org={org} width={62} />
              <div style={{ flex: 1, fontSize: 30, fontWeight: 700, color: C.ink }}>{org.name}</div>
              <div style={{ padding: "8px 18px", borderRadius: 999, background: org.accent, color: C.surface, fontSize: 28, fontWeight: 800, border: `3px solid ${C.ink}` }}>
                max {org.cap}%
              </div>
            </div>
          </PopIn>
        </Abs>
      ))}

      <Abs x={700} y={250}>
        <Plant growth={0.08 + (coverage / 125) * 0.5} width={260} />
      </Abs>

      {/* coverage bar */}
      <Abs x={BAR.x} y={BAR.y - 52} w={BAR.w} style={{ display: "flex", justifyContent: "space-between", fontFamily: FONT, fontSize: 28, fontWeight: 800, color: C.ink }}>
        <span>Dekking</span>
        <span style={{ color: coverage >= 100 ? C.leaf : C.ink }}>{Math.round(coverage)}%</span>
      </Abs>
      <Abs x={BAR.x} y={BAR.y} w={BAR.w} style={{ height: 44, borderRadius: 999, background: "#e8eee9", border: `4px solid ${C.ink}`, overflow: "hidden" }}>
        {ORGS.map((org, i) => {
          const w = (org.cap * progress[i] * BAR.w) / BAR.scale;
          const el = <div key={org.name} style={{ position: "absolute", top: 0, bottom: 0, left, width: w, background: org.accent, borderRight: w > 2 ? `3px solid ${C.ink}` : undefined }} />;
          left += w;
          return el;
        })}
      </Abs>
      <Abs x={BAR.x + (100 * BAR.w) / BAR.scale - 2} y={BAR.y - 14} style={{ width: 4, height: 72, background: C.ink, borderRadius: 2 }} />
      <Abs x={BAR.x + (100 * BAR.w) / BAR.scale - 40} y={BAR.y + 62} w={80} style={{ textAlign: "center", fontFamily: FONT, fontSize: 22, fontWeight: 700, color: C.muted }}>
        100%
      </Abs>
      <Abs x={0} y={940} w={1080} style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ transform: `scale(${fullAt})`, padding: "14px 28px", borderRadius: 999, background: C.leaf, color: C.surface, fontFamily: FONT, fontSize: 30, fontWeight: 800 }}>
          Volledig gedekt → de bouw start!
        </div>
      </Abs>
    </Scene>
  );
};

// ── 7. Evidence first, then acceptance ─────────────────────────────────────
export const SceneAccept: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const growth = interpolate(frame, [0, 180], [0.58, 0.92], clamp);
  const stamp = usePop(180);
  return (
    <Scene duration={duration}>
      <Headline>
        Pas na bewijs
        <br />
        <Em>wordt het geaccepteerd.</Em>
      </Headline>

      <Abs x={70} y={320}>
        <Plant growth={growth} width={320} />
      </Abs>

      <Abs x={450} y={300} w={570}>
        <PopIn delay={12} slide={100}>
          <Card style={{ padding: "22px 28px" }}>
            <Tag>BEWIJS</Tag>
            {["Vertaalde testbrieven", "Kwaliteitsrapport", "Broncode & release"].map((t, i) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14, fontSize: 27, fontWeight: 600 }}>
                <svg width={30} height={36} viewBox="0 0 30 36">
                  <path d="M3,3 L19,3 L27,11 L27,33 L3,33 Z" fill={C.sky} stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
                  <path d="M19,3 L19,11 L27,11" fill="none" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
                </svg>
                <span style={{ opacity: interpolate(frame, [22 + i * 10, 32 + i * 10], [0, 1], clamp) }}>{t}</span>
              </div>
            ))}
          </Card>
        </PopIn>
        <div style={{ marginTop: 34, display: "flex", justifyContent: "space-between" }}>
          {ORGS.map((org, i) => (
            <div key={org.name} style={{ position: "relative", opacity: interpolate(frame, [70, 85], [0, 1], clamp) }}>
              <Building org={org} width={96} />
              <div style={{ position: "absolute", right: -12, top: -8 }}>
                <PopIn delay={95 + i * 16}>
                  <Check size={50} />
                </PopIn>
              </div>
            </div>
          ))}
        </div>
      </Abs>

      <Abs x={0} y={880} w={1080} style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            transform: `rotate(${-6 + (1 - stamp) * 20}deg) scale(${stamp + (1 - stamp) * 2})`,
            opacity: Math.min(1, Math.max(0, stamp * 2)),
            padding: "14px 34px",
            border: `6px solid ${C.leaf}`,
            borderRadius: 18,
            color: C.leaf,
            background: "rgba(232,242,201,.92)",
            fontFamily: FONT,
            fontSize: 54,
            fontWeight: 800,
            letterSpacing: "0.04em",
          }}
        >
          GEACCEPTEERD ✓
        </div>
      </Abs>
    </Scene>
  );
};
