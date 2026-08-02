"use client";

import { s } from "@/lib/css";
import { useIngoma } from "@/lib/store";

export default function DashboardScreen() {
  const v = useIngoma();

  return (
    <div className="sec dash-split"
      style={s(
        "max-width:1180px;margin:0 auto;padding:44px 48px 90px 48px;animation:fadeIn .3s ease;display:grid;grid-template-columns:230px 1fr;gap:48px;align-items:start;"
      )}
    >
      <div className="dash-nav"
        style={s(
          "position:sticky;top:calc(var(--hdr,78px) + 32px);display:flex;flex-direction:column;gap:2px;"
        )}
      >
        {v.dashNav.map((n) => (
          <div key={n.label} onClick={n.pick} style={n.style}>
            {n.label}
          </div>
        ))}
      </div>

      <div>
        <div className="serif title-lg" style={s("font-size:36px;letter-spacing:-0.025em;")}>
          {v.dashTitle}
        </div>

        {v.dashIsBookings && (
          <>
            {v.hasTrip && (
              <div className="trip-card"
                style={s(
                  "margin-top:26px;background:#fff;border:1px solid #E8E8E8;border-radius:22px;overflow:hidden;display:grid;grid-template-columns:340px 1fr;"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={v.trip.img}
                  alt={v.trip.title}
                  style={s(
                    "width:100%;height:100%;min-height:240px;object-fit:cover;display:block;"
                  )}
                />
                <div style={s("padding:28px 30px;")}>
                  <div style={s("display:flex;gap:8px;")}>
                    <div
                      style={s(
                        "background:#F7EFD5;color:#98771E;border-radius:999px;padding:5px 12px;font-size:11.5px;font-weight:600;"
                      )}
                    >
                      Confirmed
                    </div>
                    <div
                      style={s(
                        "background:#FFF6E0;color:#8A6100;border-radius:999px;padding:5px 12px;font-size:11.5px;font-weight:600;"
                      )}
                    >
                      Booking {v.trip.ref}
                    </div>
                  </div>
                  <div className="serif" style={s("font-size:24px;margin-top:14px;")}>
                    {v.trip.title}
                  </div>
                  <div style={s("font-size:14.5px;color:#616161;margin-top:6px;")}>
                    {v.trip.dates} · {v.trip.guests} guests · {v.trip.total} paid
                  </div>
                  <div style={s("font-size:13.5px;color:#616161;margin-top:10px;")}>
                    Extras: {v.trip.extras}
                  </div>
                  <div
                    style={s(
                      "display:flex;gap:12px;margin-top:22px;flex-wrap:wrap;"
                    )}
                  >
                    <div
                      className="hv-primary"
                      onClick={v.openArrival}
                      style={s(
                        "background:#98771E;color:#fff;border-radius:12px;padding:11px 20px;font-size:13.5px;font-weight:600;cursor:pointer;"
                      )}
                    >
                      Arrival instructions
                    </div>
                    <div
                      className="hv-soft"
                      style={s(
                        "border:1px solid #E8E8E8;border-radius:12px;padding:11px 20px;font-size:13.5px;font-weight:600;cursor:pointer;"
                      )}
                    >
                      Message support
                    </div>
                    <div
                      className="hv-soft"
                      style={s(
                        "border:1px solid #E8E8E8;border-radius:12px;padding:11px 20px;font-size:13.5px;font-weight:600;cursor:pointer;color:#616161;"
                      )}
                    >
                      Download receipt
                    </div>
                  </div>
                </div>
              </div>
            )}

            {v.noTrip && (
              <div
                style={s(
                  "margin-top:26px;padding:70px;border:1px dashed #DCDCD8;border-radius:24px;text-align:center;color:#616161;"
                )}
              >
                <div style={s("font-size:18px;font-weight:600;color:#212121;")}>
                  No upcoming bookings
                </div>
                <div style={s("font-size:14.5px;margin-top:8px;")}>
                  Reserve a home and it will appear here with your arrival
                  instructions.
                </div>
                <div
                  onClick={v.goHomes}
                  style={s(
                    "display:inline-block;margin-top:22px;background:#98771E;color:#fff;border-radius:999px;padding:13px 28px;font-size:14.5px;font-weight:600;cursor:pointer;"
                  )}
                >
                  Browse our homes
                </div>
              </div>
            )}

            <div className="serif" style={s("margin-top:40px;font-size:22px;")}>
              Past stays
            </div>
            <div className="grid-3"
              style={s(
                "display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:18px;"
              )}
            >
              {v.pastStays.map((p) => (
                <div
                  key={p.id}
                  style={s(
                    "background:#fff;border:1px solid #E8E8E8;border-radius:20px;overflow:hidden;"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.img}
                    alt={p.title}
                    style={s(
                      "width:100%;height:150px;object-fit:cover;display:block;"
                    )}
                  />
                  <div style={s("padding:16px 18px 18px 18px;")}>
                    <div style={s("font-size:15px;font-weight:600;")}>{p.title}</div>
                    <div style={s("font-size:12.5px;color:#616161;margin-top:4px;")}>
                      {p.when} · {p.total}
                    </div>
                    <div style={s("display:flex;gap:10px;margin-top:12px;")}>
                      <div
                        className="hv-soft"
                        onClick={p.book}
                        style={s(
                          "border:1px solid #E8E8E8;border-radius:10px;padding:8px 14px;font-size:12.5px;font-weight:600;cursor:pointer;"
                        )}
                      >
                        Book again
                      </div>
                      <div
                        className="hv-soft"
                        style={s(
                          "border:1px solid #E8E8E8;border-radius:10px;padding:8px 14px;font-size:12.5px;font-weight:600;cursor:pointer;color:#616161;"
                        )}
                      >
                        Write review
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {v.dashIsPayments && (
          <div
            style={s(
              "margin-top:26px;background:#fff;border:1px solid #E8E8E8;border-radius:20px;overflow:hidden;"
            )}
          >
            <div className="pay-head"
              style={s(
                "display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr auto;padding:16px 24px;background:#F8F5EC;font-size:12px;font-weight:600;color:#616161;letter-spacing:.04em;"
              )}
            >
              <div>HOME</div>
              <div>DATES</div>
              <div>METHOD</div>
              <div>AMOUNT</div>
              <div>RECEIPT</div>
            </div>
            {v.payments.map((r, i) => (
              <div className="pay-row"
                key={i}
                style={s(
                  "display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr auto;padding:18px 24px;border-top:1px solid #F0F0EE;font-size:14px;align-items:center;"
                )}
              >
                <div style={s("font-weight:600;")}>{r.home}</div>
                <div style={s("color:#616161;")}>{r.dates}</div>
                <div style={s("color:#616161;")}>{r.method}</div>
                <div style={s("font-weight:600;")}>{r.amount}</div>
                <div style={s("color:#98771E;font-weight:600;cursor:pointer;")}>
                  PDF
                </div>
              </div>
            ))}
          </div>
        )}

        {v.dashIsMessages && (
          <div
            style={s(
              "margin-top:26px;background:#fff;border:1px solid #E8E8E8;border-radius:22px;overflow:hidden;display:grid;grid-template-columns:1fr;"
            )}
          >
            <div
              style={s(
                "padding:18px 24px;border-bottom:1px solid #F0F0EE;display:flex;align-items:center;gap:12px;"
              )}
            >
              <div
                style={s(
                  "width:38px;height:38px;border-radius:999px;background:#98771E;color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;"
                )}
              >
                IH
              </div>
              <div>
                <div style={s("font-size:14.5px;font-weight:600;")}>
                  A & A Guest Support
                </div>
                <div style={s("font-size:12px;color:#98771E;")}>
                  ● Online · replies in ~18 min
                </div>
              </div>
            </div>
            <div
              style={s("padding:24px;display:flex;flex-direction:column;gap:14px;")}
            >
              {v.messages.map((m, i) => (
                <div key={i} style={m.rowStyle}>
                  <div style={m.bubbleStyle}>{m.text}</div>
                </div>
              ))}
            </div>
            <div
              style={s(
                "padding:16px 24px;border-top:1px solid #F0F0EE;display:flex;gap:12px;"
              )}
            >
              <input
                placeholder="Write a message…"
                style={s(
                  "flex:1;border:1px solid #E0E0E0;border-radius:12px;padding:12px 14px;font-size:14px;"
                )}
              />
              <div
                className="hv-primary"
                style={s(
                  "background:#98771E;color:#fff;border-radius:12px;padding:12px 24px;font-size:14px;font-weight:600;cursor:pointer;"
                )}
              >
                Send
              </div>
            </div>
          </div>
        )}

        {v.dashIsGeneric && (
          <div
            style={s(
              "margin-top:26px;padding:70px;border:1px dashed #DCDCD8;border-radius:24px;text-align:center;color:#616161;"
            )}
          >
            <div style={s("font-size:17px;font-weight:600;color:#212121;")}>
              {v.dashTitle}
            </div>
            <div style={s("font-size:14.5px;margin-top:8px;")}>
              Nothing here yet — this section fills in after your first stay.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
