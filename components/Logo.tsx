import { s } from "@/lib/css";

/**
 * The A & A emblem: a ring holding a key whose bow encloses a house gable.
 *
 * The ring and key are the motif the Alita building logo already uses, so the
 * parent brand reads as family. What separates it is the bit: two teeth, one
 * per building. Everything is drawn in `currentColor`, so the same mark works
 * gold on the light chrome and cream on the dark sections.
 */
export function LogoMark({
  size = 34,
  title = "A & A Apartments",
}: {
  size?: number;
  title?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label={title}
      style={s("flex:0 0 auto;display:block;")}
    >
      <circle
        cx="24"
        cy="24"
        r="21"
        stroke="currentColor"
        strokeWidth="2"
        opacity=".9"
      />
      {/* key bow */}
      <circle cx="24" cy="17.5" r="6.6" stroke="currentColor" strokeWidth="2" />
      {/* the gable inside the bow — a roof, i.e. what the key opens */}
      <path d="M24 13.9 L27.2 18.3 H20.8 Z" fill="currentColor" />
      {/* shaft */}
      <path
        d="M24 24.1 V36.4"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* two teeth, one per building */}
      <path
        d="M24 29.6 H29.6 M24 34 H27.6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Full lockup: emblem plus the stacked wordmark.
 *
 * The ampersand is the whole idea of the company — two buildings, one operator
 * — so it is the one element that gets the bright gold. `tone` flips the mark
 * and wordmark for dark backgrounds.
 */
export default function Logo({
  size = 34,
  wordSize = 19,
  kicker = "APARTMENTS · KIGALI",
  tone = "light",
}: {
  size?: number;
  wordSize?: number;
  kicker?: string;
  tone?: "light" | "dark";
}) {
  const ink = tone === "dark" ? "#F7EFD5" : "#212121";
  const mark = tone === "dark" ? "#D9B24A" : "#98771E";

  return (
    <div style={s("display:flex;align-items:center;gap:11px;flex:0 0 auto;")}>
      <span style={s("color:" + mark + ";display:block;")}>
        <LogoMark size={size} />
      </span>
      <div>
        <div
          className="serif"
          style={s(
            "font-size:" +
              wordSize +
              "px;letter-spacing:.02em;line-height:1.1;color:" +
              ink +
              ";"
          )}
        >
          A <span style={s("color:" + mark + ";")}>&amp;</span> A
        </div>
        {kicker && (
          <div
            className="nav-kicker"
            style={s(
              "font-size:9.5px;letter-spacing:.16em;font-weight:600;color:" +
                (tone === "dark" ? "rgba(247,239,213,.62)" : "#616161") +
                ";"
            )}
          >
            {kicker}
          </div>
        )}
      </div>
    </div>
  );
}
