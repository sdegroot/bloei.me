import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Beat, Em, Headline, Scene, clamp, useAppear, usePop } from "../anim";
import { Building, IconEasy, IconOpen, IconTogether, Logo, Plant, SupplierTeam } from "../illustrations";
import { MUSIC } from "../audio";
import { C, FINAL_PRICE, FONT, MAX_PRICE, ORGS, SUPPLIER_CONTRIBUTION, euro } from "../theme";

const PopIn: React.FC<{ delay: number; children: React.ReactNode; origin?: string; style?: React.CSSProperties }> = ({ delay, children, origin = "center", style }) => {
  const p = usePop(delay);
  return <div style={{ transform: `scale(${Math.max(0, p)})`, transformOrigin: origin, ...style }}>{children}</div>;
};

// ── 8. Fair share, in one beat ──────────────────────────────────────────────
export const SceneShares: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const strike = interpolate(frame, [18, 34], [0, 1], clamp);
  const final = usePop(36);
  return (
    <Scene duration={duration}>
      <Headline sub={<Beat from={110}>Nooit meer dan beloofd.</Beat>}>
        Ieder betaalt
        <br />
        <Em>een eerlijk deel.</Em>
      </Headline>
      <div style={{ position: "absolute", left: 80, top: 380, display: "flex", alignItems: "baseline", gap: 32, fontFamily: FONT }}>
        <div style={{ position: "relative", fontSize: 56, fontWeight: 800, color: C.muted, letterSpacing: "-0.04em" }}>
          {euro(MAX_PRICE)}
          <div style={{ position: "absolute", left: -6, top: "52%", height: 7, width: `${strike * 104}%`, background: C.rose, borderRadius: 4, transform: "rotate(-4deg)" }} />
        </div>
        <div style={{ fontSize: 100, fontWeight: 800, color: C.leaf, letterSpacing: "-0.05em", transform: `scale(${final})`, transformOrigin: "left center" }}>
          {euro(FINAL_PRICE)}
        </div>
      </div>
      <div style={{ position: "absolute", left: 80, right: 80, top: 520, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {[
          ...ORGS.map((org) => ({ key: org.name, name: org.name, amount: org.share, icon: <Building org={org} width={50} /> })),
          { key: "supplier", name: "Leverancier (zelf)", amount: SUPPLIER_CONTRIBUTION, icon: <SupplierTeam width={58} /> },
        ].map((f, i) => (
          <PopIn key={f.key} delay={60 + i * 12} style={i === 4 ? { gridColumn: "1 / -1", justifySelf: "center", width: "calc(50% - 9px)" } : undefined}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 22px", background: C.surface, border: `4px solid ${C.ink}`, borderRadius: 22, fontFamily: FONT }}>
              <div style={{ width: 58, display: "flex", justifyContent: "center" }}>{f.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: C.muted }}>{f.name}</div>
                <div style={{ fontSize: 38, fontWeight: 800, color: C.ink, letterSpacing: "-0.03em" }}>{euro(f.amount)}</div>
              </div>
            </div>
          </PopIn>
        ))}
      </div>
    </Scene>
  );
};

// ── 9. Transparent to the world ──────────────────────────────────────────────
export const SceneOpen: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const bloom = interpolate(frame, [15, 85], [0, 1], { ...clamp, easing: (t) => 1 - Math.pow(1 - t, 3) });
  const row = (i: number) => ({ opacity: interpolate(frame, [40 + i * 14, 52 + i * 14], [0, 1], clamp) });
  return (
    <Scene duration={duration}>
      <Headline sub="Wie financierde en wat er is opgeleverd: openbaar.">
        En iedereen <Em>kan meekijken.</Em>
      </Headline>
      <div style={{ position: "absolute", left: 40, top: 360, transform: `rotate(${Math.sin(frame / 18) * 2}deg)`, transformOrigin: "bottom center" }}>
        <Plant growth={1} bloom={bloom} width={290} />
      </div>
      <div style={{ position: "absolute", left: 390, top: 330, width: 630 }}>
        <PopIn delay={10}>
          <div style={{ border: `4px solid ${C.ink}`, borderRadius: 22, background: C.surface, overflow: "hidden", fontFamily: FONT, color: C.ink, boxShadow: "0 18px 44px rgba(22,52,43,.12)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", background: C.lime, borderBottom: `4px solid ${C.ink}`, fontSize: 22, fontWeight: 700, color: C.leafDark }}>
              <span style={{ padding: "4px 12px", background: C.surface, border: `3px solid ${C.ink}`, borderRadius: 999 }}>bloei.me/campagnes/epistola-vertalen</span>
            </div>
            <div style={{ padding: "22px 26px", display: "grid", gap: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", ...row(0) }}>
                <span style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em" }}>Brieven automatisch vertalen</span>
              </div>
              <div style={row(1)}>
                <span style={{ padding: "6px 16px", borderRadius: 999, background: C.leaf, color: C.surface, fontSize: 22, fontWeight: 800 }}>Geaccepteerd ✓</span>
              </div>
              <div style={row(2)}>
                <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "0.1em", color: C.muted }}>GEFINANCIERD DOOR</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                  {ORGS.map((o) => (
                    <span key={o.name} style={{ padding: "4px 12px", borderRadius: 999, background: o.facade, border: `3px solid ${o.accent}`, fontSize: 20, fontWeight: 700 }}>
                      {o.name}
                    </span>
                  ))}
                  <span style={{ padding: "4px 12px", borderRadius: 999, background: C.surface, border: `3px solid ${C.ink}`, fontSize: 20, fontWeight: 700 }}>
                    Leverancier
                  </span>
                </div>
              </div>
              <div style={{ ...row(3), display: "flex", alignItems: "center", gap: 12, fontSize: 24, fontWeight: 700 }}>
                <span style={{ fontFamily: "Menlo, monospace", color: C.leaf, fontWeight: 800 }}>{"</>"}</span>
                Resultaat beschikbaar als open source
              </div>
            </div>
          </div>
        </PopIn>
      </div>
    </Scene>
  );
};

