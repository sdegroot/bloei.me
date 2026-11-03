import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Beat, Em, Headline, Scene, clamp, usePop } from "../anim";
import { AppWindow, Building, Letter, LogoMark, OrgLabel, SpeechBubble, SupplierTeam } from "../illustrations";
import { C, FONT, ORGS } from "../theme";

export const ROW_X = [180, 420, 660, 900];
export const ROW_BOTTOM = 960;
const BUILDING_W = 170;
const BUILDING_H = (BUILDING_W * 200) / 160;
export const ROW_TOP = ROW_BOTTOM - BUILDING_H;

export const Positioned: React.FC<{ x: number; y: number; children: React.ReactNode; anchor?: "top" | "bottom"; style?: React.CSSProperties }> = ({
  x,
  y,
  children,
  anchor = "top",
  style,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      transform: `translate(-50%, ${anchor === "bottom" ? "-100%" : "0"})`,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Popper: React.FC<{ delay: number; children: React.ReactNode; origin?: string }> = ({ delay, children, origin = "bottom center" }) => {
  const p = usePop(delay);
  return <div style={{ transform: `scale(${Math.max(0, p)})`, transformOrigin: origin }}>{children}</div>;
};

const PoppingBuilding: React.FC<{ index: number; delay: number; dim: number; x?: number }> = ({ index, delay, dim, x }) => {
  const p = usePop(delay);
  const org = ORGS[index];
  return (
    <Positioned x={x ?? ROW_X[index]} y={ROW_BOTTOM} anchor="bottom">
      <div style={{ transform: `translateY(${(1 - p) * 80}px) scale(${0.6 + 0.4 * p})`, opacity: Math.min(1, p * 2), transformOrigin: "bottom center" }}>
        <Building org={org} width={BUILDING_W} dim={dim} />
        <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 12, opacity: 1 - dim * 0.4 }}>
          <OrgLabel org={org} />
        </div>
      </div>
    </Positioned>
  );
};

/** The four organisations standing in a row at the bottom of the stage. */
export const TownRow: React.FC<{ delays?: number[]; dim?: number }> = ({ delays = [0, 0, 0, 0], dim = 0 }) => (
  <>
    {ORGS.map((org, i) => (
      <PoppingBuilding key={org.name} index={i} delay={delays[i]} dim={dim} />
    ))}
  </>
);

/** Small "translated letter" bubble used as the shared wish. */
const WishBubble: React.FC = () => (
  <SpeechBubble>
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: FONT, fontWeight: 800, fontSize: 22, color: C.ink }}>
      <Letter width={40} />
      <span style={{ color: C.leaf }}>→</span>
      <span style={{ padding: "4px 8px", background: C.sun, border: `3px solid ${C.ink}`, borderRadius: 8 }}>EN</span>
    </div>
  </SpeechBubble>
);

// ── 1. Hook: one municipality, one wish ──────────────────────────────────────
const LANGS = [
  { code: "EN", label: "English" },
  { code: "UK", label: "Українська" },
  { code: "TR", label: "Türkçe" },
  { code: "PL", label: "Polski" },
  { code: "AR", label: "العربية" },
].map((l, i) => ({ ...l, x: 890 + (i % 2 ? 20 : -20), y: 330 + i * 96 }));
const TRANSLATE = 130;

