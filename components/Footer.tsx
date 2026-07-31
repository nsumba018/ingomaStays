"use client";

import { s } from "@/lib/css";
import { useIngoma } from "@/lib/store";

export default function Footer() {
  const v = useIngoma();

  return (
    <div style={s("margin-top:80px;border-top:1px solid #E8E8E8;background:#fff;")}>
      <div
        style={s(
          "max-width:1180px;margin:0 auto;padding:56px 48px 32px 48px;display:grid;grid-template-columns:1.4fr repeat(4,1fr);gap:40px;"
        )}
      >
        <div>
          <div style={s("display:flex;align-items:center;gap:11px;")}>
            <div
              className="serif"
              style={s(
                "width:32px;height:32px;border-radius:10px;background:#2E7D32;color:#fff;display:flex;align-items:center;justify-content:center;font-size:15px;"
              )}
            >
              I
            </div>
            <div className="serif" style={s("font-size:18px;")}>
              Ingoma <span style={s("color:#2E7D32;")}>Homes</span>
            </div>
          </div>
          <div
            style={s(
              "font-size:13.5px;color:#616161;margin-top:14px;line-height:1.65;max-width:290px;"
            )}
          >
            A Rwandan hospitality company. We own, design and manage both of our
            Kigali apartments — so the standard never changes.
          </div>
          <div style={s("display:flex;gap:10px;margin-top:20px;")}>
            {v.socials.map((soc) => (
              <div
                key={soc.label}
                className="hv-soft"
                style={s(
                  "width:34px;height:34px;border-radius:999px;border:1px solid #E8E8E8;display:flex;align-items:center;justify-content:center;font-size:12px;color:#616161;cursor:pointer;"
                )}
              >
                {soc.label}
              </div>
            ))}
          </div>
        </div>

        {v.footerCols.map((col) => (
          <div key={col.title}>
            <div style={s("font-size:13px;font-weight:600;")}>{col.title}</div>
            <div
              style={s(
                "display:flex;flex-direction:column;gap:10px;margin-top:14px;"
              )}
            >
              {col.items.map((item) => (
                <div
                  key={item.label}
                  className="hv-dark"
                  onClick={item.go}
                  style={s("font-size:13.5px;color:#616161;cursor:pointer;")}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        style={s(
          "max-width:1180px;margin:0 auto;padding:0 48px 40px 48px;border-top:1px solid #F0F0EE;"
        )}
      >
        <div
          style={s(
            "padding-top:22px;display:flex;justify-content:space-between;font-size:12.5px;color:#616161;"
          )}
        >
          <div>© 2026 Ingoma Homes Ltd · Kiyovu, Kigali · TIN 108••••••</div>
          <div style={s("display:flex;gap:24px;")}>
            <span>Privacy</span>
            <span>Terms</span>
            <span>Cancellation policy</span>
            <span>Accessibility</span>
            <span>{v.currencyName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
