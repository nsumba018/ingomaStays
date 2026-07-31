"use client";

import { useEffect, useRef } from "react";
import { s } from "@/lib/css";
import { useIngoma } from "@/lib/store";

/**
 * Sticky header. Publishes its own height as `--hdr` so the sub-headers and
 * sticky sidebars further down the page can offset themselves correctly.
 */
export default function Nav() {
  const v = useIngoma();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sync = () =>
      document.documentElement.style.setProperty(
        "--hdr",
        Math.round(el.getBoundingClientRect().height) + "px"
      );

    sync();
    const frame = requestAnimationFrame(sync);
    window.addEventListener("resize", sync);
    const ro = new ResizeObserver(sync);
    ro.observe(el);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", sync);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={s(
        "position:sticky;top:0;z-index:30;background:rgba(250,250,248,.93);backdrop-filter:blur(14px);border-bottom:1px solid #E8E8E8;"
      )}
    >
      <div
        className="nav-inner"
        style={s(
          "max-width:1180px;margin:0 auto;padding:12px 28px;min-height:78px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px 16px;"
        )}
      >
        <div
          onClick={v.goHome}
          style={s(
            "cursor:pointer;display:flex;align-items:center;gap:11px;flex:0 0 auto;"
          )}
        >
          <div
            className="serif"
            style={s(
              "width:34px;height:34px;border-radius:10px;background:#2E7D32;color:#fff;display:flex;align-items:center;justify-content:center;font-size:16px;"
            )}
          >
            I
          </div>
          <div>
            <div
              className="serif"
              style={s("font-size:19px;letter-spacing:-0.02em;line-height:1.1;")}
            >
              Ingoma <span style={s("color:#2E7D32;")}>Homes</span>
            </div>
            <div
              className="nav-kicker"
              style={s(
                "font-size:9.5px;letter-spacing:.16em;color:#616161;font-weight:600;"
              )}
            >
              RWANDA · EST. 2019
            </div>
          </div>
        </div>

        <div
          className="nav-links"
          style={s(
            "display:flex;flex-wrap:wrap;align-items:center;gap:4px;flex:1 1 auto;min-width:0;justify-content:center;"
          )}
        >
          {v.navLinks.map((n) => (
            <div key={n.label} onClick={n.go} style={n.style}>
              {n.label}
            </div>
          ))}
        </div>

        <div style={s("display:flex;align-items:center;gap:8px;flex:0 0 auto;")}>
          <div
            className="hv-soft"
            onClick={v.toggleCurrency}
            style={s(
              "font-size:13px;font-weight:600;padding:9px 13px;border-radius:999px;cursor:pointer;color:#424242;"
            )}
          >
            {v.currency}
          </div>
          <div
            className="hv-soft"
            onClick={v.goSaved}
            style={s(
              "position:relative;padding:9px 12px;border-radius:999px;cursor:pointer;font-size:15px;color:#424242;"
            )}
          >
            ♥
            {v.hasWishes && (
              <span
                style={s(
                  "position:absolute;top:3px;right:3px;min-width:16px;height:16px;border-radius:999px;background:#D32F2F;color:#fff;font-size:9.5px;font-weight:700;display:flex;align-items:center;justify-content:center;padding:0 4px;"
                )}
              >
                {v.wishCount}
              </span>
            )}
          </div>
          <div
            onClick={v.goDashboard}
            style={s(
              "width:34px;height:34px;border-radius:999px;background:#EAF2EA;color:#2E7D32;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;cursor:pointer;border:1px solid #DCE8DC;"
            )}
          >
            A
          </div>
          <div
            className="hv-green nav-cta"
            onClick={v.goHomes}
            style={s(
              "background:#2E7D32;color:#fff;border-radius:999px;padding:11px 22px;font-size:13.5px;font-weight:600;cursor:pointer;white-space:nowrap;transition:background .2s ease;"
            )}
          >
            Book now
          </div>
        </div>
      </div>
    </div>
  );
}
