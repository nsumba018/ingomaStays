import { ph } from "./images";
import type { Building, Unit, UnitType } from "./types";

/**
 * Alita photo set: `k00` is the exterior stock shot, k01–k19 are the real
 * interiors. The `/assets/keza` folder name predates the rename to Alita.
 */
const alitaPhoto = (n: number) =>
  n === 0
    ? "/assets/u1600585154340_be6161a56a0c.jpg"
    : "/assets/keza/k" + String(n).padStart(2, "0") + ".jpg";

/** Ordered gallery for Alita: [photo index, caption]. */
const ALITA_SHOTS: [number, string][] = [
  [0, "The building"],
  [1, "Saloon"],
  [2, "Saloon — fireplace wall"],
  [3, "Bedroom — main"],
  [8, "Kitchen"],
  [15, "Bathroom — shower"],
  [13, "Saloon — from above"],
  [12, "Saloon — at night"],
  [11, "Saloon — TV wall"],
  [6, "Bedroom — main"],
  [4, "Bedroom — wardrobe"],
  [7, "Bedroom — second"],
  [17, "Bedroom — curtains"],
  [5, "Bedroom"],
  [9, "Kitchen"],
  [10, "Kitchen — cabinets"],
  [14, "Bathroom"],
  [16, "Bathroom — vanity"],
  [18, "Balcony"],
  [19, "Entrance"],
];

const ARTHA_ROOMS = [
  "Living room",
  "Main bedroom",
  "Second bedroom",
  "Kitchen",
  "Bathroom",
  "Balcony",
  "Dining area",
  "Entrance",
];

/** How many units of one type a building holds, and what they cost per night. */
interface UnitMix {
  type: UnitType;
  count: number;
  price: number;
  sleeps: number;
}

/**
 * Builds a building's unit stack from its mix, numbering units 1..n in the
 * order the mix is listed (smallest type first).
 *
 * Units named in `occupied` carry a long mid-month booking; the rest get a
 * deterministic pattern so availability visibly changes as the guest moves
 * their dates.
 */
function buildUnits(mix: UnitMix[], occupied: number[]): Unit[] {
  const units: Unit[] = [];
  for (const { type, count, price, sleeps } of mix) {
    for (let i = 0; i < count; i++) {
      const n = units.length + 1;
      const booked: [number, number][] = occupied.includes(n)
        ? [[1, 7]]
        : n % 3 === 0
          ? [[0, 3]]
          : n % 4 === 0
            ? [[7, 10]]
            : [];
      units.push({ n, type, price, sleeps, booked });
    }
  }
  return units;
}