export const SceneHook: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const letterOut = interpolate(frame, [40, 80], [0, 1], { ...clamp, easing: (t) => 1 - Math.pow(1 - t, 3) });
  return (
    <Scene duration={duration}>
      <Beat from={4} to={TRANSLATE}>
        <Headline>
          Gemeente Oost maakt
          <br />
          haar brieven met <Em>Epistola.</Em>
        </Headline>
      </Beat>
      <Beat from={TRANSLATE}>
        <Headline>
          Nu wil ze die brieven
          <br />
          ook <Em>automatisch vertalen.</Em>
        </Headline>
      </Beat>
      <PoppingBuilding index={0} delay={10} dim={0} x={200} />
      <div style={{ position: "absolute", left: 360, top: 430 }}>
        <Popper delay={22} origin="center">
          <AppWindow title="Epistola" width={300}>
            <div style={{ height: 150, display: "grid", gap: 12, alignContent: "start" }}>
              <div style={{ height: 14, width: "70%", background: C.lime, borderRadius: 6 }} />
              <div style={{ height: 10, width: "90%", background: C.line, borderRadius: 6 }} />
              <div style={{ height: 10, width: "60%", background: C.line, borderRadius: 6 }} />
              <div style={{ marginTop: 10, height: 36, width: 150, background: C.leaf, borderRadius: 10, color: C.surface, fontFamily: FONT, fontWeight: 800, fontSize: 18, display: "grid", placeItems: "center" }}>
                Genereer brief
              </div>
            </div>
          </AppWindow>
        </Popper>
      </div>
      {/* the generated letter slides out of the window */}
      <div style={{ position: "absolute", left: 520 + letterOut * 90, top: 560 + letterOut * 40, transform: `rotate(${letterOut * 8}deg)`, opacity: Math.min(1, letterOut * 3) }}>
        <Letter width={140} />
      </div>
      {LANGS.map((l, i) => (
        <Positioned key={l.code} x={l.x} y={l.y}>
          <Popper delay={TRANSLATE + 20 + i * 10} origin="center">
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 18px", background: C.surface, border: `4px solid ${C.ink}`, borderRadius: 999, fontFamily: FONT, fontWeight: 800, fontSize: 26, color: C.ink, whiteSpace: "nowrap" }}>
              <span style={{ padding: "2px 8px", background: C.sun, borderRadius: 8, fontSize: 20 }}>{l.code}</span>
              {l.label}
            </div>
          </Popper>
        </Positioned>
      ))}
    </Scene>
  );
};

// ── 2. Others want the same ──────────────────────────────────────────────────
const JOIN = [0, 25, 75, 125];

export const SceneOthers: React.FC<{ duration: number }> = ({ duration }) => (
  <Scene duration={duration}>
    <Headline size={62}>
      <Beat from={JOIN[1]}>Gemeente West wil dat ook.</Beat>
      <Beat from={JOIN[2]}>En Zuid.</Beat>
      <Beat from={JOIN[3]}>
        <Em>En het waterschap.</Em>
      </Beat>
    </Headline>
    <TownRow delays={[-30, JOIN[1], JOIN[2], JOIN[3]]} />
    {ROW_X.map((x, i) => (
      <Positioned key={x} x={x} y={ROW_TOP - 26} anchor="bottom">
        <Popper delay={JOIN[i] + 12}>
          <WishBubble />
        </Popper>
      </Positioned>
    ))}
  </Scene>
);

// ── 3. Alone it's too expensive, and nobody knows about the others ──────────
const UNAWARE = 125;

export const SceneAlone: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const apart = interpolate(frame, [UNAWARE, UNAWARE + 30], [0, 1], clamp);
  const dim = interpolate(frame, [UNAWARE + 60, UNAWARE + 90], [0, 0.7], clamp);
  return (
    <Scene duration={duration}>
      <Beat from={0} to={UNAWARE}>
        <Headline sub="Eigen budget, eigen inkooptraject, eigen offerte.">
          Ieder apart is het <Em color={C.rose}>te duur.</Em>
        </Headline>
      </Beat>
      <Beat from={UNAWARE}>
        <Headline sub={<Beat from={UNAWARE + 65}>Dus blijft het liggen.</Beat>}>
          Maar ze weten niet eens
          <br />
          <Em color={C.rose}>dat de rest het ook wil.</Em>
        </Headline>
      </Beat>
      {/* walls between the organisations */}
      <svg width={1080} height={1080} style={{ position: "absolute", inset: 0, opacity: apart }}>
        {[300, 540, 780].map((x) => (
          <line key={x} x1={x} y1={ROW_TOP - 170 + (1 - apart) * 60} x2={x} y2={ROW_BOTTOM + 50} stroke={C.lineStrong} strokeWidth={5} strokeDasharray="14 12" strokeLinecap="round" />
        ))}
      </svg>
      <TownRow dim={dim} />
      {ROW_X.map((x, i) => (
        <React.Fragment key={x}>
          {/* each one sees the full price */}
          <Positioned x={x} y={ROW_TOP - 30} anchor="bottom">
            <div style={{ opacity: 1 - apart }}>
              <Popper delay={20 + i * 10}>
                <div style={{ padding: "10px 16px", borderRadius: 14, background: C.rose, border: `4px solid ${C.ink}`, color: C.surface, fontFamily: FONT, fontWeight: 800, fontSize: 28, whiteSpace: "nowrap", transform: `rotate(${i % 2 ? 4 : -4}deg)` }}>
                  € 100.000
                </div>
              </Popper>
            </div>
          </Positioned>
          {/* …and has no idea the others want it too */}
          <Positioned x={x} y={ROW_TOP - 26} anchor="bottom">
            <Popper delay={UNAWARE + 20 + i * 8}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: C.surface, border: `4px solid ${C.ink}`, display: "grid", placeItems: "center", fontFamily: FONT, fontWeight: 800, fontSize: 38, color: C.muted }}>
                ?
              </div>
            </Popper>
          </Positioned>
        </React.Fragment>
      ))}
    </Scene>
  );
};

