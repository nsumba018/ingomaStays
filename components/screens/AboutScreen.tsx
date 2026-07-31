"use client";

import { s } from "@/lib/css";
import { useIngoma } from "@/lib/store";

export default function AboutScreen() {
  const v = useIngoma();

  return (
    <div style={s("animation:fadeIn .3s ease;")}>
      <div className="sec" style={s("max-width:1180px;margin:0 auto;padding:32px 48px 0 48px;")}>
        <div className="hero-box"
          style={s(
            "position:relative;height:420px;border-radius:24px;overflow:hidden;"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/keza/k01.jpg"
            alt="Keza Apartments saloon"
            style={s(
              "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;"
            )}
          />
          <div
            style={s(
              "position:absolute;inset:0;background:linear-gradient(120deg,rgba(16,26,18,.72) 20%,rgba(16,26,18,.25) 100%);"
            )}
          />
          <div className="hero-text"
            style={s(
              "position:absolute;left:60px;top:50%;transform:translateY(-50%);color:#fff;max-width:600px;"
            )}
          >
            <div
              style={s(
                "font-size:11px;letter-spacing:.24em;font-weight:600;color:rgba(255,255,255,.8);"
              )}
            >
              ABOUT INGOMA HOMES
            </div>
            <div
              className="serif hero-title"
              style={s(
                "font-size:44px;line-height:1.1;letter-spacing:-0.03em;margin-top:16px;"
              )}
            >
              A Rwandan hospitality company, not a marketplace
            </div>
          </div>
        </div>
      </div>

      <div className="sec split-2"
        style={s(
          "max-width:1180px;margin:0 auto;padding:60px 48px 0 48px;display:grid;grid-template-columns:1fr 1fr;gap:72px;"
        )}
      >
        <div>
          <div className="serif" style={s("font-size:26px;letter-spacing:-0.02em;")}>
            Our story
          </div>
          <div
            style={s(
              "font-size:16px;line-height:1.8;color:#424242;margin-top:16px;text-wrap:pretty;"
            )}
          >
            Ingoma Homes began in 2019 with a single restored house in Kiyovu and
            one conviction: travellers to Rwanda deserved better than the lottery
            of unmanaged rentals. We bought the home, furnished it ourselves,
            hired a full-time housekeeping team and never listed anyone
            else&apos;s property.
          </div>
          <div
            style={s(
              "font-size:16px;line-height:1.8;color:#424242;margin-top:16px;text-wrap:pretty;"
            )}
          >
            Today we own and operate two apartments in Kigali — Keza Apartments
            in Kicukiro and Liza Apartments in Nyarugenge. Both are designed
            in-house, inspected weekly, and staffed by people on our payroll —
            which is why the coffee, the linen and the welcome are the same at
            both doors.
          </div>
        </div>
        <div className="grid-2-tight" style={s("display:grid;grid-template-columns:1fr 1fr;gap:16px;")}>
          {v.aboutImgs.map((i) => (
            <div
              key={i.src}
              style={s("border-radius:18px;overflow:hidden;height:200px;")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={i.src}
                alt={i.alt}
                style={s("width:100%;height:100%;object-fit:cover;display:block;")}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={s("max-width:1180px;margin:0 auto;padding:64px 48px 0 48px;")}>
        <div className="grid-3" style={s("display:grid;grid-template-columns:repeat(3,1fr);gap:24px;")}>
          {v.pillars.map((p) => (
            <div
              key={p.kicker}
              style={s(
                "background:#fff;border:1px solid #E8E8E8;border-radius:20px;padding:30px;"
              )}
            >
              <div
                style={s(
                  "font-size:11px;letter-spacing:.2em;font-weight:600;color:#2E7D32;"
                )}
              >
                {p.kicker}
              </div>
              <div className="serif" style={s("font-size:21px;margin-top:12px;")}>
                {p.title}
              </div>
              <div
                style={s(
                  "font-size:14.5px;color:#616161;margin-top:10px;line-height:1.7;"
                )}
              >
                {p.body}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={s("max-width:1180px;margin:0 auto;padding:64px 48px 0 48px;")}>
        <div className="serif" style={s("font-size:26px;letter-spacing:-0.02em;")}>
          Our hospitality standards
        </div>
        <div className="grid-4"
          style={s(
            "display:grid;grid-template-columns:repeat(4,1fr);gap:22px;margin-top:24px;"
          )}
        >
          {v.standards.map((st) => (
            <div
              key={st.n}
              style={s(
                "background:#fff;border:1px solid #E8E8E8;border-radius:18px;padding:22px;"
              )}
            >
              <div className="serif" style={s("font-size:22px;color:#2E7D32;")}>
                {st.n}
              </div>
              <div style={s("font-size:14.5px;font-weight:600;margin-top:10px;")}>
                {st.title}
              </div>
              <div
                style={s(
                  "font-size:13px;color:#616161;margin-top:6px;line-height:1.6;"
                )}
              >
                {st.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
