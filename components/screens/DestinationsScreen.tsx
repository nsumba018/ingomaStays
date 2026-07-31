"use client";

import { s, sx } from "@/lib/css";
import { useIngoma } from "@/lib/store";

export default function DestinationsScreen() {
  const v = useIngoma();

  return (
    <div className="sec"
      style={s(
        "max-width:1180px;margin:0 auto;padding:48px 48px 90px 48px;animation:fadeIn .3s ease;"
      )}
    >
      <div className="serif title-lg" style={s("font-size:40px;letter-spacing:-0.03em;")}>
        Our Kigali districts
      </div>
      <div
        style={s(
          "font-size:16px;color:#616161;margin-top:10px;max-width:640px;line-height:1.65;"
        )}
      >
        Two Kigali districts, two apartments. Same team, same standards.
      </div>

      <div
        style={s("display:flex;flex-direction:column;gap:26px;margin-top:36px;")}
      >
        {v.destinations.map((d) => (
          <div className="dest-row"
            key={d.name}
            style={sx(
              "display:grid;grid-template-columns:1fr 1fr;gap:0;background:#fff;border:1px solid #E8E8E8;border-radius:24px;overflow:hidden;" +
                d.rowStyle
            )}
          >
            <div className="dest-media" style={s(d.imgWrapStyle || "display:block;")}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={d.img}
                alt={d.name}
                style={s(
                  "width:100%;height:100%;min-height:300px;object-fit:cover;display:block;"
                )}
              />
            </div>
            <div className="dest-body" style={s("padding:44px 48px;" + d.textStyle)}>
              <div
                style={s(
                  "font-size:11px;letter-spacing:.2em;font-weight:600;color:#2E7D32;"
                )}
              >
                KIGALI · {d.name}
              </div>
              <div
                className="serif"
                style={s("font-size:30px;margin-top:12px;letter-spacing:-0.02em;")}
              >
                {d.name} Collection
              </div>
              <div
                style={s(
                  "font-size:15.5px;color:#616161;margin-top:12px;line-height:1.7;"
                )}
              >
                {d.desc}
              </div>
              <div style={s("display:flex;gap:8px;flex-wrap:wrap;margin-top:18px;")}>
                {d.tags.map((t) => (
                  <div
                    key={t.label}
                    style={s(
                      "border:1px solid #E8E8E8;border-radius:999px;padding:6px 13px;font-size:12px;color:#616161;"
                    )}
                  >
                    {t.label}
                  </div>
                ))}
              </div>
              <div
                style={s("display:flex;align-items:center;gap:20px;margin-top:26px;")}
              >
                <div
                  className="hv-green"
                  onClick={d.go}
                  style={s(
                    "background:#2E7D32;color:#fff;border-radius:12px;padding:12px 24px;font-size:14px;font-weight:600;cursor:pointer;"
                  )}
                >
                  View apartment
                </div>
                <div style={s("font-size:13.5px;color:#616161;")}>
                  From {d.from} / night
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