// ── 4. bloei.me: they find each other ──────────────────────────────────────
const SUPPLIER = { x: 950 };

export const SceneNetwork: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const hub = { x: 540, y: 600 };
  const CARD = 120;
  const endorse = [CARD + 30, CARD + 44, CARD + 58, CARD + 72];
  return (
    <Scene duration={duration}>
      <Headline sub={<Beat from={70}>Iedereen kan een voorstel doen, ook een leverancier.</Beat>}>
        Op bloei.me
        <br />
        <Em>vinden ze elkaar.</Em>
      </Headline>
      <svg width={1080} height={1080} style={{ position: "absolute", inset: 0 }}>
        {ROW_X.map((x, i) => {
          const len = Math.hypot(x - hub.x, ROW_TOP - hub.y);
          const draw = interpolate(frame, [24 + i * 6, 64 + i * 6], [len, 0], clamp);
          return (
            <line key={x} x1={x} y1={ROW_TOP + 10} x2={hub.x} y2={hub.y} stroke={C.leaf} strokeWidth={6} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={draw} />
          );
        })}
        {(() => {
          const len = SUPPLIER.x - 70 - hub.x;
          const draw = interpolate(frame, [70, 100], [len, 0], clamp);
          return <line x1={hub.x} y1={hub.y} x2={hub.x + len} y2={hub.y} stroke={C.leaf} strokeWidth={6} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={draw} />;
        })()}
        {(() => {
          const len = 60;
          const draw = interpolate(frame, [CARD - 16, CARD + 8], [len, 0], clamp);
          return <line x1={hub.x} y1={hub.y} x2={hub.x} y2={hub.y - len} stroke={C.leaf} strokeWidth={6} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={draw} />;
        })()}
      </svg>
      <TownRow />
      <Positioned x={hub.x} y={hub.y - 48}>
        <Popper delay={12} origin="center">
          <div style={{ boxShadow: `0 0 0 ${12 + Math.sin(frame / 8) * 4}px rgba(184,217,139,.45)`, borderRadius: "50%" }}>
            <LogoMark size={96} />
          </div>
        </Popper>
      </Positioned>
      <Positioned x={SUPPLIER.x} y={hub.y - 62}>
        <Popper delay={80} origin="center">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <SupplierTeam width={140} />
            <div style={{ fontFamily: FONT, fontSize: 22, fontWeight: 700, color: C.ink }}>Leverancier</div>
          </div>
        </Popper>
      </Positioned>
      <Positioned x={540} y={318}>
        <Popper delay={CARD} origin="bottom center">
          <div
            style={{
              width: 640,
              padding: "24px 32px",
              background: C.surface,
              border: `4px solid ${C.ink}`,
              borderRadius: "34px 10px 34px 10px",
              fontFamily: FONT,
              color: C.ink,
              boxShadow: "0 18px 44px rgba(22,52,43,.12)",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "0.12em", color: C.leaf }}>VOORSTEL · EPISTOLA</div>
            <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.03em", marginTop: 6 }}>Brieven automatisch vertalen</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 18 }}>
              {ORGS.map((org, i) => (
                <Popper key={org.name} delay={endorse[i]} origin="center">
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: org.accent, border: `3px solid ${C.ink}`, display: "grid", placeItems: "center", color: C.surface, fontWeight: 800, fontSize: 22 }}>
                    ✓
                  </div>
                </Popper>
              ))}
              <span style={{ marginLeft: 8, fontSize: 24, fontWeight: 700, color: C.muted, opacity: interpolate(frame, [endorse[3] + 10, endorse[3] + 25], [0, 1], clamp) }}>
                4 organisaties steunen dit
              </span>
            </div>
          </div>
        </Popper>
      </Positioned>
    </Scene>
  );
};