/** The two buildings Ingoma Homes owns and operates. */
export function buildings(): Building[] {
  const defs = [
    {
      id: 1,
      title: "Alita Apartments",
      location: "Kicukiro",
      collection: "KICUKIRO",
      rating: "4.95",
      reviews: 86,
      sleeps: 6,
      beds: 3,
      baths: 2,
      specs: "10 units · studio to 3-bedroom",
      cat: [
        "Kicukiro",
        "Romantic escapes",
        "Weekend getaways",
        "Business travel",
      ],
      units: buildUnits(
        [
          { type: "Studio", count: 2, price: 40, sleeps: 2 },
          { type: "1 bedroom", count: 2, price: 50, sleeps: 2 },
          { type: "2 bedrooms", count: 4, price: 70, sleeps: 4 },
          { type: "3 bedrooms", count: 2, price: 95, sleeps: 6 },
        ],
        [2, 6, 9]
      ),
      am: "Fireplace lounge · Ambient LED ceilings · Full kitchen",
      mx: 60,
      my: 61,
      dist: "10 min to Kigali CBD, 15 min to the airport",
      desc: "Ten apartments in Kicukiro finished in black, gold and soft pink — electric-fireplace lounges under ambient LED ceilings, fully equipped kitchens with oven and full-size fridge, and ensuite shower rooms in matte black tile. The stack runs from studios up to three-bedroom homes, so a solo traveller and a family of six book the same building. Ten minutes to the CBD, fifteen to the airport, with parking inside the compound and daily housekeeping by our team.",
      img: "/assets/u1600585154340_be6161a56a0c.jpg",
      gallery: ALITA_SHOTS.map(([n, alt]) => ({ src: alitaPhoto(n), alt })),
      bedrooms: [
        {
          name: "Studio units",
          bed: "Units 1–2 · sleeps 2",
          img: alitaPhoto(5),
        },
        {
          name: "1-bedroom units",
          bed: "Units 3–4 · sleeps 2",
          img: alitaPhoto(3),
        },
        {
          name: "2-bedroom units",
          bed: "Units 5–8 · sleeps 4",
          img: alitaPhoto(7),
        },
        {
          name: "3-bedroom units",
          bed: "Units 9–10 · sleeps 6",
          img: alitaPhoto(1),
        },
      ],
      revs: [
        {
          name: "Amélie R.",
          img: "/assets/u1494790108377_be9c29b29330.jpg",
          when: "June 2026",
          text: "The photos undersell it — the fireplace lounge and the lighting make evenings special. Spotless, and the door code arrived before we landed.",
        },
        {
          name: "Kwame O.",
          img: "/assets/u1507003211169_0a1dd7228f2d.jpg",
          when: "May 2026",
          text: "Great base for work — quiet street in Kicukiro, fast wifi, and the kitchen has everything. Booking again next month.",
        },
      ],
    },
    {
      id: 2,
      title: "Artha Apartments",
      location: "Nyarugenge",
      collection: "NYARUGENGE",
      rating: "4.90",
      reviews: 74,
      sleeps: 4,
      beds: 2,
      baths: 1,
      specs: "2 units · both 2-bedroom",
      cat: [
        "Nyarugenge",
        "Family-friendly",
        "Weekend getaways",
        "Business travel",
      ],
      units: buildUnits(
        [{ type: "2 bedrooms", count: 2, price: 60, sleeps: 4 }],
        [1]
      ),
      am: "City-centre location · Full kitchen · Fast Wi-Fi",
      mx: 36,
      my: 36,
      dist: "In the city centre, Nyarugenge",
      desc: "Our second building sits in Nyarugenge, the heart of Kigali — markets, restaurants and the CBD within walking distance. Two apartments, and both are the same layout: two bedrooms, a living room and a full kitchen, with the same Ingoma standard of housekeeping, linen and 24/7 support you’ll find at Alita. Professional interior photos are being shot now.",
      img: "/assets/u1512917774080_9991f1c4c750.jpg",
      gallery: [
        { src: "/assets/u1512917774080_9991f1c4c750.jpg", alt: "The building" },
        ...ARTHA_ROOMS.map((alt) => ({
          src: ph("Artha · " + alt + " · photo coming soon", 1000, 760),
          alt,
        })),
      ],
      bedrooms: [
        {
          name: "2-bedroom units",
          bed: "Units 1–2 · sleeps 4",
          img: ph("Artha · 2-bedroom unit", 700, 520),
        },
      ],
      revs: [
        {
          name: "Sandrine M.",
          img: "/assets/u1438761681033_6461ffad8d80.jpg",
          when: "June 2026",
          text: "Everything in the city is on foot from here. Clean, safe and the guest line actually answers at night.",
        },
        {
          name: "Daniel B.",
          img: "/assets/u1500648767791_00dcc994a43e.jpg",
          when: "April 2026",
          text: "Same team and same standard as their Kicukiro apartment — you can tell one company runs both.",
        },
      ],
    },
  ];

  // Headline price is the cheapest unit in the building.
  return defs.map((p) => ({
    ...p,
    price: Math.min(...p.units.map((u) => u.price)),
  }));
}

/** Bookable check-in/check-out days, as offsets into August 2026. */
export const DAYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => i + 2);

export const NAV_LINKS: [string, string][] = [
  ["Home", "home"],
  ["Our Homes", "homes"],
  ["Destinations", "destinations"],
  ["Experiences", "experiences"],
  ["About Us", "about"],
  ["Contact", "contact"],
];

/** Experiences screen is built but hidden for now; flip to true to bring it back. */
export const SHOW_EXPERIENCES = false;

export const DASH_SECTIONS = [
  "Upcoming bookings",
  "Past stays",
  "Saved homes",
  "Payments & receipts",
  "Messages",
  "Itineraries",
  "Reviews",
];

export const STEP_NAMES = ["Unit", "Dates", "Guests", "Services", "Payment"];

export const CATEGORY_NAMES = ["All", "Kicukiro", "Nyarugenge"];
