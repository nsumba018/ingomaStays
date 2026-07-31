"use client";

import { s } from "@/lib/css";
import { useIngoma } from "@/lib/store";

export default function SavedScreen() {
  const v = useIngoma();

  return (
    <div
      style={s(
        "max-width:1180px;margin:0 auto;padding:44px 48px 90px 48px;animation:fadeIn .3s ease;"
      )}
    >
      <div className="serif" style={s("font-size:36px;letter-spacing:-0.025em;")}>
        Saved homes
      </div>
      <div style={s("font-size:15px;color:#616161;margin-top:8px;")}>
        {v.wishSummary}
      </div>

      {v.wishEmpty && (
        <div
          style={s(
            "margin-top:60px;text-align:center;color:#616161;padding:60px;border:1px dashed #DCDCD8;border-radius:24px;"
          )}
        >
          <div style={s("font-size:40px;color:#E0E0E0;")}>♥</div>
          <div
            style={s(
              "font-size:18px;font-weight:600;color:#212121;margin-top:14px;"
            )}
          >
            Nothing saved yet
          </div>
          <div style={s("font-size:14.5px;margin-top:8px;")}>
            Tap the heart on any home to keep it here.
          </div>
          <div
            onClick={v.goHomes}
            style={s(
              "display:inline-block;margin-top:22px;background:#2E7D32;color:#fff;border-radius:999px;padding:13px 28px;font-size:14.5px;font-weight:600;cursor:pointer;"
            )}
          >
            Browse our homes
          </div>
        </div>
      )}

      <div
        style={s(
          "display:grid;grid-template-columns:repeat(4,1fr);gap:26px;margin-top:30px;"
        )}
      >
        {v.wished.map((p) => (
          <div
            key={p.id}
            className="lift6"
            style={s(
              "background:#fff;border:1px solid #E8E8E8;border-radius:20px;overflow:hidden;"
            )}
          >
            <div
              onClick={p.open}
              style={s("position:relative;height:190px;cursor:pointer;")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.img}
                alt={p.title}
                style={s("width:100%;height:100%;object-fit:cover;display:block;")}
              />
              <div
                onClick={p.toggleWish}
                style={s(
                  "position:absolute;top:12px;right:12px;width:32px;height:32px;border-radius:999px;background:rgba(255,255,255,.94);display:flex;align-items:center;justify-content:center;cursor:pointer;"
                )}
              >
                <span style={p.heartStyle}>♥</span>
              </div>
            </div>
            <div style={s("padding:16px 18px 18px 18px;")}>
              <div style={s("font-size:15.5px;font-weight:600;")}>{p.title}</div>
              <div style={s("font-size:13px;color:#616161;margin-top:4px;")}>
                {p.location}
              </div>
              <div
                style={s(
                  "display:flex;justify-content:space-between;align-items:center;margin-top:12px;"
                )}
              >
                <div style={s("font-size:15px;font-weight:700;")}>
                  {p.priceLabel}
                </div>
                <div
                  className="hv-green"
                  onClick={p.book}
                  style={s(
                    "background:#2E7D32;color:#fff;border-radius:10px;padding:8px 16px;font-size:12.5px;font-weight:600;cursor:pointer;"
                  )}
                >
                  Book
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
