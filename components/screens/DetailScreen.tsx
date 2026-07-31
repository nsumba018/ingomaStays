"use client";

import { s } from "@/lib/css";
import { useIngoma } from "@/lib/store";

export default function DetailScreen() {
  const v = useIngoma();

  return (
    <div className="sec"
      style={s(
        "max-width:1180px;margin:0 auto;padding:32px 48px 90px 48px;animation:fadeIn .3s ease;"
      )}
    >
      <div
        className="hv-dark"
        onClick={v.closeDetail}
        style={s(
          "font-size:13.5px;font-weight:600;color:#616161;cursor:pointer;display:inline-flex;align-items:center;gap:6px;"
        )}
      >
        ‹ Back to our homes
      </div>

      <div className="detail-head"
        style={s(
          "display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin-top:16px;"
        )}
      >
        <div>
          <div
            style={s(
              "font-size:11px;letter-spacing:.2em;font-weight:600;color:#2E7D32;"
            )}
          >
            {v.sel.collection}, KIGALI · MANAGED BY INGOMA HOMES
          </div>
          <div
            className="serif detail-title"
            style={s(
              "font-size:38px;letter-spacing:-0.03em;line-height:1.12;margin-top:10px;"
            )}
          >
            {v.sel.title}
          </div>
          <div
            style={s(
              "display:flex;gap:16px;margin-top:10px;font-size:14px;align-items:center;flex-wrap:wrap;"
            )}
          >
            <div style={s("font-weight:600;")}>★ {v.sel.rating}</div>
            <div style={s("color:#616161;text-decoration:underline;cursor:pointer;")}>
              {v.sel.reviews} verified reviews
            </div>
            <div style={s("color:#616161;")}>{v.sel.location}, Kigali</div>
            <div style={s("color:#616161;")}>{v.sel.specs}</div>
          </div>
        </div>
        <div style={s("display:flex;gap:12px;")}>
          <div
            className="hv-soft"
            style={s(
              "border:1px solid #E8E8E8;border-radius:12px;padding:10px 18px;font-size:13.5px;font-weight:600;cursor:pointer;background:#fff;"
            )}
          >
            Share
          </div>
          <div
            className="hv-soft"
            onClick={v.selToggleWish}
            style={s(
              "border:1px solid #E8E8E8;border-radius:12px;padding:10px 18px;font-size:13.5px;font-weight:600;cursor:pointer;background:#fff;display:flex;align-items:center;gap:8px;"
            )}
          >
            <span style={v.selHeartStyle}>♥</span> {v.saveLabel}
          </div>
        </div>
      </div>

      {/* ---- gallery mosaic ------------------------------------------------ */}
      <div style={s("position:relative;margin-top:22px;")}>
        <div className="detail-gallery"
          style={s(
            "display:grid;grid-template-columns:2fr 1fr 1fr;grid-template-rows:200px 200px;gap:10px;border-radius:22px;overflow:hidden;"
          )}
        >
          {v.selGallery.map((g, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={g.src}
              onClick={v.openGallery}
              alt={g.alt}
              style={g.style}
            />
          ))}
        </div>
        <div
          onClick={v.openGallery}
          style={s(
            "position:absolute;right:18px;bottom:18px;background:rgba(255,255,255,.96);border:1px solid #E0E0E0;border-radius:12px;padding:10px 18px;font-size:13.5px;font-weight:600;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.14);"
          )}
        >
          Show all {v.galleryCount} photos
        </div>
      </div>

      <div className="detail-split"
        style={s(
          "display:grid;grid-template-columns:1fr 400px;gap:72px;margin-top:44px;align-items:start;"
        )}
      >
        <div>
          <div
            style={s(
              "display:flex;gap:14px;flex-wrap:wrap;padding-bottom:26px;border-bottom:1px solid #E8E8E8;"
            )}
          >
            {v.selServices.map((sv) => (
              <div
                key={sv.label}
                style={s(
                  "display:flex;align-items:center;gap:9px;background:#fff;border:1px solid #E8E8E8;border-radius:14px;padding:12px 16px;font-size:13.5px;font-weight:500;"
                )}
              >
                <span style={s("color:#2E7D32;")}>✓</span>
                {sv.label}
              </div>
            ))}
          </div>

          {/* ---- unit picker ------------------------------------------------ */}
          <div style={s("padding:26px 0;border-bottom:1px solid #E8E8E8;")}>
            <div
              style={s(
                "display:flex;align-items:baseline;justify-content:space-between;gap:16px;"
              )}
            >
              <div className="serif" style={s("font-size:20px;font-weight:600;")}>
                Choose your unit
              </div>
              <div style={s("font-size:13.5px;font-weight:600;color:#2E7D32;")}>
                {v.availSummary}
              </div>
            </div>
            <div style={s("font-size:13.5px;color:#616161;margin-top:6px;")}>
              Each building has 19 units. Availability follows your dates — change
              them in the booking card and the grid updates.
            </div>
            {v.unitGroups.map((g) => (
              <div key={g.label} style={s("margin-top:20px;")}>
                <div
                  style={s(
                    "display:flex;justify-content:space-between;align-items:baseline;gap:12px;"
                  )}
                >
                  <div style={s("font-size:15.5px;font-weight:600;")}>{g.label}</div>
                  <div
                    style={s("font-size:13.5px;font-weight:700;color:#2E7D32;")}
                  >
                    {g.priceLabel}
                  </div>
                </div>
                <div className="unit-grid"
                  style={s(
                    "display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:12px;"
                  )}
                >
                  {g.units.map((u) => (
                    <div key={u.n} onClick={u.pick} style={u.style}>
                      <div
                        style={s(
                          "display:flex;justify-content:space-between;align-items:center;gap:6px;"
                        )}
                      >
                        <div style={s("font-size:14px;font-weight:700;")}>
                          Unit {u.n}
                        </div>
                        <div style={u.badgeStyle}>{u.status}</div>
                      </div>
                      <div
                        style={s("font-size:12.5px;color:#616161;margin-top:6px;")}
                      >
                        {u.type} · sleeps {u.sleeps}
                      </div>
                      <div style={s("font-size:13.5px;margin-top:8px;")}>
                        <span style={s("font-weight:700;")}>{u.priceLabel}</span>{" "}
                        <span style={s("color:#616161;font-size:12px;")}>
                          / night
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={s("padding:26px 0;border-bottom:1px solid #E8E8E8;")}>
            <div className="serif" style={s("font-size:20px;font-weight:600;")}>
              About this building
            </div>
            <div
              style={s(
                "font-size:16.5px;line-height:1.8;color:#424242;margin-top:14px;text-wrap:pretty;"
              )}
            >
              {v.sel.desc}
            </div>
          </div>

          <div style={s("padding:26px 0;border-bottom:1px solid #E8E8E8;")}>
            <div className="serif" style={s("font-size:20px;font-weight:600;")}>
              Why you’ll love staying here
            </div>
            <div className="grid-2-tight"
              style={s(
                "display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:18px;"
              )}
            >
              {v.selLoves.map((l) => (
                <div
                  key={l.title}
                  style={s(
                    "background:#fff;border:1px solid #E8E8E8;border-radius:16px;padding:20px;"
                  )}
                >
                  <div style={s("font-size:15px;font-weight:600;")}>{l.title}</div>
                  <div
                    style={s(
                      "font-size:13.5px;color:#616161;margin-top:6px;line-height:1.6;"
                    )}
                  >
                    {l.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={s("padding:26px 0;border-bottom:1px solid #E8E8E8;")}>
            <div className="serif" style={s("font-size:20px;font-weight:600;")}>
              Amenities
            </div>
            <div className="grid-2-tight"
              style={s(
                "display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:18px;"
              )}
            >
              {v.selAmenities.map((a) => (
                <div
                  key={a.label}
                  style={s(
                    "display:flex;align-items:center;gap:10px;font-size:14.5px;color:#424242;"
                  )}
                >
                  <span style={s("color:#2E7D32;")}>✓</span> {a.label}
                </div>
              ))}
            </div>
          </div>

          <div style={s("padding:26px 0;border-bottom:1px solid #E8E8E8;")}>
            <div className="serif" style={s("font-size:20px;font-weight:600;")}>
              Unit types
            </div>
            <div className="grid-3"
              style={s(
                "display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:18px;"
              )}
            >
              {v.selBedrooms.map((b) => (
                <div
                  key={b.name}
                  style={s(
                    "background:#fff;border:1px solid #E8E8E8;border-radius:16px;overflow:hidden;"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={b.img}
                    alt={b.name}
                    style={s(
                      "width:100%;height:130px;object-fit:cover;display:block;"
                    )}
                  />
                  <div style={s("padding:16px 18px;")}>
                    <div style={s("font-size:14.5px;font-weight:600;")}>
                      {b.name}
                    </div>
                    <div style={s("font-size:13px;color:#616161;margin-top:5px;")}>
                      {b.bed}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={s("padding:26px 0;border-bottom:1px solid #E8E8E8;")}>
            <div className="grid-2-tight" style={s("display:grid;grid-template-columns:1fr 1fr;gap:44px;")}>
              <div>
                <div className="serif" style={s("font-size:20px;font-weight:600;")}>
                  House rules
                </div>
                <div
                  style={s(
                    "display:flex;flex-direction:column;gap:11px;margin-top:16px;"
                  )}
                >
                  {v.houseRules.map((r) => (
                    <div
                      key={r.label}
                      style={s(
                        "font-size:14.5px;color:#424242;display:flex;justify-content:space-between;border-bottom:1px solid #F2F2F0;padding-bottom:10px;"
                      )}
                    >
                      <span>{r.label}</span>
                      <span style={s("color:#616161;")}>{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="serif" style={s("font-size:20px;font-weight:600;")}>
                  Things to do nearby
                </div>
                <div
                  style={s(
                    "display:flex;flex-direction:column;gap:11px;margin-top:16px;"
                  )}
                >
                  {v.selNearby.map((n) => (
                    <div
                      key={n.label}
                      style={s(
                        "font-size:14.5px;color:#424242;display:flex;justify-content:space-between;border-bottom:1px solid #F2F2F0;padding-bottom:10px;"
                      )}
                    >
                      <span>{n.label}</span>
                      <span style={s("color:#616161;")}>{n.dist}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={s("padding:26px 0;border-bottom:1px solid #E8E8E8;")}>
            <div className="serif" style={s("font-size:20px;font-weight:600;")}>
              ★ {v.sel.rating} · {v.sel.reviews} guest reviews
            </div>
            <div className="grid-2-tight"
              style={s(
                "display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:20px;"
              )}
            >
              {v.selReviews.map((r) => (
                <div
                  key={r.name}
                  style={s(
                    "background:#fff;border:1px solid #E8E8E8;border-radius:18px;padding:22px;"
                  )}
                >
                  <div style={s("display:flex;align-items:center;gap:12px;")}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.img}
                      alt={r.name}
                      style={s(
                        "width:40px;height:40px;border-radius:999px;object-fit:cover;"
                      )}
                    />
                    <div>
                      <div style={s("font-size:14px;font-weight:600;")}>{r.name}</div>
                      <div style={s("font-size:11.5px;color:#F9A825;")}>
                        ★★★★★ <span style={s("color:#616161;")}>· {r.when}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    style={s(
                      "font-size:14px;line-height:1.65;color:#424242;margin-top:12px;"
                    )}
                  >
                    {r.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={s("padding:26px 0;")}>
            <div className="serif" style={s("font-size:20px;font-weight:600;")}>
              Location
            </div>
            <div
              style={s(
                "margin-top:18px;position:relative;height:320px;border-radius:20px;overflow:hidden;border:1px solid #E8E8E8;background:repeating-linear-gradient(45deg,#EDF1EA,#EDF1EA 14px,#E6ECE3 14px,#E6ECE3 28px);"
              )}
            >
              <div
                style={s(
                  "position:absolute;left:48%;top:44%;width:18px;height:18px;border-radius:999px;background:#2E7D32;border:4px solid #fff;box-shadow:0 3px 10px rgba(0,0,0,.28);"
                )}
              />
              <div
                style={s(
                  "position:absolute;right:16px;bottom:14px;font-family:monospace;font-size:11px;color:#8AA08C;"
                )}
              >
                map · {v.sel.location}
              </div>
            </div>
            <div
              style={s(
                "font-size:14px;color:#616161;margin-top:14px;line-height:1.6;"
              )}
            >
              {v.sel.dist} · Exact address and door code are sent with your arrival
              instructions.
            </div>
          </div>
        </div>

        {/* ---- booking card ------------------------------------------------ */}
        <div className="detail-aside" style={s("position:sticky;top:calc(var(--hdr,78px) + 32px);")}>
          <div
            style={s(
              "background:#fff;border:1px solid #E8E8E8;border-radius:22px;padding:26px;box-shadow:0 16px 40px rgba(33,33,33,.10);"
            )}
          >
            <div
              style={s(
                "display:flex;align-items:baseline;justify-content:space-between;"
              )}
            >
              <div>
                <span style={s("font-size:26px;font-weight:700;")}>
                  {v.selPriceLabel}
                </span>{" "}
                <span style={s("color:#616161;font-size:14px;")}>/ night</span>
              </div>
              <div style={s("font-size:13.5px;font-weight:600;")}>
                ★ {v.sel.rating}
              </div>
            </div>
            <div
              style={s(
                "margin-top:8px;display:inline-flex;align-items:center;gap:8px;background:#EAF2EA;color:#2E7D32;border-radius:999px;padding:5px 12px;font-size:12px;font-weight:700;"
              )}
            >
              Unit {v.unitN} · {v.unitType}
            </div>

            <div
              style={s(
                "margin-top:18px;border:1px solid #E0E0E0;border-radius:14px;overflow:hidden;"
              )}
            >
              <div style={s("display:grid;grid-template-columns:1fr 1fr;")}>
                <div style={s("padding:12px 16px;border-right:1px solid #E0E0E0;")}>
                  <div
                    style={s(
                      "font-size:10.5px;font-weight:600;letter-spacing:.06em;color:#616161;"
                    )}
                  >
                    CHECK-IN
                  </div>
                  <div style={s("font-size:14px;font-weight:500;margin-top:3px;")}>
                    {v.ciLabel}
                  </div>
                </div>
                <div style={s("padding:12px 16px;")}>
                  <div
                    style={s(
                      "font-size:10.5px;font-weight:600;letter-spacing:.06em;color:#616161;"
                    )}
                  >
                    CHECK-OUT
                  </div>
                  <div style={s("font-size:14px;font-weight:500;margin-top:3px;")}>
                    {v.coLabel}
                  </div>
                </div>
              </div>
              <div
                style={s(
                  "border-top:1px solid #E0E0E0;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;"
                )}
              >
                <div>
                  <div
                    style={s(
                      "font-size:10.5px;font-weight:600;letter-spacing:.06em;color:#616161;"
                    )}
                  >
                    GUESTS
                  </div>
                  <div style={s("font-size:14px;font-weight:500;margin-top:3px;")}>
                    {v.guests} of {v.maxGuests} max
                  </div>
                </div>
                <div style={s("display:flex;align-items:center;gap:12px;")}>
                  <div
                    onClick={v.decGuests}
                    style={s(
                      "width:28px;height:28px;border-radius:999px;border:1px solid #E0E0E0;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#616161;"
                    )}
                  >
                    −
                  </div>
                  <div
                    onClick={v.incGuests}
                    style={s(
                      "width:28px;height:28px;border-radius:999px;border:1px solid #E0E0E0;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#616161;"
                    )}
                  >
                    +
                  </div>
                </div>
              </div>
            </div>

            <div style={s("display:flex;gap:7px;flex-wrap:wrap;margin-top:14px;")}>
              {v.dateChips.map((d) => (
                <div key={d.label} onClick={d.pick} style={d.style}>
                  {d.label}
                </div>
              ))}
            </div>

            <div
              className="hv-green"
              onClick={v.openBooking}
              style={s(
                "margin-top:18px;background:#2E7D32;color:#fff;border-radius:14px;padding:16px;text-align:center;font-size:16px;font-weight:600;cursor:pointer;transition:background .2s ease;"
              )}
            >
              Book now
            </div>
            <div
              style={s(
                "text-align:center;font-size:12.5px;color:#616161;margin-top:12px;"
              )}
            >
              Free cancellation up to 48 hours before check-in
            </div>

            <div
              style={s(
                "margin-top:20px;display:flex;flex-direction:column;gap:10px;"
              )}
            >
              <div
                style={s(
                  "display:flex;justify-content:space-between;font-size:14px;color:#424242;"
                )}
              >
                <span>{v.lineNights}</span>
                <span>{v.lineNightsTotal}</span>
              </div>
              <div
                style={s(
                  "display:flex;justify-content:space-between;font-size:14px;color:#424242;"
                )}
              >
                <span>Housekeeping</span>
                <span>{v.lineCleaning}</span>
              </div>
              <div
                style={s(
                  "display:flex;justify-content:space-between;font-size:14px;color:#424242;"
                )}
              >
                <span>Service &amp; support</span>
                <span>{v.lineService}</span>
              </div>
            </div>
            <div
              style={s(
                "border-top:1px solid #EEE;margin-top:16px;padding-top:16px;display:flex;justify-content:space-between;font-size:16px;font-weight:700;"
              )}
            >
              <span>Total</span>
              <span>{v.lineTotal}</span>
            </div>
          </div>
          <div
            style={s(
              "margin-top:14px;font-size:12.5px;color:#616161;text-align:center;line-height:1.6;"
            )}
          >
            🔒 Secure payment direct to Ingoma Homes · No third-party host
          </div>
        </div>
      </div>
    </div>
  );
}
