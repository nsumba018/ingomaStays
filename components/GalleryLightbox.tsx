"use client";

import { s } from "@/lib/css";
import { useIngoma } from "@/lib/store";

export default function GalleryLightbox() {
  const v = useIngoma();

  return (
    <div
      style={s(
        "position:fixed;inset:0;z-index:70;background:rgba(14,20,15,.96);overflow-y:auto;animation:fadeIn .2s ease;"
      )}
    >
      <div className="lightbox-bar"
        style={s(
          "position:sticky;top:0;display:flex;justify-content:space-between;align-items:center;padding:20px 40px;background:rgba(14,20,15,.9);backdrop-filter:blur(8px);"
        )}
      >
        <div style={s("color:#fff;font-size:15px;font-weight:600;")}>
          {v.sel.title} · {v.galleryCount} photos
        </div>
        <div
          onClick={v.closeGallery}
          style={s(
            "color:#fff;font-size:14px;font-weight:600;cursor:pointer;border:1px solid rgba(255,255,255,.3);border-radius:10px;padding:8px 16px;"
          )}
        >
          Close ✕
        </div>
      </div>

      <div className="lightbox-grid"
        style={s(
          "max-width:1180px;margin:0 auto;padding:20px 40px 60px 40px;display:grid;grid-template-columns:1fr 1fr;gap:16px;"
        )}
      >
        {v.fullGallery.map((g, i) => (
          <div key={i} style={g.wrapStyle}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={g.src}
              alt={g.alt}
              style={s(
                "width:100%;height:100%;object-fit:cover;display:block;border-radius:14px;"
              )}
            />
            <div
              style={s(
                "font-size:12.5px;color:rgba(255,255,255,.6);margin-top:8px;"
              )}
            >
              {g.alt}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
