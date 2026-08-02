"use client";

import { s } from "@/lib/css";
import { useIngoma } from "@/lib/store";

/** Five-step reservation flow, plus the confirmation state that replaces it. */
export default function BookingModal() {
  const v = useIngoma();

  return (
    <div className="modal-wrap"
      style={s(
        "position:fixed;inset:0;z-index:60;display:flex;align-items:center;justify-content:center;padding:40px;"
      )}
    >
      <div
        onClick={v.closeBooking}
        style={s(
          "position:absolute;inset:0;background:rgba(18,24,18,.55);animation:fadeIn .2s ease;"
        )}
      />
      <div className="modal-card"
        style={s(
          "position:relative;background:#FAFAF8;border-radius:24px;width:100%;max-width:960px;max-height:88vh;overflow-y:auto;box-shadow:0 30px 80px rgba(0,0,0,.32);animation:modalIn .3s ease;"
        )}
      >
        {v.bookingInProgress && (
          <div className="modal-grid" style={s("display:grid;grid-template-columns:1fr 340px;")}>
            <div className="modal-body" style={s("padding:34px 36px 40px 36px;")}>
              <div
                style={s(
                  "display:flex;align-items:center;justify-content:space-between;"
                )}
              >
                <div
                  className="serif"
                  style={s("font-size:26px;letter-spacing:-0.02em;")}
                >
                  {v.stepTitle}
                </div>
                <div
                  onClick={v.closeBooking}
                  style={s("color:#9E9E9E;font-size:18px;cursor:pointer;")}
                >
                  ✕
                </div>
              </div>

              <div style={s("display:flex;gap:8px;margin-top:20px;")}>
                {v.steps.map((st, i) => (
                  <div key={i} style={st.style} />
                ))}
              </div>
              <div style={s("font-size:12.5px;color:#616161;margin-top:10px;")}>
                {v.stepCounter}
              </div>

              {/* ---- step 1: unit -------------------------------------------- */}
              {v.stepUnit && (
                <>
                  <div
                    style={s("font-size:13.5px;color:#616161;margin-top:20px;")}
                  >
                    {v.sel.title}, {v.sel.location} — {v.availSummary}. Units
                    booked for those dates can&apos;t be selected; pick different
                    dates in the next step to free them.
                  </div>
                  {v.unitGroups.map((g) => (
                    <div key={g.label} style={s("margin-top:18px;")}>
                      <div
                        style={s(
                          "display:flex;justify-content:space-between;align-items:baseline;gap:12px;"
                        )}
                      >
                        <div style={s("font-size:14.5px;font-weight:600;")}>
                          {g.label}
                        </div>
                        <div
                          style={s(
                            "font-size:13px;font-weight:700;color:#98771E;"
                          )}
                        >
                          {g.priceLabel}
                        </div>
                      </div>
                      <div className="modal-units"
                        style={s(
                          "display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:10px;"
                        )}
                      >
                        {g.units.map((u) => (
                          <div key={u.n} onClick={u.pick} style={u.style}>
                            <div
                              style={s(
                                "display:flex;justify-content:space-between;align-items:center;gap:6px;"
                              )}
                            >
                              <div style={s("font-size:13px;font-weight:700;")}>
                                Unit {u.n}
                              </div>
                              <div style={u.badgeStyle}>{u.status}</div>
                            </div>
                            <div
                              style={s(
                                "font-size:11.5px;color:#616161;margin-top:5px;"
                              )}
                            >
                              sleeps {u.sleeps}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* ---- step 2: dates ------------------------------------------- */}
              {v.stepDates && (
                <>
                  <div
                    style={s("margin-top:26px;font-size:15.5px;font-weight:600;")}
                  >
                    Select your dates · August 2026
                  </div>
                  <div
                    style={s("display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;")}
                  >
                    {v.dateChips.map((d) => (
                      <div key={d.label} onClick={d.pick} style={d.bigStyle}>
                        {d.label}
                      </div>
                    ))}
                  </div>
                  <div
                    style={s("font-size:13.5px;color:#616161;margin-top:14px;")}
                  >
                    {v.dateHint}
                  </div>
                  <div
                    style={s(
                      "margin-top:20px;background:#fff;border:1px solid #E8E8E8;border-radius:16px;padding:18px;font-size:13.5px;color:#616161;line-height:1.7;"
                    )}
                  >
                    Check-in from 14:00 with a door code sent to your phone ·
                    Check-out by 11:00 · Free cancellation up to 48 hours before
                    arrival.
                  </div>
                </>
              )}

              {/* ---- step 3: guests ------------------------------------------ */}
              {v.stepGuests && (
                <>
                  <div
                    style={s(
                      "margin-top:26px;background:#fff;border:1px solid #E8E8E8;border-radius:16px;padding:6px 20px;"
                    )}
                  >
                    {v.guestRows.map((g) => (
                      <div
                        key={g.label}
                        style={s(
                          "display:flex;justify-content:space-between;align-items:center;padding:18px 0;border-bottom:1px solid #F2F2F0;"
                        )}
                      >
                        <div>
                          <div style={s("font-size:15px;font-weight:600;")}>
                            {g.label}
                          </div>
                          <div
                            style={s(
                              "font-size:13px;color:#616161;margin-top:3px;"
                            )}
                          >
                            {g.sub}
                          </div>
                        </div>
                        <div
                          style={s("display:flex;align-items:center;gap:16px;")}
                        >
                          <div
                            onClick={g.dec}
                            style={s(
                              "width:32px;height:32px;border-radius:999px;border:1px solid #E0E0E0;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#616161;"
                            )}
                          >
                            −
                          </div>
                          <div
                            style={s(
                              "font-size:15px;font-weight:600;width:16px;text-align:center;"
                            )}
                          >
                            {g.value}
                          </div>
                          <div
                            onClick={g.inc}
                            style={s(
                              "width:32px;height:32px;border-radius:999px;border:1px solid #E0E0E0;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#616161;"
                            )}
                          >
                            +
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={s("font-size:13px;color:#616161;margin-top:14px;")}>
                    Unit {v.unitN} sleeps up to {v.maxGuests} guests. Cots and high
                    chairs are free on request.
                  </div>
                </>
              )}

              {/* ---- step 4: services ---------------------------------------- */}
              {v.stepServices && (
                <>
                  <div
                    style={s("font-size:13.5px;color:#616161;margin-top:20px;")}
                  >
                    Optional services, arranged and staffed by our own team.
                  </div>
                  <div
                    style={s(
                      "display:flex;flex-direction:column;gap:12px;margin-top:16px;"
                    )}
                  >
                    {v.services.map((x) => (
                      <div key={x.label} onClick={x.toggle} style={x.style}>
                        <div style={s("display:flex;align-items:center;gap:14px;")}>
                          <div style={x.box}>✓</div>
                          <div>
                            <div style={s("font-size:15px;font-weight:600;")}>
                              {x.label}
                            </div>
                            <div
                              style={s(
                                "font-size:13px;color:#616161;margin-top:3px;"
                              )}
                            >
                              {x.sub}
                            </div>
                          </div>
                        </div>
                        <div
                          style={s(
                            "font-size:14.5px;font-weight:600;white-space:nowrap;"
                          )}
                        >
                          {x.priceLabel}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* ---- step 5: payment ----------------------------------------- */}
              {v.stepPayment && (
                <>
                  <div
                    style={s("margin-top:24px;font-size:15.5px;font-weight:600;")}
                  >
                    Pay A & A Apartments directly
                  </div>
                  <div
                    style={s(
                      "display:flex;flex-direction:column;gap:10px;margin-top:14px;"
                    )}
                  >
                    {v.payMethods.map((m) => (
                      <div key={m.label} onClick={m.pick} style={m.style}>
                        <div
                          style={s("display:flex;align-items:center;gap:12px;")}
                        >
                          <div style={m.dot} />
                          <div style={s("font-size:14.5px;font-weight:500;")}>
                            {m.label}
                          </div>
                        </div>
                        <div style={s("font-size:12.5px;color:#616161;")}>
                          {m.hint}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid-2-tight"
                    style={s(
                      "display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:18px;"
                    )}
                  >
                    <div>
                      <div
                        style={s(
                          "font-size:12.5px;font-weight:600;color:#616161;"
                        )}
                      >
                        Card number
                      </div>
                      <input
                        placeholder="4218 •••• •••• ••••"
                        style={s(
                          "width:100%;margin-top:7px;border:1px solid #E0E0E0;border-radius:12px;padding:12px 14px;font-size:14.5px;"
                        )}
                      />
                    </div>
                    <div
                      style={s("display:grid;grid-template-columns:1fr 1fr;gap:14px;")}
                    >
                      <div>
                        <div
                          style={s(
                            "font-size:12.5px;font-weight:600;color:#616161;"
                          )}
                        >
                          Expiry
                        </div>
                        <input
                          placeholder="08/29"
                          style={s(
                            "width:100%;margin-top:7px;border:1px solid #E0E0E0;border-radius:12px;padding:12px 14px;font-size:14.5px;"
                          )}
                        />
                      </div>
                      <div>
                        <div
                          style={s(
                            "font-size:12.5px;font-weight:600;color:#616161;"
                          )}
                        >
                          CVC
                        </div>
                        <input
                          placeholder="•••"
                          style={s(
                            "width:100%;margin-top:7px;border:1px solid #E0E0E0;border-radius:12px;padding:12px 14px;font-size:14.5px;"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    style={s(
                      "margin-top:18px;font-size:13px;color:#616161;line-height:1.7;"
                    )}
                  >
                    By confirming you agree to our House Rules, Cancellation Policy
                    and Terms. Free cancellation until {v.ciLabel}. Your payment
                    goes directly to A & A Apartments — never to a third-party host.
                  </div>
                </>
              )}

              <div className="modal-actions"
                style={s("display:flex;align-items:center;gap:14px;margin-top:28px;")}
              >
                {v.canGoBack && (
                  <div
                    className="hv-soft"
                    onClick={v.prevStep}
                    style={s(
                      "border:1px solid #E0E0E0;background:#fff;border-radius:14px;padding:14px 26px;font-size:15px;font-weight:600;cursor:pointer;"
                    )}
                  >
                    Back
                  </div>
                )}
                <div
                  className="hv-primary"
                  onClick={v.nextStep}
                  style={s(
                    "background:#98771E;color:#fff;border-radius:14px;padding:14px 30px;font-size:15px;font-weight:600;cursor:pointer;transition:background .2s ease;"
                  )}
                >
                  {v.nextLabel}
                </div>
              </div>
            </div>

            {/* ---- running order summary ------------------------------------ */}
            <div className="modal-summary"
              style={s(
                "border-left:1px solid #E8E8E8;padding:34px 30px;background:#fff;border-radius:0 24px 24px 0;"
              )}
            >
              <div style={s("display:flex;gap:14px;")}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={v.sel.img}
                  alt={v.sel.title}
                  style={s(
                    "width:96px;height:80px;border-radius:14px;object-fit:cover;"
                  )}
                />
                <div>
                  <div style={s("font-size:14.5px;font-weight:600;line-height:1.3;")}>
                    {v.sel.title}
                  </div>
                  <div style={s("font-size:12.5px;color:#616161;margin-top:4px;")}>
                    {v.sel.location}
                  </div>
                  <div style={s("font-size:12.5px;margin-top:6px;")}>
                    ★ {v.sel.rating}{" "}
                    <span style={s("color:#616161;")}>({v.sel.reviews})</span>
                  </div>
                </div>
              </div>

              <div
                style={s(
                  "border-top:1px solid #E8E8E8;margin-top:20px;padding-top:20px;display:flex;flex-direction:column;gap:10px;font-size:13.5px;color:#616161;"
                )}
              >
                <div style={s("display:flex;justify-content:space-between;")}>
                  <span>Unit</span>
                  <span style={s("color:#212121;font-weight:500;")}>
                    Unit {v.unitN} · {v.unitType}
                  </span>
                </div>
                <div style={s("display:flex;justify-content:space-between;")}>
                  <span>Dates</span>
                  <span style={s("color:#212121;font-weight:500;")}>
                    {v.tripDates}
                  </span>
                </div>
                <div style={s("display:flex;justify-content:space-between;")}>
                  <span>Guests</span>
                  <span style={s("color:#212121;font-weight:500;")}>{v.guests}</span>
                </div>
              </div>

              <div
                style={s(
                  "border-top:1px solid #E8E8E8;margin-top:18px;padding-top:18px;display:flex;flex-direction:column;gap:12px;"
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
                {v.chosenServices.map((c) => (
                  <div
                    key={c.label}
                    style={s(
                      "display:flex;justify-content:space-between;font-size:14px;color:#424242;"
                    )}
                  >
                    <span>{c.label}</span>
                    <span>{c.priceLabel}</span>
                  </div>
                ))}
              </div>

              <div
                style={s(
                  "border-top:1px solid #E8E8E8;margin-top:18px;padding-top:18px;display:flex;justify-content:space-between;font-size:16px;font-weight:700;"
                )}
              >
                <span>Total ({v.currency})</span>
                <span>{v.lineTotal}</span>
              </div>
              <div
                style={s(
                  "margin-top:18px;font-size:12px;color:#616161;line-height:1.6;"
                )}
              >
                🔒 Encrypted payment · Professionally cleaned before arrival · 24/7
                guest support
              </div>
            </div>
          </div>
        )}

        {/* ---- confirmation ------------------------------------------------ */}
        {v.stepConfirmed && (
          <div className="modal-confirm" style={s("padding:56px 64px 60px 64px;animation:fadeUp .4s ease;")}>
            <div style={s("text-align:center;")}>
              <div
                style={s(
                  "width:74px;height:74px;border-radius:999px;background:#F7EFD5;color:#98771E;font-size:32px;display:flex;align-items:center;justify-content:center;margin:0 auto;animation:pop .5s ease;"
                )}
              >
                ✓
              </div>
              <div
                className="serif"
                style={s("font-size:32px;margin-top:22px;letter-spacing:-0.02em;")}
              >
                Your stay is confirmed
              </div>
              <div
                style={s(
                  "font-size:15.5px;color:#616161;margin-top:10px;line-height:1.65;"
                )}
              >
                {v.sel.title} · {v.tripDates} · {v.guests} guests
                <br />
                Booking {v.bookingRef} — confirmation sent to your inbox.
              </div>
            </div>

            <div
              style={s(
                "margin-top:32px;background:#fff;border:1px solid #E8E8E8;border-radius:20px;padding:28px;"
              )}
            >
              <div
                style={s(
                  "font-size:11px;letter-spacing:.2em;font-weight:600;color:#98771E;"
                )}
              >
                ARRIVAL INSTRUCTIONS
              </div>
              <div className="grid-2-tight"
                style={s(
                  "display:grid;grid-template-columns:1fr 1fr;gap:22px;margin-top:18px;"
                )}
              >
                {v.arrival.map((a) => (
                  <div key={a.title}>
                    <div style={s("font-size:14px;font-weight:600;")}>{a.title}</div>
                    <div
                      style={s(
                        "font-size:13.5px;color:#616161;margin-top:5px;line-height:1.6;"
                      )}
                    >
                      {a.body}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={s(
                "display:flex;gap:12px;justify-content:center;margin-top:28px;"
              )}
            >
              <div
                className="hv-primary"
                onClick={v.viewBooking}
                style={s(
                  "background:#98771E;color:#fff;border-radius:14px;padding:14px 30px;font-size:15px;font-weight:600;cursor:pointer;"
                )}
              >
                View my booking
              </div>
              <div
                className="hv-soft"
                onClick={v.closeBooking}
                style={s(
                  "border:1px solid #E0E0E0;background:#fff;border-radius:14px;padding:14px 30px;font-size:15px;font-weight:600;cursor:pointer;"
                )}
              >
                Keep browsing
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
