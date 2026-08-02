import { ph } from "./images";
import type { Building, Unit, UnitType } from "./types";

/** Keza photo set: `k00` is the exterior stock shot, k01–k19 are the real interiors. */
const kezaPhoto = (n: number) =>
  n === 0
    ? "/assets/u1600585154340_be6161a56a0c.jpg"
    : "/assets/keza/k" + String(n).padStart(2, "0") + ".jpg";

/** Ordered gallery for Keza: [photo index, caption]. */
const KEZA_SHOTS: [number, string][] = [
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

const LIZA_ROOMS = [
  "Living room",
  "Main bedroom",
  "Second bedroom",
  "Kitchen",
  "Bathroom",
  "Balcony",
  "Dining area",
  "Entrance",
];

/**
 * Builds the 19-unit stack for a building.
 *
 * Units 1–8 are one-bedroom, 9–15 two-bedroom, 16–19 three-bedroom. Units named
 * in `occupied` carry a long mid-month booking; the rest get a deterministic
 * pattern so availability visibly changes as the guest moves their dates.
 */
function buildUnits(
  occupied: number[],
  oneBed: number,
  twoBed: number,
  threeBed: number
): Unit[] {
  return Array.from({ length: 19 }, (_, i) => {
    const n = i + 1;
    const type: UnitType =
      n <= 8 ? "1 bedroom" : n <= 15 ? "2 bedrooms" : "3 bedrooms";
    const booked: [number, number][] = occupied.includes(n)
      ? [[1, 7]]
      : n % 3 === 0
        ? [[0, 3]]
        : n % 4 === 0
          ? [[7, 10]]
          : [];
    return {
      n,
      type,
      price: n <= 8 ? oneBed : n <= 15 ? twoBed : threeBed,
      sleeps: n <= 8 ? 2 : n <= 15 ? 4 : 6,
      booked,
    };
  });
}

/** The two buildings Ingoma Homes owns and operates. */
export function buildings(): Building[] {
  const defs = [
    {
      id: 1,
      title: "Keza Apartments",
      location: "Kicukiro",
      collection: "KICUKIRO",
      rating: "4.95",
      reviews: 86,
      sleeps: 4,
      beds: 2,
      baths: 2,
      cat: [
        "Kicukiro",
        "Romantic escapes",
        "Weekend getaways",
        "Business travel",
      ],
      units: buildUnits([2, 3, 6, 9, 11, 14, 17], 50, 70, 95),
      am: "Fireplace lounge · Ambient LED ceilings · Full kitchen",
      mx: 60,
      my: 61,
      dist: "10 min to Kigali CBD, 15 min to the airport",
      desc: "A two-bedroom apartment in Kicukiro finished in black, gold and soft pink — an electric-fireplace lounge under ambient LED ceilings, a fully equipped kitchen with oven and full-size fridge, and two ensuite shower rooms in matte black tile. Ten minutes to the CBD, fifteen to the airport, with parking inside the compound and daily housekeeping by our team.",
      img: "/assets/u1600585154340_be6161a56a0c.jpg",
      gallery: KEZA_SHOTS.map(([n, alt]) => ({ src: kezaPhoto(n), alt })),
      bedrooms: [
        {
          name: "1-bedroom units",
          bed: "Units 1–8 · sleeps 2",
          img: kezaPhoto(3),
        },
        {
          name: "2-bedroom units",
          bed: "Units 9–15 · sleeps 4",
          img: kezaPhoto(7),
        },
        {
          name: "3-bedroom units",
          bed: "Units 16–19 · sleeps 6",
          img: kezaPhoto(1),
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
      title: "Liza Apartments",
      location: "Nyarugenge",
      collection: "NYARUGENGE",
      rating: "4.90",
      reviews: 74,
      sleeps: 3,
      beds: 2,
      baths: 1,
      cat: [
        "Nyarugenge",
        "Family-friendly",
        "Weekend getaways",
        "Business travel",
      ],
      units: buildUnits([1, 4, 5, 8, 13, 16, 18, 19], 45, 60, 85),
      am: "City-centre location · Full kitchen · Fast Wi-Fi",
      mx: 36,
      my: 36,
      dist: "In the city centre, Nyarugenge",
      desc: "Our second apartment sits in Nyarugenge, the heart of Kigali — markets, restaurants and the CBD within walking distance. Two bedrooms, a full kitchen and the same Ingoma standard of housekeeping, linen and 24/7 support you’ll find at Keza. Professional interior photos are being shot now.",
      img: "/assets/u1512917774080_9991f1c4c750.jpg",
      gallery: [
        { src: "/assets/u1512917774080_9991f1c4c750.jpg", alt: "The building" },
        ...LIZA_ROOMS.map((alt) => ({
          src: ph("Liza · " + alt + " · photo coming soon", 1000, 760),
          alt,
        })),
      ],
      bedrooms: [
        {
          name: "1-bedroom units",
          bed: "Units 1–8 · sleeps 2",
          img: ph("Liza · 1-bedroom unit", 700, 520),
        },
        {
          name: "2-bedroom units",
          bed: "Units 9–15 · sleeps 4",
          img: ph("Liza · 2-bedroom unit", 700, 520),
        },
        {
          name: "3-bedroom units",
          bed: "Units 16–19 · sleeps 6",
          img: ph("Liza · 3-bedroom unit", 700, 520),
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
    specs: "19 units · 1, 2 & 3-bedroom options",
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
