import { LogoMark } from "./Logo";
import { s } from "@/lib/css";

/**
 * The logo that belongs to one building, sized to sit just before its name.
 *
 * Alita has real artwork. Artha does not yet, so it falls back to the A & A
 * family mark — correct either way, since both buildings are ours. Give a
 * building a `logo` in `data.ts` and it takes over here with no other change.
 */
export default function BuildingLogo({
  title,
  logo,
  size = 26,
}: {
  title: string;
  logo?: string;
  size?: number;
}) {
  if (!logo)
    return (
      <span
        style={s(
          "color:#98771E;display:block;flex:0 0 auto;opacity:.85;line-height:0;"
        )}
      >
        <LogoMark size={size} title={title} />
      </span>
    );

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo}
      alt={title + " logo"}
      width={size}
      height={size}
      style={s(
        // The artwork keeps its white paper, so round it into a disc — that way
        // it sits cleanly on the cream page as well as on the white cards.
        "width:" +
          size +
          "px;height:" +
          size +
          "px;object-fit:contain;border-radius:999px;background:#fff;flex:0 0 auto;display:block;"
      )}
    />
  );
}
