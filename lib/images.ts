/**
 * Deterministic image picker.
 *
 * The design resolves photography by subject tag rather than by explicit path:
 * a seed string hashes into a per-subject bucket, so the same slot always gets
 * the same photo across renders. Buckets and tag mappings are ported verbatim
 * so every screen resolves to the exact asset the design does.
 */

const BUCKETS: Record<string, string[]> = {
  portrait: [
    "1494790108377-be9c29b29330",
    "1507003211169-0a1dd7228f2d",
    "1438761681033-6461ffad8d80",
    "1500648767791-00dcc994a43e",
    "1573497019940-1c28c88b4f3e",
    "1524504388940-b1c1722653e1",
  ],
  bedroom: [
    "1631049307264-da0ec9d70304",
    "1505693416388-ac5ce068fe85",
    "1595526114035-0d45ed16cfbf",
    "1586105251261-72a756497a11",
    "1582719478250-c89cae4dc85b",
    "1522771739844-6a9f6d5f14af",
    "1600607687644-c7171b42498f",
  ],
  kitchen: ["1556911220-bff31c812dba", "1560185007-cde436f6a4d0"],
  dining: ["1522708323590-d24dbb6b0267", "1560185007-cde436f6a4d0"],
  bathroom: ["1584622650111-993a426fbf0a", "1582719478250-c89cae4dc85b"],
  office: ["1497366754035-f200968a6e72", "1518455027359-f3f8164ba6bd"],
  pool: [
    "1571003123894-1f0594d2b5d9",
    "1571896349842-33c89424de2d",
    "1540541338287-41700207dee6",
  ],
  terrace: [
    "1540541338287-41700207dee6",
    "1566073771259-6a8506099945",
    "1571896349842-33c89424de2d",
  ],
  balcony: ["1495474472287-4d71bcdd2085", "1540541338287-41700207dee6"],
  coffee: ["1495474472287-4d71bcdd2085", "1523920290228-4f321a939b4c"],
  forest: ["1441974231531-c6227db76b6e", "1470071459604-3b5ec3a7fe05"],
  volcano: ["1506905925346-21bda4d32df4", "1464822759023-fed622ff2c3b"],
  safari: ["1523805009345-7448845a9e53", "1516426122078-c23e76319801"],
  lake: ["1571003123894-1f0594d2b5d9", "1540541338287-41700207dee6"],
  city: [
    "1449824913935-59a10b8d2000",
    "1477959858617-67f85cf4f1df",
    "1519501025264-65ba15a82390",
    "1580060839134-75a5edca2e99",
  ],
  garden: ["1583608205776-bfd35f0d9f83", "1566073771259-6a8506099945"],
  sunset: ["1547471080-7cc2caa01a7e", "1516426122078-c23e76319801"],
  hills: ["1470071459604-3b5ec3a7fe05", "1464822759023-fed622ff2c3b"],
  living: [
    "1502672260266-1c1ef2d93688",
    "1560448204-e02f11c3d0e2",
    "1600607687939-ce8a6c25118c",
    "1616486338812-3dadae4b4ace",
    "1554995207-c18c203602cb",
    "1618221195710-dd6b41faaea6",
  ],
  lounge: [
    "1586023492125-27b2c045efd7",
    "1502005229762-cf1b2da7c5d6",
    "1600566753086-00f18fb6b3ea",
    "1600210492486-724fe5c67fb0",
  ],
  exterior: [
    "1600585154340-be6161a56a0c",
    "1512917774080-9991f1c4c750",
    "1583608205776-bfd35f0d9f83",
    "1566073771259-6a8506099945",
  ],
};

/** First matching needle wins, so order is significant. */
const TAG_MAP: [string, string][] = [
  ["portrait", "portrait"],
  ["face", "portrait"],
  ["woman", "portrait"],
  ["man", "portrait"],
  ["bedroom", "bedroom"],
  ["linen", "bedroom"],
  ["housekeeping", "bedroom"],
  ["bed", "bedroom"],
  ["kitchen", "kitchen"],
  ["cooking", "kitchen"],
  ["dining", "dining"],
  ["bathroom", "bathroom"],
  ["office", "office"],
  ["desk", "office"],
  ["workspace", "office"],
  ["pool", "pool"],
  ["terrace", "terrace"],
  ["patio", "terrace"],
  ["balcony", "balcony"],
  ["coffee", "coffee"],
  ["gorilla", "forest"],
  ["rainforest", "forest"],
  ["forest", "forest"],
  ["volcano", "volcano"],
  ["mountain", "volcano"],
  ["savannah", "safari"],
  ["safari", "safari"],
  ["wildlife", "safari"],
  ["boat", "lake"],
  ["lake", "lake"],
  ["kigali", "city"],
  ["city", "city"],
  ["street", "city"],
  ["garden", "garden"],
  ["landscaping", "garden"],
  ["sunset", "sunset"],
  ["tea", "hills"],
  ["cycling", "hills"],
  ["hills", "hills"],
  ["landscape", "hills"],
  ["nature", "hills"],
  ["livingroom", "living"],
  ["sofa", "living"],
  ["armchair", "lounge"],
  ["lounge", "lounge"],
  ["books", "lounge"],
  ["exterior", "exterior"],
  ["architecture", "exterior"],
  ["cottage", "exterior"],
  ["cabin", "exterior"],
  ["lodge", "exterior"],
  ["villa", "exterior"],
  ["mansion", "exterior"],
  ["house", "exterior"],
  ["apartment", "living"],
  ["interior", "living"],
];

export function img(seed: string, tags: string): string {
  const t = tags.toLowerCase();
  let key = "living";
  for (const [needle, bucket] of TAG_MAP) {
    if (t.includes(needle)) {
      key = bucket;
      break;
    }
  }
  const list = BUCKETS[key] ?? BUCKETS.living;

  let n = 0;
  for (let i = 0; i < seed.length; i++) n = (n * 31 + seed.charCodeAt(i)) >>> 0;

  return "/assets/u" + list[n % list.length].replace("-", "_") + ".jpg";
}

/**
 * Inline hatched placeholder, used for the Liza interiors that have not been
 * professionally photographed yet.
 */
export function ph(label: string, w: number, h: number): string {
  const fontSize = Math.max(14, Math.round(w / 40));
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">` +
    `<defs><pattern id="s" width="18" height="18" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">` +
    `<rect width="18" height="18" fill="#EDF1EA"/><rect width="9" height="18" fill="#E2E9DF"/>` +
    `</pattern></defs><rect width="100%" height="100%" fill="url(#s)"/>` +
    `<text x="50%" y="50%" font-family="monospace" font-size="${fontSize}" fill="#7C8F7E" text-anchor="middle">${label}</text>` +
    `</svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}
