"use client";

import BuildingLogo from "@/components/BuildingLogo";
import { s } from "@/lib/css";
import { useIngoma } from "@/lib/store";

export default function HomesScreen() {
  const v = useIngoma();

  return (
    <div style={s("animation:fadeIn .3s ease;")}>
      {/* Category rail sits directly under the main header. */}
      <div
        style={s(
          "position:sticky;top:var(--hdr,78px);z-index:20;background:rgba(250,250,248,.94);backdrop-filter:blur(12px);border-bottom:1px solid #E8E8E8;"
        )}
      >
        <div className="sec"
          style={s(
            "max-width:1180px;margin:0 auto;padding:16px 48px;display:flex;gap:10px;overflow-x:auto;"
          )}
        >
          {v.categories.map((c) => (
            <div key={c.label} onClick={c.pick} style={c.style}>
              {c.label}
            </div>
          ))}
        </div>
      </div>

      <div className="homes-split" style={s("display:grid;grid-template-columns:1fr 40%;align-items:start;")}>
        <div className="homes-results" style={s("padding:28px 40px 70px 48px;")}>
          <div className="head-stack"
            style={s(
              "display:flex;align-items:flex-end;justify-content:space-between;gap:20px;"
            )}
          >
            <div>
              <div className="serif" style={s("font-size:26px;letter-spacing:-0.02em;")}>
                {v.resultCount} apartments in our collection
              </div>
              <div style={s("font-size:13.5px;color:#616161;margin-top:5px;")}>
                {v.filterSummary}
              </div>
            </div>
            <div className="homes-toolbar" style={s("display:flex;gap:10px;align-items:center;")}>
              <input className="homes-search"
                value={v.query}
                onChange={v.setQuery}
                placeholder="Search homes…"
                style={s(
                  "border:1px solid #E8E8E8;background:#fff;border-radius:999px;padding:10px 18px;font-size:13.5px;width:210px;"
                )}
              />
              <select
                value={v.priceCap}
                onChange={v.setPriceCap}
                style={s(
                  "border:1px solid #E8E8E8;background:#fff;border-radius:999px;padding:10px 16px;font-size:13.5px;font-weight:600;color:#212121;cursor:pointer;appearance:auto;"
                )}
              >
                {v.priceOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <div
                className="hv-soft"
                style={s(
                  "border:1px solid #E8E8E8;background:#fff;border-radius:999px;padding:10px 18px;font-size:13.5px;font-weight:600;cursor:pointer;"
                )}
              >
                Filters
              </div>
            </div>
          </div>

          <div className="grid-2"
            style={s(
              "display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:26px;"
            )}
          >
            {v.results.map((p) => (
              <div
                key={p.id}
                onMouseEnter={p.hover}
                onMouseLeave={p.unhover}
                style={p.cardStyle}
              >
                <div
                  onClick={p.open}
                  style={s(
                    "position:relative;height:230px;overflow:hidden;cursor:pointer;"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="zoom6"
                    src={p.img}
                    alt={p.title}
                    style={s(
                      "width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ease;"
                    )}
                  />
                  <div
                    onClick={p.toggleWish}
                    style={s(
                      "position:absolute;top:12px;right:12px;width:34px;height:34px;border-radius:999px;background:rgba(255,255,255,.94);display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.12);"
                    )}
                  >
                    <span style={p.heartStyle}>♥</span>
                  </div>
                  <div
                    style={s(
                      "position:absolute;bottom:12px;left:12px;background:rgba(255,255,255,.95);border-radius:999px;padding:5px 11px;font-size:11px;font-weight:600;color:#98771E;"
                    )}
                  >
                    Instant confirmation
                  </div>
                </div>
                <div style={s("padding:16px 18px 18px 18px;")}>
                  <div style={s("display:flex;justify-content:space-between;gap:10px;")}>
                    <div
                      onClick={p.open}
                      style={s(
                        "display:flex;align-items:center;gap:9px;font-size:16.5px;font-weight:600;cursor:pointer;"
                      )}
                    >
                      <BuildingLogo title={p.title} logo={p.logo} size={29} />
                      {p.title}
                    </div>
                    <div
                      style={s("font-size:13.5px;font-weight:600;white-space:nowrap;")}
                    >
                      ★ {p.rating}{" "}
                      <span style={s("color:#616161;font-weight:400;")}>
                        ({p.reviews})
                      </span>
                    </div>
                  </div>
                  <div style={s("font-size:13.5px;color:#616161;margin-top:4px;")}>
                    {p.location}
                  </div>
                  <div style={s("font-size:13px;color:#616161;margin-top:8px;")}>
                    {p.specs}
                  </div>
                  <div
                    style={s(
                      "font-size:13px;font-weight:600;color:#98771E;margin-top:6px;"
                    )}
                  >
                    {p.tierLabel}
                  </div>
                  <div
                    style={s(
                      "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-top:14px;"
                    )}
                  >
                    <div style={s("font-size:16px;white-space:nowrap;")}>
                      <span style={s("font-weight:700;")}>{p.priceLabel}</span>{" "}
                      <span style={s("color:#616161;font-size:13px;")}>/ night</span>
                    </div>
                    <div
                      className="hv-primary"
                      onClick={p.book}
                      style={s(
                        "background:#98771E;color:#fff;border-radius:12px;padding:9px 18px;font-size:13px;font-weight:600;cursor:pointer;"
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

        {/* Map column stays pinned beside the results as they scroll. */}
        <div className="homes-map"
          style={s(
            "position:sticky;top:calc(var(--hdr,78px) + 65px);height:calc(100vh - var(--hdr,78px) - 65px);"
          )}
        >
          <div className="homes-map-inner"
            style={s(
              "position:relative;width:100%;height:100%;border-left:1px solid #E8E8E8;background:#F5F0E2;"
            )}
          >
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=29.9950%2C-2.0350%2C30.1750%2C-1.9000&layer=mapnik"
              style={s("position:absolute;inset:0;width:100%;height:100%;border:0;")}
              title="Map of Kigali"
            />
            {v.mapPins.map((m) => (
              <div
                key={m.name}
                onClick={m.open}
                onMouseEnter={m.hover}
                onMouseLeave={m.unhover}
                style={m.wrapStyle}
              >
                <div style={m.nameStyle}>{m.name}</div>
                <div style={m.rowStyle}>
                  {m.prices.map((pr) => (
                    <div
                      key={pr.br}
                      style={s(
                        "background:#fff;border:1px solid #E8E8E8;border-radius:999px;padding:4px 9px;font-size:11px;font-weight:700;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,.14);"
                      )}
                    >
                      {pr.br} {pr.label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div
              style={s(
                "position:absolute;right:14px;bottom:12px;background:rgba(255,255,255,.92);border-radius:8px;padding:4px 10px;font-family:monospace;font-size:10.5px;color:#616161;"
              )}
            >
              © OpenStreetMap · pins approximate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
