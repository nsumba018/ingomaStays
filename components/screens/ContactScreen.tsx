"use client";

import { s } from "@/lib/css";
import { useIngoma } from "@/lib/store";

export default function ContactScreen() {
  const v = useIngoma();

  return (
    <div
      style={s(
        "max-width:1180px;margin:0 auto;padding:48px 48px 90px 48px;animation:fadeIn .3s ease;display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:start;"
      )}
    >
      <div>
        <div className="serif" style={s("font-size:40px;letter-spacing:-0.03em;")}>
          Talk to our guest team
        </div>
        <div
          style={s("font-size:16px;color:#616161;margin-top:12px;line-height:1.7;")}
        >
          One team, based in Kigali, reachable 24/7 in English, French and
          Kinyarwanda. Average reply time: 18 minutes.
        </div>

        <div
          style={s("display:flex;flex-direction:column;gap:14px;margin-top:30px;")}
        >
          {v.contactRows.map((c) => (
            <div
              key={c.label}
              style={s(
                "display:flex;align-items:center;gap:16px;background:#fff;border:1px solid #E8E8E8;border-radius:16px;padding:18px 20px;"
              )}
            >
              <div
                style={s(
                  "width:40px;height:40px;border-radius:12px;background:#EAF2EA;color:#2E7D32;display:flex;align-items:center;justify-content:center;font-size:15px;"
                )}
              >
                {c.glyph}
              </div>
              <div>
                <div style={s("font-size:12.5px;color:#616161;")}>{c.label}</div>
                <div style={s("font-size:15.5px;font-weight:600;margin-top:2px;")}>
                  {c.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={s(
            "margin-top:24px;border-radius:20px;overflow:hidden;height:240px;position:relative;border:1px solid #E8E8E8;background:repeating-linear-gradient(45deg,#EDF1EA,#EDF1EA 14px,#E6ECE3 14px,#E6ECE3 28px);"
          )}
        >
          <div
            style={s(
              "position:absolute;left:48%;top:46%;width:18px;height:18px;border-radius:999px;background:#2E7D32;border:4px solid #fff;box-shadow:0 3px 10px rgba(0,0,0,.25);"
            )}
          />
          <div
            style={s(
              "position:absolute;right:14px;bottom:12px;font-family:monospace;font-size:11px;color:#8AA08C;"
            )}
          >
            head office · Kiyovu, Kigali
          </div>
        </div>
      </div>

      <div
        style={s(
          "background:#fff;border:1px solid #E8E8E8;border-radius:24px;padding:36px;"
        )}
      >
        <div className="serif" style={s("font-size:22px;")}>
          Send us a message
        </div>

        <div
          style={s(
            "display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:22px;"
          )}
        >
          <div>
            <div style={s("font-size:12.5px;font-weight:600;color:#616161;")}>
              Full name
            </div>
            <input
              placeholder="Aline Uwase"
              style={s(
                "width:100%;margin-top:7px;border:1px solid #E0E0E0;border-radius:12px;padding:12px 14px;font-size:14.5px;"
              )}
            />
          </div>
          <div>
            <div style={s("font-size:12.5px;font-weight:600;color:#616161;")}>
              Email
            </div>
            <input
              placeholder="you@email.com"
              style={s(
                "width:100%;margin-top:7px;border:1px solid #E0E0E0;border-radius:12px;padding:12px 14px;font-size:14.5px;"
              )}
            />
          </div>
        </div>

        <div style={s("margin-top:16px;")}>
          <div style={s("font-size:12.5px;font-weight:600;color:#616161;")}>
            What is this about?
          </div>
          <div style={s("display:flex;gap:8px;flex-wrap:wrap;margin-top:9px;")}>
            {v.contactTopics.map((t) => (
              <div key={t.label} onClick={t.pick} style={t.style}>
                {t.label}
              </div>
            ))}
          </div>
        </div>

        <div style={s("margin-top:16px;")}>
          <div style={s("font-size:12.5px;font-weight:600;color:#616161;")}>
            Message
          </div>
          <textarea
            placeholder="Tell us about your trip…"
            style={s(
              "width:100%;margin-top:7px;border:1px solid #E0E0E0;border-radius:12px;padding:12px 14px;font-size:14.5px;min-height:130px;resize:vertical;"
            )}
          />
        </div>

        <div
          className="hv-green"
          style={s(
            "margin-top:20px;background:#2E7D32;color:#fff;border-radius:14px;padding:15px;text-align:center;font-size:15px;font-weight:600;cursor:pointer;"
          )}
        >
          Send message
        </div>
        <div
          style={s(
            "font-size:12.5px;color:#616161;margin-top:12px;text-align:center;"
          )}
        >
          We reply within an hour, day or night.
        </div>
      </div>
    </div>
  );
}
