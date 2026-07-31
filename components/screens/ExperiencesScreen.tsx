"use client";

import { s } from "@/lib/css";
import { useIngoma } from "@/lib/store";

export default function ExperiencesScreen() {
  const v = useIngoma();

  return (
    <div className="sec"
      style={s(
        "max-width:1180px;margin:0 auto;padding:48px 48px 90px 48px;animation:fadeIn .3s ease;"
      )}
    >
      <div className="serif title-lg" style={s("font-size:40px;letter-spacing:-0.03em;")}>
        Experiences we arrange
      </div>
      <div
        style={s(
          "font-size:16px;color:#616161;margin-top:10px;max-width:640px;line-height:1.65;"
        )}
      >
        Add any of these to your stay at checkout, or ask the concierge once you
        arrive. Everything is booked and vetted by our team.
      </div>

      <div className="grid-3"
        style={s(
          "display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:36px;"
        )}
      >
        {v.experiences.map((e) => (
          <div
            key={e.name}
            className="lift5"
            style={s(
              "background:#fff;border:1px solid #E8E8E8;border-radius:20px;overflow:hidden;cursor:pointer;"
            )}
          >
            <div style={s("height:230px;overflow:hidden;")}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="zoom5"
                src={e.img}
                alt={e.name}
                style={s(
                  "width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ease;"
                )}
              />
            </div>
            <div style={s("padding:20px 22px 22px 22px;")}>
              <div style={s("font-size:17px;font-weight:600;")}>{e.name}</div>
              <div
                style={s(
                  "font-size:13.5px;color:#616161;margin-top:8px;line-height:1.6;"
                )}
              >
                {e.sub}
              </div>
              <div
                style={s(
                  "display:flex;justify-content:space-between;align-items:center;margin-top:16px;font-size:14px;"
                )}
              >
                <span style={s("font-weight:700;")}>{e.priceLabel}</span>
                <span style={s("color:#616161;font-size:13px;")}>{e.dur}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
