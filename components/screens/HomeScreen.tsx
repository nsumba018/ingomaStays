"use client";

import { s } from "@/lib/css";
import { useIngoma } from "@/lib/store";

export default function HomeScreen() {
  const v = useIngoma();

  return (
    <div style={s("animation:fadeIn .3s ease;")}>
      {/* ---- hero + search ------------------------------------------------ */}
      <div className="sec" style={s("max-width:1180px;margin:0 auto;padding:28px 48px 0 48px;")}>
        <div
          className="hero-box"
          style={s(
            "position:relative;height:560px;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px rgba(33,33,33,.14);"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/kigali-hero.jpg"
            alt="Kigali city skyline"
            style={s(
              "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;"
            )}
          />
          <div
            style={s(
              "position:absolute;inset:0;background:linear-gradient(160deg,rgba(16,26,18,.5) 0%,rgba(16,26,18,.2) 45%,rgba(16,26,18,.66) 100%);"
            )}
          />
          <div
            className="hero-text"
            style={s(
              "position:absolute;left:64px;top:50%;transform:translateY(-50%);max-width:680px;color:#fff;animation:fadeUp .6s ease;"
            )}
          >
            <div
              style={s(
                "font-size:11px;letter-spacing:.24em;font-weight:600;color:rgba(255,255,255,.82);"
              )}
            >
              OWNED &amp; PROFESSIONALLY MANAGED BY INGOMA HOMES
            </div>
            <div
              className="serif hero-title"
              style={s(
                "font-size:56px;line-height:1.06;letter-spacing:-0.03em;margin-top:18px;text-wrap:pretty;"
              )}
            >
              Experience Kigali through two beautiful apartments
            </div>
            <div
              className="hero-sub"
              style={s(
                "font-size:17px;line-height:1.65;color:rgba(255,255,255,.9);margin-top:20px;max-width:560px;"
              )}
            >
              Keza Apartments in Kicukiro and Liza Apartments in Nyarugenge —
              both owned and professionally managed by our hospitality company.
            </div>
            <div className="hero-stats" style={s("display:flex;gap:26px;margin-top:28px;")}>
              {v.heroStats.map((stat) => (
                <div key={stat.label}>
                  <div className="serif" style={s("font-size:26px;")}>
                    {stat.value}
                  </div>
                  <div
                    style={s(
                      "font-size:12.5px;color:rgba(255,255,255,.75);margin-top:2px;"
                    )}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="sec-tight search-card"
          style={s(
            "margin:-44px 64px 0 64px;position:relative;background:#fff;border:1px solid #E8E8E8;border-radius:20px;box-shadow:0 16px 44px rgba(33,33,33,.14);padding:14px 14px 14px 28px;display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr auto;align-items:center;"
          )}
        >
          <div style={s("padding-right:20px;")}>
            <div
              style={s(
                "font-size:11.5px;font-weight:600;letter-spacing:.06em;color:#616161;"
              )}
            >
              DESTINATION
            </div>
            <input
              value={v.query}
              onChange={v.setQuery}
              placeholder="Kigali"
              style={s(
                "border:none;background:transparent;font-size:15px;font-weight:500;color:#212121;width:100%;margin-top:5px;"
              )}
            />
          </div>
          <div style={s("border-left:1px solid #E8E8E8;padding:0 20px;")}>
            <div
              style={s(
                "font-size:11.5px;font-weight:600;letter-spacing:.06em;color:#616161;"
              )}
            >
              CHECK-IN
            </div>
            <div style={s("font-size:15px;font-weight:500;margin-top:5px;")}>
              {v.ciLabel}
            </div>
          </div>
          <div style={s("border-left:1px solid #E8E8E8;padding:0 20px;")}>
            <div
              style={s(
                "font-size:11.5px;font-weight:600;letter-spacing:.06em;color:#616161;"
              )}
            >
              CHECK-OUT
            </div>
            <div style={s("font-size:15px;font-weight:500;margin-top:5px;")}>
              {v.coLabel}
            </div>
          </div>
          <div style={s("border-left:1px solid #E8E8E8;padding:0 20px;")}>
            <div
              style={s(
                "font-size:11.5px;font-weight:600;letter-spacing:.06em;color:#616161;"
              )}
            >
              GUESTS
            </div>
            <div
              style={s("display:flex;align-items:center;gap:12px;margin-top:2px;")}
            >
              <div
                onClick={v.decGuests}
                style={s(
                  "width:26px;height:26px;border-radius:999px;border:1px solid #E0E0E0;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#616161;font-size:14px;"
                )}
              >
                −
              </div>
              <div style={s("font-size:15px;font-weight:600;")}>{v.guests}</div>
              <div
                onClick={v.incGuests}
                style={s(
                  "width:26px;height:26px;border-radius:999px;border:1px solid #E0E0E0;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#616161;font-size:14px;"
                )}
              >
                +
              </div>
            </div>
          </div>
          <div
            className="hv-green search-cta"
            onClick={v.goHomes}
            style={s(
              "background:#2E7D32;color:#fff;border-radius:14px;padding:16px 32px;font-size:15px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:9px;transition:background .2s ease;"
            )}
          >
            <svg width="15" height="15" viewBox="0 0 18 18">
              <circle cx="8" cy="8" r="6" fill="none" stroke="#fff" strokeWidth="2" />
              <line
                x1="12.5"
                y1="12.5"
                x2="17"
                y2="17"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Find a home
          </div>
        </div>

        <div
          className="sec-tight"
          style={s(
            "margin:20px 64px 0 64px;display:flex;align-items:center;gap:26px;flex-wrap:wrap;"
          )}
        >
          {v.promises.map((p) => (
            <div
              key={p.label}
              style={s(
                "display:flex;align-items:center;gap:8px;font-size:13px;color:#616161;"
              )}
            >
              <span style={s("color:#2E7D32;font-weight:700;")}>✓</span>
              {p.label}
            </div>
          ))}
        </div>
      </div>

      {/* ---- our apartments ------------------------------------------------ */}
      <div className="sec" style={s("max-width:1180px;margin:0 auto;padding:56px 48px 0 48px;")}>
        <div
          className="head-stack"
          style={s("display:flex;align-items:baseline;justify-content:space-between;")}
        >
          <div>
            <div className="serif title-md" style={s("font-size:28px;letter-spacing:-0.02em;")}>
              Our apartments
            </div>
            <div style={s("font-size:15px;color:#616161;margin-top:6px;")}>
              Both apartments are owned, styled and serviced by our own team.
            </div>
          </div>
          <div
            onClick={v.goHomes}
            style={s(
              "font-size:14px;font-weight:600;color:#2E7D32;cursor:pointer;"
            )}
          >
            View both apartments →
          </div>
        </div>

        <div
          className="grid-2"
          style={s(
            "display:grid;grid-template-columns:repeat(2,1fr);gap:26px;margin-top:28px;"
          )}
        >
          {v.featured.map((p) => (
            <div key={p.id} style={p.cardStyle}>
              <div
                onClick={p.open}
                style={s(
                  "position:relative;height:250px;overflow:hidden;cursor:pointer;"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="zoom6"
                  src={p.img}
                  alt={`${p.title} interior`}
                  style={s(
                    "width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ease;"
                  )}
                />
                <div
                  onClick={p.toggleWish}
                  style={s(
                    "position:absolute;top:14px;right:14px;width:34px;height:34px;border-radius:999px;background:rgba(255,255,255,.94);display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.12);"
                  )}
                >
                  <span style={p.heartStyle}>♥</span>
                </div>
                <div
                  style={s(
                    "position:absolute;top:14px;left:14px;background:rgba(255,255,255,.95);border-radius:999px;padding:5px 12px;font-size:11px;font-weight:600;color:#2E7D32;"
                  )}
                >
                  Professionally managed
                </div>
              </div>
              <div style={s("padding:18px 20px 20px 20px;")}>
                <div style={s("display:flex;justify-content:space-between;gap:10px;")}>
                  <div
                    onClick={p.open}
                    style={s(
                      "font-size:17px;font-weight:600;line-height:1.3;cursor:pointer;"
                    )}
                  >
                    {p.title}
                  </div>
                  <div
                    style={s("font-size:13.5px;font-weight:600;white-space:nowrap;")}
                  >
                    ★ {p.rating}
                  </div>
                </div>
                <div style={s("font-size:13.5px;color:#616161;margin-top:4px;")}>
                  {p.location}
                </div>
                <div style={s("font-size:13px;color:#616161;margin-top:10px;")}>
                  {p.specs}
                </div>
                <div
                  style={s(
                    "font-size:13px;font-weight:600;color:#2E7D32;margin-top:6px;"
                  )}
                >
                  {p.tierLabel}
                </div>
                <div
                  style={s("display:flex;gap:7px;flex-wrap:wrap;margin-top:12px;")}
                >
                  {p.chips.map((c) => (
                    <div
                      key={c.label}
                      style={s(
                        "border:1px solid #E8E8E8;border-radius:999px;padding:5px 11px;font-size:11.5px;color:#616161;"
                      )}
                    >
                      {c.label}
                    </div>
                  ))}
                </div>
                <div
                  style={s(
                    "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-top:18px;"
                  )}
                >
                  <div style={s("font-size:17px;white-space:nowrap;")}>
                    <span style={s("font-weight:700;")}>{p.priceLabel}</span>{" "}
                    <span style={s("color:#616161;font-size:13.5px;")}>/ night</span>
                  </div>
                  <div
                    className="hv-green"
                    onClick={p.book}
                    style={s(
                      "background:#2E7D32;color:#fff;border-radius:12px;padding:10px 20px;font-size:13.5px;font-weight:600;cursor:pointer;transition:background .2s ease;"
                    )}
                  >
                    Book now
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- explore kigali ------------------------------------------------ */}
      <div className="sec" style={s("max-width:1180px;margin:0 auto;padding:64px 48px 0 48px;")}>
        <div className="serif title-md" style={s("font-size:28px;letter-spacing:-0.02em;")}>
          Explore Kigali
        </div>
        <div style={s("font-size:15px;color:#616161;margin-top:6px;")}>
          Two districts, one standard of service.
        </div>
        <div
          className="grid-2"
          style={s(
            "display:grid;grid-template-columns:repeat(2,1fr);gap:22px;margin-top:26px;"
          )}
        >
          {v.destinations.map((d) => (
            <div
              key={d.name}
              onClick={d.go}
              style={s(
                "position:relative;border-radius:20px;overflow:hidden;height:250px;cursor:pointer;"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="zoom5"
                src={d.img}
                alt={`${d.name} landscape`}
                style={s(
                  "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .5s ease;"
                )}
              />
              <div
                style={s(
                  "position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 38%,rgba(14,24,17,.74) 100%);"
                )}
              />
              <div
                style={s("position:absolute;left:22px;right:22px;bottom:20px;color:#fff;")}
              >
                <div className="serif" style={s("font-size:22px;")}>
                  {d.name} Collection
                </div>
                <div
                  style={s(
                    "font-size:13px;color:rgba(255,255,255,.85);margin-top:4px;"
                  )}
                >
                  {d.blurb}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- keza & liza feature ------------------------------------------- */}
      <div style={s("margin-top:80px;background:#15211A;color:#fff;")}>
        <div
          className="sec split-2"
          style={s(
            "max-width:1180px;margin:0 auto;padding:80px 48px;display:grid;grid-template-columns:1fr 1.1fr;gap:72px;align-items:center;"
          )}
        >
          <div>
            <div
              style={s(
                "font-size:11px;letter-spacing:.24em;font-weight:600;color:#D9B24A;"
              )}
            >
              KEZA &amp; LIZA
            </div>
            <div
              className="serif"
              style={s(
                "font-size:42px;line-height:1.12;letter-spacing:-0.025em;margin-top:20px;text-wrap:pretty;"
              )}
            >
              Two apartments, one standard of care
            </div>
            <div
              style={s(
                "font-size:16px;line-height:1.65;color:rgba(255,255,255,.72);margin-top:20px;max-width:440px;"
              )}
            >
              Daily housekeeping, airport pickup on request and a guest line that
              answers 24/7 — the same service in Kicukiro and Nyarugenge.
            </div>
            <div
              className="hv-gold"
              onClick={v.openLuxury}
              style={s(
                "margin-top:32px;display:inline-flex;align-items:center;gap:10px;border:1px solid rgba(217,178,74,.55);color:#D9B24A;border-radius:999px;padding:13px 26px;font-size:14.5px;font-weight:600;cursor:pointer;transition:background .2s ease;"
              )}
            >
              View both apartments →
            </div>
          </div>
          <div className="grid-2-tight" style={s("display:grid;grid-template-columns:1fr 1fr;gap:18px;")}>
            {v.luxury.map((p) => (
              <div key={p.id} onClick={p.open} style={s("cursor:pointer;")}>
                <div
                  style={s(
                    "border-radius:18px;overflow:hidden;height:300px;position:relative;"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="zoom5"
                    src={p.img}
                    alt={p.title}
                    style={s(
                      "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .5s ease;"
                    )}
                  />
                </div>
                <div style={s("font-size:15.5px;font-weight:600;margin-top:14px;")}>
                  {p.title}
                </div>
                <div
                  style={s(
                    "font-size:13px;color:rgba(255,255,255,.6);margin-top:4px;"
                  )}
                >
                  {p.location} · {p.priceLabel} / night
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- moods --------------------------------------------------------- */}
      <div className="sec" style={s("max-width:1180px;margin:0 auto;padding:80px 48px 0 48px;")}>
        <div className="serif title-md" style={s("font-size:28px;letter-spacing:-0.02em;")}>
          Find a home for your trip
        </div>
        <div
          className="grid-4"
          style={s(
            "display:grid;grid-template-columns:repeat(4,1fr);gap:22px;margin-top:26px;"
          )}
        >
          {v.moods.map((m) => (
            <div
              key={m.title}
              className="lift5"
              onClick={m.go}
              style={s(
                "cursor:pointer;background:#fff;border:1px solid #E8E8E8;border-radius:20px;overflow:hidden;"
              )}
            >
              <div style={s("height:180px;overflow:hidden;")}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="zoom6"
                  src={m.img}
                  alt={m.title}
                  style={s(
                    "width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ease;"
                  )}
                />
              </div>
              <div style={s("padding:18px 20px 20px 20px;")}>
                <div style={s("font-size:16.5px;font-weight:600;")}>{m.title}</div>
                <div
                  style={s(
                    "font-size:13.5px;color:#616161;margin-top:6px;line-height:1.55;"
                  )}
                >
                  {m.sub}
                </div>
                <div
                  style={s(
                    "font-size:13px;font-weight:600;color:#2E7D32;margin-top:12px;"
                  )}
                >
                  {m.count} homes →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- why stay with us ---------------------------------------------- */}
      <div className="sec" style={s("max-width:1180px;margin:0 auto;padding:80px 48px 0 48px;")}>
        <div
          className="split-2"
          style={s(
            "display:grid;grid-template-columns:1fr 1.05fr;gap:64px;align-items:center;"
          )}
        >
          <div className="grid-2-tight" style={s("display:grid;grid-template-columns:1fr 1fr;gap:16px;")}>
            {v.standardsImgs.map((i) => (
              <div
                key={i.src}
                style={s("border-radius:18px;overflow:hidden;height:210px;")}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={i.src}
                  alt={i.alt}
                  style={s(
                    "width:100%;height:100%;object-fit:cover;display:block;"
                  )}
                />
              </div>
            ))}
          </div>
          <div>
            <div className="serif title-md" style={s("font-size:28px;letter-spacing:-0.02em;")}>
              Why stay with us
            </div>
            <div
              style={s(
                "font-size:15.5px;color:#616161;margin-top:10px;line-height:1.65;"
              )}
            >
              One company, one standard. No unpredictable hosts, no surprises on
              arrival.
            </div>
            <div
              className="grid-2-tight"
              style={s(
                "display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:26px;"
              )}
            >
              {v.trust.map((t) => (
                <div key={t.title}>
                  <div
                    style={s(
                      "width:40px;height:40px;border-radius:12px;background:#EAF2EA;color:#2E7D32;display:flex;align-items:center;justify-content:center;font-size:16px;"
                    )}
                  >
                    {t.glyph}
                  </div>
                  <div style={s("font-size:15.5px;font-weight:600;margin-top:14px;")}>
                    {t.title}
                  </div>
                  <div
                    style={s(
                      "font-size:13.5px;color:#616161;margin-top:6px;line-height:1.6;"
                    )}
                  >
                    {t.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---- map ----------------------------------------------------------- */}
      <div className="sec" style={s("max-width:1180px;margin:0 auto;padding:80px 48px 0 48px;")}>
        <div className="serif title-md" style={s("font-size:28px;letter-spacing:-0.02em;")}>
          Where you&apos;ll find us
        </div>
        <div style={s("font-size:15px;color:#616161;margin-top:6px;")}>
          Both apartments are in Kigali — exact pins will be added with the street
          addresses.
        </div>
        <div
          className="split-2"
          style={s(
            "display:grid;grid-template-columns:1fr 340px;gap:24px;margin-top:26px;align-items:start;"
          )}
        >
          <div
            style={s(
              "position:relative;border-radius:20px;overflow:hidden;border:1px solid #E8E8E8;height:480px;"
            )}
          >
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=30.0150%2C-2.0250%2C30.1600%2C-1.9100&layer=mapnik"
              style={s("display:block;width:100%;height:480px;border:0;")}
              title="Map of Kigali"
            />
            <div
              style={s(
                "position:absolute;left:57%;top:63%;transform:translate(-50%,-100%);display:flex;flex-direction:column;align-items:center;pointer-events:none;"
              )}
            >
              <div
                style={s(
                  "background:#2E7D32;color:#fff;border-radius:999px;padding:7px 14px;font-size:12.5px;font-weight:700;box-shadow:0 6px 18px rgba(0,0,0,.25);white-space:nowrap;"
                )}
              >
                K · Keza Apartments
              </div>
              <div style={s("width:2px;height:10px;background:#2E7D32;")} />
              <div
                style={s(
                  "width:10px;height:10px;border-radius:999px;background:#2E7D32;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3);"
                )}
              />
            </div>
            <div
              style={s(
                "position:absolute;left:33%;top:36%;transform:translate(-50%,-100%);display:flex;flex-direction:column;align-items:center;pointer-events:none;"
              )}
            >
              <div
                style={s(
                  "background:#1976D2;color:#fff;border-radius:999px;padding:7px 14px;font-size:12.5px;font-weight:700;box-shadow:0 6px 18px rgba(0,0,0,.25);white-space:nowrap;"
                )}
              >
                L · Liza Apartments
              </div>
              <div style={s("width:2px;height:10px;background:#1976D2;")} />
              <div
                style={s(
                  "width:10px;height:10px;border-radius:999px;background:#1976D2;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3);"
                )}
              />
            </div>
          </div>
          <div style={s("display:flex;flex-direction:column;gap:16px;")}>
            <div
              style={s(
                "background:#fff;border:1px solid #E8E8E8;border-radius:18px;padding:20px;flex:1;"
              )}
            >
              <div style={s("display:flex;align-items:center;gap:10px;")}>
                <div
                  style={s(
                    "width:30px;height:30px;border-radius:999px;background:#2E7D32;color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;"
                  )}
                >
                  K
                </div>
                <div className="serif" style={s("font-size:16px;")}>
                  Keza Apartments
                </div>
              </div>
              <div
                style={s(
                  "font-size:13.5px;color:#616161;margin-top:10px;line-height:1.6;"
                )}
              >
                Kicukiro district · 10 min to the CBD, 15 min to Kigali
                International Airport.
              </div>
              <div
                style={s(
                  "font-size:12.5px;color:#9E9E9E;margin-top:8px;font-family:monospace;"
                )}
              >
                Street address &amp; map pin coming soon
              </div>
            </div>
            <div
              style={s(
                "background:#fff;border:1px solid #E8E8E8;border-radius:18px;padding:20px;flex:1;"
              )}
            >
              <div style={s("display:flex;align-items:center;gap:10px;")}>
                <div
                  style={s(
                    "width:30px;height:30px;border-radius:999px;background:#1976D2;color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;"
                  )}
                >
                  L
                </div>
                <div className="serif" style={s("font-size:16px;")}>
                  Liza Apartments
                </div>
              </div>
              <div
                style={s(
                  "font-size:13.5px;color:#616161;margin-top:10px;line-height:1.6;"
                )}
              >
                Nyarugenge district · in the city centre, markets and dining on
                foot.
              </div>
              <div
                style={s(
                  "font-size:12.5px;color:#9E9E9E;margin-top:8px;font-family:monospace;"
                )}
              >
                Street address &amp; map pin coming soon
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---- testimonials --------------------------------------------------- */}
      <div className="sec" style={s("max-width:1180px;margin:0 auto;padding:80px 48px 0 48px;")}>
        <div className="serif title-md" style={s("font-size:28px;letter-spacing:-0.02em;")}>
          Guest reviews
        </div>
        <div style={s("font-size:15px;color:#616161;margin-top:6px;")}>
          4.93 average across {v.totalReviews} verified stays.
        </div>
        <div
          className="grid-3"
          style={s(
            "display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:26px;"
          )}
        >
          {v.testimonials.map((t) => (
            <div
              key={t.name}
              style={s(
                "background:#fff;border:1px solid #E8E8E8;border-radius:20px;padding:26px;"
              )}
            >
              <div style={s("font-size:13px;color:#F9A825;")}>★★★★★</div>
              <div
                style={s(
                  "font-size:15px;line-height:1.65;color:#424242;margin-top:14px;text-wrap:pretty;"
                )}
              >
                “{t.quote}”
              </div>
              <div
                style={s("display:flex;align-items:center;gap:12px;margin-top:20px;")}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.img}
                  alt={t.name}
                  style={s(
                    "width:40px;height:40px;border-radius:999px;object-fit:cover;"
                  )}
                />
                <div>
                  <div style={s("font-size:13.5px;font-weight:600;")}>{t.name}</div>
                  <div style={s("font-size:12.5px;color:#616161;")}>
                    {t.place} · stayed at {t.home}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- faqs ----------------------------------------------------------- */}
      <div className="sec" style={s("max-width:1180px;margin:0 auto;padding:80px 48px 0 48px;")}>
        <div
          className="split-2"
          style={s(
            "display:grid;grid-template-columns:340px 1fr;gap:64px;align-items:start;"
          )}
        >
          <div>
            <div className="serif title-md" style={s("font-size:28px;letter-spacing:-0.02em;")}>
              Frequently asked questions
            </div>
            <div
              style={s(
                "font-size:14.5px;color:#616161;margin-top:12px;line-height:1.65;"
              )}
            >
              Still unsure? Our guest team answers in under an hour, 24/7.
            </div>
            <div
              onClick={v.goContact}
              style={s(
                "margin-top:18px;font-size:14px;font-weight:600;color:#2E7D32;cursor:pointer;"
              )}
            >
              Contact us →
            </div>
          </div>
          <div
            style={s(
              "background:#fff;border:1px solid #E8E8E8;border-radius:20px;overflow:hidden;"
            )}
          >
            {v.faqs.map((f) => (
              <div key={f.q} style={s("border-bottom:1px solid #F0F0EE;")}>
                <div
                  onClick={f.toggle}
                  style={s(
                    "padding:20px 26px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;gap:20px;"
                  )}
                >
                  <div style={s("font-size:15.5px;font-weight:600;")}>{f.q}</div>
                  <div style={f.iconStyle}>+</div>
                </div>
                {f.open && (
                  <div
                    style={s(
                      "padding:0 26px 22px 26px;font-size:14.5px;line-height:1.7;color:#616161;max-width:720px;"
                    )}
                  >
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- newsletter ----------------------------------------------------- */}
      <div className="sec" style={s("max-width:1180px;margin:0 auto;padding:80px 48px 0 48px;")}>
        <div
          className="newsletter"
          style={s(
            "position:relative;border-radius:24px;overflow:hidden;padding:64px;display:flex;align-items:center;justify-content:space-between;gap:48px;"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/u1470071459604_3b5ec3a7fe05.jpg"
            alt="Tea plantation hills at sunrise"
            style={s(
              "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;"
            )}
          />
          <div
            style={s(
              "position:absolute;inset:0;background:linear-gradient(90deg,rgba(14,24,17,.8) 30%,rgba(14,24,17,.35) 100%);"
            )}
          />
          <div style={s("position:relative;color:#fff;max-width:520px;")}>
            <div
              className="serif"
              style={s("font-size:32px;line-height:1.15;letter-spacing:-0.02em;")}
            >
              New apartments, first look
            </div>
            <div
              style={s(
                "font-size:15px;color:rgba(255,255,255,.82);margin-top:12px;line-height:1.6;"
              )}
            >
              Be the first to hear about new apartments, seasonal rates and Kigali
              travel tips.
            </div>
          </div>
          <div
            className="newsletter-form"
            style={s(
              "position:relative;display:flex;gap:10px;background:rgba(255,255,255,.96);border-radius:16px;padding:8px;min-width:420px;"
            )}
          >
            <input
              placeholder="you@email.com"
              style={s(
                "flex:1;border:none;background:transparent;font-size:15px;padding:12px 14px;"
              )}
            />
            <div
              className="hv-green"
              style={s(
                "background:#2E7D32;color:#fff;border-radius:12px;padding:13px 26px;font-size:14.5px;font-weight:600;cursor:pointer;white-space:nowrap;"
              )}
            >
              Subscribe
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