// ── 10. The message ───────────────────────────────────────────────────────────
export const SceneMessage: React.FC<{ duration: number }> = ({ duration }) => {
  const items = [
    {
      icon: <IconTogether size={130} />,
      title: "Eén keer bouwen",
      text: "Eén gedeelde vraag, één aanbod. Ieder betaalt een eerlijk deel.",
      delay: 75,
    },
    {
      icon: <IconEasy size={130} />,
      title: "Weinig moeite",
      text: "Sluit aan bij een campagne en zeg een maximum toe. Meer hoeft niet.",
      delay: 120,
    },
    {
      icon: <IconOpen size={130} />,
      title: "Transparant",
      text: "Wie betaalt, wat er wordt gemaakt en wat het kost: voor iedereen zichtbaar.",
      delay: 195,
    },
  ];
  return (
    <Scene duration={duration}>
      <Headline>
        Samen <Em>goede producten</Em>
        <br />
        financieren.
      </Headline>
      <div style={{ position: "absolute", left: 80, right: 80, top: 330, display: "grid", gap: 44 }}>
        {items.map((it) => (
          <Row key={it.title} delay={it.delay}>
            <div style={{ display: "flex", alignItems: "center", gap: 34, fontFamily: FONT, color: C.ink }}>
              <div style={{ flex: "none" }}>{it.icon}</div>
              <div>
                <div style={{ fontSize: 46, fontWeight: 800, letterSpacing: "-0.03em" }}>{it.title}</div>
                <div style={{ marginTop: 6, fontSize: 30, fontWeight: 500, color: C.muted, lineHeight: 1.3 }}>{it.text}</div>
              </div>
            </div>
          </Row>
        ))}
      </div>
    </Scene>
  );
};

/** Row that slides in from the left. */
const Row: React.FC<{ delay: number; children: React.ReactNode }> = ({ delay, children }) => {
  const p = useAppear(delay);
  return <div style={{ opacity: p, transform: `translateX(${(1 - p) * -60}px)` }}>{children}</div>;
};

// ── 11. Call to action: what do you think? ──────────────────────────────────
const ASK = 60;
const REACH_OUT = 130;

export const SceneCTA: React.FC<{ duration: number }> = ({ duration }) => {
  const logo = usePop(6);
  const contact = useAppear(REACH_OUT);
  return (
    <Scene duration={duration}>
      <div style={{ position: "absolute", top: 110, left: 0, right: 0, display: "flex", justifyContent: "center", transform: `scale(${logo})` }}>
        <Logo size={84} />
      </div>
      <div style={{ position: "absolute", left: 80, right: 80, top: 290, textAlign: "center", fontFamily: FONT, color: C.ink }}>
        <Beat from={18}>
          <div style={{ fontSize: 104, fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1 }}>
            Wat denk <Em>jij?</Em>
          </div>
        </Beat>
        <Beat from={ASK}>
          <div style={{ marginTop: 30, fontSize: 42, fontWeight: 600, color: C.muted, lineHeight: 1.3 }}>
            Zou zo’n platform
            <br />
            kunnen werken?
          </div>
        </Beat>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 690, display: "flex", flexDirection: "column", alignItems: "center", gap: 20, fontFamily: FONT, opacity: contact, transform: `translateY(${(1 - contact) * 24}px)` }}>
        <div style={{ fontSize: 56, fontWeight: 800, color: C.leaf, letterSpacing: "-0.04em" }}>Laat het weten in de reacties.</div>
        <div style={{ fontSize: 28, fontWeight: 600, color: C.muted }}>of mail naar</div>
        <div style={{ padding: "12px 30px", borderRadius: 999, background: C.ink, color: C.surface, fontWeight: 800, fontSize: 34 }}>sander@epistola.app</div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 34, textAlign: "center", fontFamily: FONT, fontSize: 17, fontWeight: 500, color: C.muted, opacity: contact * 0.8 }}>
        Muziek: “{MUSIC.title}” – Kevin MacLeod (incompetech.com), CC BY 4.0
      </div>
    </Scene>
  );
};
