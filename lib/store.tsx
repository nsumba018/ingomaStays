"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  buildings,
  CATEGORY_NAMES,
  DASH_SECTIONS,
  DAYS,
  SHOW_EXPERIENCES,
  STEP_NAMES,
} from "./data";
import { img } from "./images";
import type {
  Currency,
  ResolvedBuilding,
  ResolvedUnit,
  Screen,
  State,
  UnitType,
} from "./types";

const INITIAL: State = {
  screen: "home",
  selId: 1,
  cat: "All",
  query: "",
  curOverride: null,
  wish: {},
  hoverId: null,
  unitSel: {},
  priceCap: 0,
  booking: false,
  step: 0,
  guests: 2,
  adults: 2,
  kids: 0,
  infants: 0,
  ci: 2,
  co: 6,
  trip: null,
  pay: "card",
  extras: { airport: true },
  faq: 0,
  dash: "Upcoming bookings",
  gallery: false,
};

export interface IngomaProps {
  currency?: Currency;
  companyName?: string;
}

type Derived = ReturnType<typeof derive>;

const Ctx = createContext<Derived | null>(null);

export function useIngoma(): Derived {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useIngoma must be used inside <IngomaProvider>");
  return ctx;
}

export function IngomaProvider({
  children,
  currency = "USD",
  companyName = "Ingoma Homes",
}: IngomaProps & { children: ReactNode }) {
  const [state, setState] = useState<State>(INITIAL);

  const patch = useCallback(
    (next: Partial<State> | ((prev: State) => Partial<State>)) =>
      setState((prev) => ({
        ...prev,
        ...(typeof next === "function" ? next(prev) : next),
      })),
    []
  );

  const value = useMemo(
    () => derive(state, patch, currency, companyName),
    [state, patch, currency, companyName]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

type Patch = (next: Partial<State> | ((prev: State) => Partial<State>)) => void;

/** Unit types smallest-first, so every tier list on the site reads in one order. */
const TIER_ORDER: UnitType[] = [
  "Studio",
  "1 bedroom",
  "2 bedrooms",
  "3 bedrooms",
];

const TIER_SHORT: Record<UnitType, string> = {
  Studio: "Studio",
  "1 bedroom": "1 BR",
  "2 bedrooms": "2 BR",
  "3 bedrooms": "3 BR",
};

const TIER_LABEL: Record<UnitType, string> = {
  Studio: "Studio units",
  "1 bedroom": "1-bedroom units",
  "2 bedrooms": "2-bedroom units",
  "3 bedrooms": "3-bedroom units",
};

/** Groups a building's units by type, smallest first, skipping types it lacks. */
function tiersOf<T extends { type: UnitType }>(units: T[]): [UnitType, T[]][] {
  return TIER_ORDER.map(
    (type) => [type, units.filter((u) => u.type === type)] as [UnitType, T[]]
  ).filter(([, us]) => us.length > 0);
}

/** "studio, 1, 2 & 3 bedrooms" — the mix a building offers, as a chip. */
function mixLabel(units: { type: UnitType }[]): string {
  const types = tiersOf(units).map(([type]) => type);
  if (types.length === 1)
    return types[0] === "Studio" ? "studios" : "all " + types[0];
  const parts = types.map((t) => (t === "Studio" ? "studio" : parseInt(t, 10)));
  const last = parts.pop();
  return parts.join(", ") + " & " + last + " bedrooms";
}

function derive(
  s: State,
  patch: Patch,
  propCurrency: Currency,
  companyName: string
) {
  const cur: Currency = s.curOverride ?? propCurrency;

  /** Renders a USD amount in the currently selected currency. */
  const fmt = (usd: number) =>
    cur === "USD"
      ? "$" + usd.toLocaleString()
      : "FRw " + Math.round(usd * 1420).toLocaleString();

  const scrollTop = () => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  };
  const nav = (screen: Screen) => () => {
    patch({ screen });
    scrollTop();
  };

  // ---- buildings, with occupancy resolved against the chosen dates ---------
  const resolved: ResolvedBuilding[] = buildings().map((p) => {
    const units: ResolvedUnit[] = p.units.map((u) => ({
      ...u,
      occupied: u.booked.some((b) => b[0] < s.co && b[1] > s.ci),
    }));
    return { ...p, units, availCount: units.filter((u) => !u.occupied).length };
  });

  const homes = resolved.map((p) => ({
    ...p,
    priceLabel: "from " + fmt(p.price),
    chips: [
      p.units.length + (p.units.length === 1 ? " unit" : " units"),
      mixLabel(p.units),
      p.availCount + " available for your dates",
    ].map((label) => ({ label })),
    // One "<type> <price>" per unit type the building actually has.
    tierLabel:
      tiersOf(p.units)
        .map(([type, us]) => TIER_SHORT[type] + " " + fmt(us[0].price))
        .join(" · ") + " / night",
    open: () => {
      patch({ screen: "detail", selId: p.id, gallery: false });
      scrollTop();
    },
    book: (e: { stopPropagation(): void }) => {
      e.stopPropagation();
      patch({ selId: p.id, booking: true, step: 0 });
    },
    hover: () => patch({ hoverId: p.id }),
    unhover: () => patch({ hoverId: null }),
    toggleWish: (e: { stopPropagation(): void }) => {
      e.stopPropagation();
      patch((st) => ({ wish: { ...st.wish, [p.id]: !st.wish[p.id] } }));
    },
    heartStyle: {
      fontSize: "16px",
      lineHeight: 1,
      color: s.wish[p.id] ? "#D32F2F" : "#BDBDBD",
      animation: s.wish[p.id] ? "pop .3s ease" : "none",
      display: "block",
    } as CSSProperties,
    cardStyle: {
      background: "#fff",
      borderRadius: "20px",
      overflow: "hidden",
      transition: "transform .22s ease,box-shadow .22s ease",
      border: s.hoverId === p.id ? "1px solid #8A6A14" : "1px solid #E8E8E8",
      transform: s.hoverId === p.id ? "translateY(-4px)" : "none",
      boxShadow:
        s.hoverId === p.id ? "0 20px 40px rgba(33,33,33,.14)" : "none",
    } as CSSProperties,
  }));

  type Home = (typeof homes)[number];

  // ---- search / filter ----------------------------------------------------
  const q = s.query.trim().toLowerCase();
  let results = homes.filter(
    (p) => s.cat === "All" || p.cat.includes(s.cat) || p.location === s.cat
  );
  if (s.priceCap)
    results = results.filter((p) =>
      p.units.some((u) => !u.occupied && u.price <= s.priceCap)
    );
  if (q)
    results = results.filter((p) =>
      (p.title + " " + p.location + " " + p.cat.join(" "))
        .toLowerCase()
        .includes(q)
    );

  const categories = CATEGORY_NAMES.map((label) => ({
    label,
    pick: () => patch({ cat: label, screen: "homes" }),
    style: {
      flex: "0 0 auto",
      padding: "10px 18px",
      borderRadius: "999px",
      fontSize: "13.5px",
      fontWeight: 600,
      cursor: "pointer",
      whiteSpace: "nowrap",
      transition: "all .18s ease",
      background: s.cat === label ? "#8A6A14" : "#fff",
      color: s.cat === label ? "#fff" : "#424242",
      border: s.cat === label ? "1px solid #8A6A14" : "1px solid #E8E8E8",
    } as CSSProperties,
  }));

  // ---- selected building + unit ------------------------------------------
  const sel: Home = homes.find((p) => p.id === s.selId) ?? homes[0];
  const units = sel.units;
  const selectedUnit =
    units.find((u) => u.n === s.unitSel[sel.id] && !u.occupied) ??
    units.find((u) => !u.occupied) ??
    units[0];
  const unitPrice = selectedUnit.price;

  const selUnits = units.map((u) => {
    const isSel = u.n === selectedUnit.n;
    return {
      n: u.n,
      type: u.type,
      sleeps: u.sleeps,
      priceLabel: fmt(u.price),
      status: u.occupied ? "Occupied" : "Available",
      pick: () => {
        if (!u.occupied)
          patch((st) => ({
            unitSel: { ...st.unitSel, [sel.id]: u.n },
            guests: Math.min(st.guests, u.sleeps),
          }));
      },
      style: {
        background: u.occupied ? "#F7F4EA" : "#fff",
        border: isSel ? "2px solid #8A6A14" : "1px solid #E8E8E8",
        borderRadius: "14px",
        padding: "14px",
        cursor: u.occupied ? "not-allowed" : "pointer",
        opacity: u.occupied ? 0.62 : 1,
        boxShadow: isSel ? "0 0 0 3px rgba(138,106,20,.12)" : "none",
        transition: "all .15s ease",
      } as CSSProperties,
      badgeStyle: {
        fontSize: "10.5px",
        fontWeight: 700,
        borderRadius: "999px",
        padding: "3px 8px",
        whiteSpace: "nowrap",
        background: u.occupied ? "#ECECEA" : "#F7EFD5",
        color: u.occupied ? "#9E9E9E" : "#8A6A14",
      } as CSSProperties,
    };
  });

  const unitGroups = tiersOf(selUnits).map(([type, us]) => ({
    label: TIER_LABEL[type],
    priceLabel: us[0].priceLabel + " / night",
    units: us,
  }));

  // ---- pricing ------------------------------------------------------------
  const nights = Math.max(1, s.co - s.ci);
  const subtotal = unitPrice * nights;
  const cleaning = Math.round(unitPrice * 0.12);
  const service = Math.round(subtotal * 0.09);

  const svcDefs: [string, string, string, number][] = [
    [
      "airport",
      "Airport pickup",
      "Private car, meet & greet at Kigali International",
      60,
    ],
    [
      "breakfast",
      "Daily breakfast",
      "Rwandan coffee, fruit, eggs — prepared in the home",
      18 * Math.max(1, s.guests),
    ],
    ["car", "Car rental", "4x4 with unlimited mileage, delivered to the door", 95],
    ["tours", "Guided tours", "A day with one of our vetted local guides", 140],
  ];
  const extrasTotal = svcDefs.reduce(
    (n, [k, , , price]) => n + (s.extras[k] ? price : 0),
    0
  );
  const total = subtotal + cleaning + service + extrasTotal;
  const tripDates = "Aug " + DAYS[s.ci] + " – " + DAYS[s.co] + ", 2026";

  // ---- date picker --------------------------------------------------------
  const chipBase = {
    borderRadius: "10px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all .15s ease",
  };
  const dateChips = DAYS.map((day, i) => {
    const active = i >= s.ci && i <= s.co;
    const edge = i === s.ci || i === s.co;
    const skin = {
      background: edge ? "#8A6A14" : active ? "#F7EFD5" : "#fff",
      color: edge ? "#fff" : active ? "#8A6A14" : "#424242",
      border: edge
        ? "1px solid #8A6A14"
        : active
          ? "1px solid #E8D9A8"
          : "1px solid #E8E8E8",
    };
    return {
      label: "Aug " + day,
      // Clicking nearer the check-in edge moves check-in; otherwise check-out.
      pick: () => {
        if (i < s.ci || (i > s.ci && i < s.co && i - s.ci < s.co - i))
          patch({ ci: i });
        else patch({ co: Math.max(i, s.ci + 1) });
      },
      style: {
        ...chipBase,
        ...skin,
        padding: "8px 12px",
        fontSize: "12.5px",
      } as CSSProperties,
      bigStyle: {
        ...chipBase,
        ...skin,
        padding: "14px 20px",
        fontSize: "14px",
      } as CSSProperties,
    };
  });

  const steps = STEP_NAMES.map((_, i) => ({
    style: {
      height: "4px",
      flex: 1,
      borderRadius: "999px",
      background: i <= s.step ? "#8A6A14" : "#E4E4E0",
      transition: "background .25s ease",
    } as CSSProperties,
  }));

  const wished = homes.filter((p) => s.wish[p.id]);

  // ---- destinations -------------------------------------------------------
  const destDefs: [string, string, string, string, string][] = [
    [
      "Kicukiro",
      "Home of Alita Apartments — a calm residential district ten minutes south-east of the centre, with easy airport access.",
      "Alita Apartments",
      "Residential calm",
      "15 min to airport",
    ],
    [
      "Nyarugenge",
      "Home of Artha Apartments — the beating heart of Kigali, with the CBD, markets and nightlife at the door.",
      "Artha Apartments",
      "City centre",
      "Markets & dining",
    ],
  ];
  const destinations = destDefs.map(([name, desc, ...tags], i) => {
    const list = homes.filter((h) => h.location === name);
    const from = list.length ? Math.min(...list.map((h) => h.price)) : 120;
    return {
      name,
      desc,
      blurb: tags[0],
      count: list.length || 2,
      from: fmt(from),
      img:
        i === 0
          ? "/assets/u1600585154340_be6161a56a0c.jpg"
          : "/assets/u1512917774080_9991f1c4c750.jpg",
      tags: tags.map((label) => ({ label })),
      go: () => {
        patch({ screen: "homes", cat: name });
        scrollTop();
      },
      // Odd rows mirror the image/text columns.
      rowStyle: i % 2 ? "direction:rtl;" : "",
      imgWrapStyle: i % 2 ? "direction:ltr;grid-column:2;grid-row:1;" : "",
      textStyle: i % 2 ? "direction:ltr;grid-column:1;grid-row:1;" : "",
    };
  });

  const galleryRow = (i: number): CSSProperties => ({
    gridColumn: i % 3 === 0 ? "1 / span 2" : "auto",
    height: i % 3 === 0 ? "420px" : "300px",
  });

  const bookingRef = "ING-" + (4200 + sel.id * 20 + selectedUnit.n);

  return {
    companyName,

    // ---- routing ----------------------------------------------------------
    onHome: s.screen === "home",
    onHomes: s.screen === "homes",
    onDestinations: s.screen === "destinations",
    onExperiences: SHOW_EXPERIENCES && s.screen === "experiences",
    onAbout: s.screen === "about",
    onContact: s.screen === "contact",
    onSaved: s.screen === "saved",
    onDashboard: s.screen === "dashboard",
    onDetail: s.screen === "detail",

    navLinks: (
      [
        ["Home", "home"],
        ["Our Homes", "homes"],
        ["Destinations", "destinations"],
        ...(SHOW_EXPERIENCES ? [["Experiences", "experiences"]] : []),
        ["About Us", "about"],
        ["Contact", "contact"],
      ] as [string, Screen][]
    ).map(([label, key]) => ({
      label,
      go: nav(key),
      style: {
        fontSize: "13.5px",
        fontWeight: s.screen === key ? 600 : 500,
        padding: "9px 12px",
        borderRadius: "999px",
        cursor: "pointer",
        whiteSpace: "nowrap",
        flex: "0 0 auto",
        color: s.screen === key ? "#8A6A14" : "#424242",
        background: s.screen === key ? "#F7EFD5" : "transparent",
        transition: "all .18s ease",
      } as CSSProperties,
    })),
    goHome: nav("home"),
    goHomes: nav("homes"),
    goSaved: nav("saved"),
    goDashboard: nav("dashboard"),
    goContact: nav("contact"),
    openLuxury: () => {
      patch({ screen: "homes", cat: "All" });
      scrollTop();
    },

    // ---- localisation -----------------------------------------------------
    currency: cur,
    currencyName: cur === "USD" ? "US Dollar ($)" : "Rwandan Franc (FRw)",
    toggleCurrency: () =>
      patch({ curOverride: cur === "USD" ? "RWF" : "USD" }),

    // ---- search -----------------------------------------------------------
    query: s.query,
    setQuery: (e: { target: { value: string } }) =>
      patch({ query: e.target.value }),

    // ---- home screen ------------------------------------------------------
    heroStats: [
      { value: String(resolved.length), label: "apartment buildings" },
      {
        value: String(resolved.reduce((n, p) => n + p.units.length, 0)),
        label: "units across Kigali",
      },
      { value: "4.93★", label: "guest rating" },
    ],
    promises: [
      { label: "Professionally cleaned before every stay" },
      { label: "Verified quality standards" },
      { label: "Secure direct booking" },
      { label: "24/7 guest support" },
    ],
    totalReviews: "160",
    featured: homes,
    luxury: homes,
    destinations,

    moods: (
      [
        [
          "Family-friendly",
          "Cots, stair gates and gardens as standard.",
          "family,children,garden",
        ],
        [
          "Weekend getaways",
          "Two nights, an hour from Kigali.",
          "cottage,retreat,nature",
        ],
        [
          "Romantic escapes",
          "Two-person homes with the best views we own.",
          "couple,sunset,terrace",
        ],
        [
          "Business travel",
          "Desks, fibre and backup power in every room.",
          "desk,office,workspace",
        ],
      ] as [string, string, string][]
    ).map(([title, sub, tags]) => ({
      title,
      sub,
      count: homes.filter((h) => h.cat.includes(title)).length || 3,
      img: img("mood-" + title.split(" ")[0].toLowerCase(), tags),
      go: () => {
        patch({ screen: "homes", cat: title });
        scrollTop();
      },
    })),

    standardsImgs: [
      { src: "/assets/keza/k03.jpg", alt: "Main bedroom at Alita" },
      { src: "/assets/keza/k08.jpg", alt: "Kitchen at Alita" },
      { src: "/assets/keza/k14.jpg", alt: "Bathroom at Alita" },
      { src: "/assets/keza/k18.jpg", alt: "Balcony at Alita" },
    ],
    trust: [
      {
        glyph: "✓",
        title: "We own every home",
        sub: "No third-party hosts. One company, one contract, one standard.",
      },
      {
        glyph: "✦",
        title: "Cleaned before every stay",
        sub: "A 60-point checklist completed and photographed by our housekeeping team.",
      },
      {
        glyph: "🔒",
        title: "Secure direct booking",
        sub: "Payment goes straight to Ingoma Homes, encrypted end to end.",
      },
      {
        glyph: "☏",
        title: "24/7 guest support",
        sub: "Our Kigali team answers in under an hour, in three languages.",
      },
      {
        glyph: "⌂",
        title: "Self check-in",
        sub: "A door code lands on your phone the morning you arrive.",
      },
      {
        glyph: "◎",
        title: "Concierge as standard",
        sub: "Transfers, tours and tables booked by people who live here.",
      },
    ],
    testimonials: [
      {
        name: "Amélie R.",
        place: "Paris",
        home: "Alita Apartments",
        img: img("t-amelie", "portrait,woman"),
        quote:
          "Booking direct with the company made the whole thing simple — one contact, one invoice, and the home was exactly as photographed.",
      },
      {
        name: "Kwame O.",
        place: "Accra",
        home: "Alita Apartments",
        img: img("t-kwame", "portrait,man"),
        quote:
          "I have used them three times for work. Same wifi speed, same coffee, same spotless kitchen every single visit.",
      },
      {
        name: "Sandrine M.",
        place: "Kigali",
        home: "Artha Apartments",
        img: img("t-sandrine", "portrait,face"),
        quote:
          "Paying in francs with mobile money and getting a real receipt from a real company — that is why I keep booking with Ingoma.",
      },
    ],
    faqs: (
      [
        [
          "Do you own both apartments?",
          "Yes. Alita Apartments (Kicukiro) and Artha Apartments (Nyarugenge) are owned and operated by Ingoma Homes. There are no third-party hosts — you book directly with us.",
        ],
        [
          "How is cleaning handled?",
          "Our own housekeeping team cleans each home to a 60-point checklist before every arrival and photographs the result. Stays of four nights or more include a mid-stay service.",
        ],
        [
          "What time is check-in and check-out?",
          "Check-in is from 14:00 with a door code sent to your phone that morning; check-out is 11:00. Early arrival and late departure can usually be arranged free of charge.",
        ],
        [
          "Can I pay in Rwandan francs?",
          "Yes. Switch the currency in the header and pay by card, MTN Mobile Money or bank transfer. All prices include VAT and there are no hidden fees.",
        ],
        [
          "What is your cancellation policy?",
          "Free cancellation up to 48 hours before check-in on every home. Inside 48 hours the first night is charged and the rest is refunded.",
        ],
      ] as [string, string][]
    ).map(([question, answer], i) => ({
      q: question,
      a: answer,
      open: s.faq === i,
      toggle: () => patch({ faq: s.faq === i ? -1 : i }),
      iconStyle: {
        fontSize: "20px",
        color: "#9E9E9E",
        transform: s.faq === i ? "rotate(45deg)" : "none",
        transition: "transform .2s ease",
      } as CSSProperties,
    })),

    // ---- our homes screen -------------------------------------------------
    categories,
    results,
    resultCount: results.length,
    filterSummary:
      (s.cat === "All" ? "All homes" : s.cat) +
      " · " +
      tripDates +
      " · " +
      s.guests +
      " guests" +
      (s.priceCap ? " · units up to " + fmt(s.priceCap) + " / night" : ""),
    priceCap: s.priceCap,
    priceOptions: [
      { value: 0, label: "Any price" },
      ...[40, 50, 60, 70, 95].map((v) => ({
        value: v,
        label: "Up to " + fmt(v) + " / night",
      })),
    ],
    setPriceCap: (e: { target: { value: string } }) =>
      patch({ priceCap: +e.target.value }),
    mapPins: results.map((p) => ({
      name: p.title.split(" ")[0],
      open: p.open,
      hover: p.hover,
      unhover: p.unhover,
      prices: tiersOf(p.units).map(([type, us]) => ({
        label: fmt(us[0].price),
        br: TIER_SHORT[type],
      })),
      wrapStyle: {
        position: "absolute",
        left: p.mx + "%",
        top: p.my + "%",
        transform: "translate(-50%,-50%)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
        zIndex: s.hoverId === p.id ? 5 : 1,
      } as CSSProperties,
      nameStyle: {
        background: s.hoverId === p.id ? "#8A6A14" : "#fff",
        color: s.hoverId === p.id ? "#fff" : "#212121",
        borderRadius: "999px",
        padding: "6px 13px",
        fontSize: "12.5px",
        fontWeight: 700,
        whiteSpace: "nowrap",
        boxShadow:
          s.hoverId === p.id
            ? "0 8px 20px rgba(0,0,0,.28)"
            : "0 3px 10px rgba(0,0,0,.16)",
        transition:
          "background .18s ease,color .18s ease,box-shadow .18s ease",
      } as CSSProperties,
      rowStyle: { display: "flex", gap: "4px" } as CSSProperties,
    })),

    // ---- experiences screen -----------------------------------------------
    experiences: (
      [
        [
          "Gorilla trekking",
          "Permit, porter and a 4:30am transfer from your home.",
          1500,
          "Full day",
          "gorilla,wildlife",
        ],
        [
          "Coffee farm morning",
          "Pick, wash and cup with a co-operative outside Huye.",
          45,
          "3 hrs",
          "coffee,farm",
        ],
        [
          "Lake Kivu cruise",
          "Private boat to Napoleon Island with lunch aboard.",
          60,
          "2 hrs",
          "boat,lake",
        ],
        [
          "Kigali city & memorial",
          "A guided half day through the city with our historian.",
          35,
          "Half day",
          "city,street,africa",
        ],
        [
          "Congo Nile Trail ride",
          "Supported cycling along the Kivu shoreline.",
          80,
          "Full day",
          "cycling,bike",
        ],
        [
          "Cooking with our chef",
          "Learn isombe and brochettes in your own kitchen.",
          40,
          "3 hrs",
          "cooking,kitchen,food",
        ],
      ] as [string, string, number, string, string][]
    ).map(([name, sub, usd, dur, tags]) => ({
      name,
      sub,
      dur,
      priceLabel: fmt(usd) + " pp",
      img: img("x-" + name.split(" ")[0].toLowerCase(), tags),
    })),

    // ---- about screen -----------------------------------------------------
    aboutImgs: [
      { src: "/assets/keza/k02.jpg", alt: "Living room, Alita" },
      { src: "/assets/keza/k06.jpg", alt: "Main bedroom, Alita" },
      { src: "/assets/keza/k09.jpg", alt: "Kitchen, Alita" },
      { src: "/assets/keza/k11.jpg", alt: "Lounge wall, Alita" },
    ],
    pillars: [
      {
        kicker: "MISSION",
        title: "Consistency you can book on",
        body: "To make a stay in Rwanda as predictable in quality as it is surprising in beauty — by owning and running every home ourselves.",
      },
      {
        kicker: "VISION",
        title: "More apartments, one standard",
        body: "To grow Kigali’s most trusted collection of serviced apartments, without ever franchising the service.",
      },
      {
        kicker: "SUSTAINABILITY",
        title: "Built and staffed locally",
        body: "Solar hot water in every home, refillable amenities, and furniture made by workshops in Kigali and Musanze.",
      },
    ],
    standards: [
      { n: "01", title: "60-point clean", sub: "Photographed before every arrival." },
      { n: "02", title: "Weekly inspection", sub: "A manager visits every home each week." },
      { n: "03", title: "Linen standard", sub: "Hotel-grade cotton, replaced quarterly." },
      { n: "04", title: "Backup power", sub: "Inverter or generator in every home." },
      { n: "05", title: "Verified wifi", sub: "Speed-tested monthly, 100 Mbps minimum." },
      { n: "06", title: "Safety kit", sub: "Extinguisher, first aid and smoke alarms." },
      { n: "07", title: "Same-day fixes", sub: "A maintenance team on call in each region." },
      { n: "08", title: "Fair pay", sub: "All staff employed directly, above sector average." },
    ],

    // ---- contact screen ---------------------------------------------------
    contactRows: [
      { glyph: "☏", label: "Guest line · 24/7", value: "+250 788 000 240" },
      { glyph: "✉", label: "Email", value: "stay@ingomahomes.rw" },
      { glyph: "◎", label: "Head office", value: "KN 4 Ave, Kiyovu, Kigali" },
      { glyph: "✦", label: "WhatsApp", value: "+250 788 000 241" },
    ],
    contactTopics: [
      "A new booking",
      "An existing stay",
      "Group or long stay",
      "Something else",
    ].map((label, i) => ({
      label,
      pick: () => {},
      style: {
        border: i === 0 ? "1px solid #8A6A14" : "1px solid #E8E8E8",
        background: i === 0 ? "#F7EFD5" : "#fff",
        color: i === 0 ? "#8A6A14" : "#616161",
        borderRadius: "999px",
        padding: "8px 15px",
        fontSize: "13px",
        fontWeight: 600,
        cursor: "pointer",
      } as CSSProperties,
    })),

    // ---- wishlist ---------------------------------------------------------
    hasWishes: wished.length > 0,
    wishCount: wished.length,
    wished,
    wishEmpty: wished.length === 0,
    wishSummary: wished.length
      ? wished.length +
        " home" +
        (wished.length === 1 ? "" : "s") +
        " saved for later."
      : "Your saved homes live here.",

    // ---- guest dashboard --------------------------------------------------
    dashNav: DASH_SECTIONS.map((label) => ({
      label,
      pick: () => patch({ dash: label }),
      style: {
        padding: "11px 16px",
        borderRadius: "12px",
        fontSize: "14px",
        fontWeight: s.dash === label ? 600 : 500,
        cursor: "pointer",
        background: s.dash === label ? "#F7EFD5" : "transparent",
        color: s.dash === label ? "#8A6A14" : "#616161",
      } as CSSProperties,
    })),
    dashTitle: s.dash,
    dashIsBookings: s.dash === "Upcoming bookings" || s.dash === "Past stays",
    dashIsPayments: s.dash === "Payments & receipts",
    dashIsMessages: s.dash === "Messages",
    dashIsGeneric: ["Saved homes", "Itineraries", "Reviews"].includes(s.dash),
    pastStays: homes.map((p) => ({
      ...p,
      when: p.id === 1 ? "March 2026" : "Dec 2025",
      total: fmt(p.price * 3),
    })),
    payments: [
      {
        home: "Alita Apartments",
        dates: "12–15 Mar 2026",
        method: "Visa •••• 4218",
        amount: fmt(232),
      },
      {
        home: "Artha Apartments",
        dates: "20–23 Dec 2025",
        method: "MTN Mobile Money",
        amount: fmt(199),
      },
      {
        home: "Alita Apartments",
        dates: "8–10 Aug 2025",
        method: "Visa •••• 4218",
        amount: fmt(155),
      },
    ],
    messages: (
      [
        {
          who: "them",
          text: "Karibu! Your door code for Alita Apartments is 4-9-2-1. It activates at 14:00 on the 4th.",
        },
        { who: "me", text: "Perfect. Could we add airport pickup for two people?" },
        {
          who: "them",
          text: "Done — a driver will meet you in arrivals with a name board. Added to your booking at $60.",
        },
        { who: "me", text: "Thank you!" },
      ] as { who: string; text: string }[]
    ).map((m) => ({
      text: m.text,
      rowStyle: {
        display: "flex",
        justifyContent: m.who === "me" ? "flex-end" : "flex-start",
      } as CSSProperties,
      bubbleStyle: {
        maxWidth: "62%",
        padding: "13px 17px",
        borderRadius:
          m.who === "me" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
        fontSize: "14px",
        lineHeight: 1.55,
        background: m.who === "me" ? "#8A6A14" : "#F6F2E8",
        color: m.who === "me" ? "#fff" : "#212121",
      } as CSSProperties,
    })),

    // ---- home detail ------------------------------------------------------
    sel,
    selPriceLabel: fmt(unitPrice),
    unitGroups,
    unitIntro:
      sel.title +
      " has " +
      units.length +
      (units.length === 1 ? " unit" : " units") +
      " (" +
      mixLabel(units) +
      ").",
    unitN: selectedUnit.n,
    unitType: selectedUnit.type,
    maxGuests: selectedUnit.sleeps,
    availSummary:
      units.filter((u) => !u.occupied).length +
      " of " +
      units.length +
      " units free · Aug " +
      DAYS[s.ci] +
      "–" +
      DAYS[s.co],
    saveLabel: s.wish[sel.id] ? "Saved" : "Save",
    selHeartStyle: {
      fontSize: "15px",
      lineHeight: 1,
      color: s.wish[sel.id] ? "#D32F2F" : "#BDBDBD",
      animation: s.wish[sel.id] ? "pop .3s ease" : "none",
    } as CSSProperties,
    selToggleWish: () =>
      patch((st) => ({ wish: { ...st.wish, [sel.id]: !st.wish[sel.id] } })),
    selGallery: sel.gallery.slice(0, 5).map((g, i) => ({
      ...g,
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        cursor: "pointer",
        ...(i === 0 ? { gridColumn: "1", gridRow: "1 / span 2" } : {}),
      } as CSSProperties,
    })),
    galleryCount: sel.gallery.length,
    fullGallery: sel.gallery.map((g, i) => ({ ...g, wrapStyle: galleryRow(i) })),
    galleryOpen: s.gallery,
    openGallery: () => patch({ gallery: true }),
    closeGallery: () => patch({ gallery: false }),
    selServices: [
      { label: "Daily housekeeping" },
      { label: "Self check-in" },
      { label: "Airport pickup available" },
      { label: "Concierge service" },
      { label: "Private parking" },
    ],
    selAmenities: sel.am
      .split(" · ")
      .concat([
        "Fast Wi-Fi (100+ Mbps)",
        "Fully equipped kitchen",
        "Washer & dryer",
        "Backup power",
        "Air conditioning",
        "Private parking",
        "Outdoor seating",
        "Smart TV",
        "Workspace",
        "Daily housekeeping",
      ])
      .slice(0, 10)
      .map((label) => ({ label })),
    selLoves: [
      {
        title: "One company, start to finish",
        sub: "You book, pay and check in with Ingoma Homes — never with an individual owner.",
      },
      {
        title: "Ready the moment you arrive",
        sub: "Cleaned to our 60-point standard, stocked with coffee, water and fresh linen.",
      },
      {
        title: "Someone always answers",
        sub: "A named guest manager for your stay, plus a 24/7 line for anything urgent.",
      },
      {
        title: "The view is the point",
        sub:
          sel.dist +
          " — and every window in this home was chosen for what it looks at.",
      },
    ],
    selBedrooms: sel.bedrooms,
    houseRules: [
      { label: "Check-in", value: "From 14:00" },
      { label: "Check-out", value: "By 11:00" },
      {
        label: "Maximum guests",
        value: selectedUnit.sleeps + " guests (Unit " + selectedUnit.n + ")",
      },
      { label: "Smoking", value: "Outdoors only" },
      { label: "Parties", value: "Not permitted" },
      { label: "Pets", value: "On request" },
    ],
    selNearby: [
      { label: "Restaurants & cafés", dist: "5 min drive" },
      { label: "Supermarket", dist: "8 min drive" },
      { label: sel.location + " town centre", dist: sel.dist },
      { label: "Nearest clinic", dist: "12 min drive" },
    ],
    selReviews: sel.revs,
    closeDetail: () => {
      patch({ screen: "homes" });
      scrollTop();
    },

    // ---- guests -----------------------------------------------------------
    guests: s.guests,
    incGuests: () =>
      patch((st) => ({
        guests: Math.min(selectedUnit.sleeps, st.guests + 1),
        adults: Math.min(selectedUnit.sleeps, st.adults + 1),
      })),
    decGuests: () =>
      patch((st) => ({
        guests: Math.max(1, st.guests - 1),
        adults: Math.max(1, st.adults - 1),
      })),
    guestRows: (
      [
        ["adults", "Adults", "Ages 13 and above"],
        ["kids", "Children", "Ages 2–12"],
        ["infants", "Infants", "Under 2 · cot provided free"],
      ] as ["adults" | "kids" | "infants", string, string][]
    ).map(([key, label, sub]) => ({
      label,
      sub,
      value: s[key],
      inc: () =>
        patch((st) => {
          const next = { ...st, [key]: st[key] + 1 };
          return {
            [key]: st[key] + 1,
            guests: Math.min(selectedUnit.sleeps, next.adults + next.kids),
          };
        }),
      dec: () =>
        patch((st) => {
          const value = Math.max(key === "adults" ? 1 : 0, st[key] - 1);
          const next = { ...st, [key]: value };
          return {
            [key]: value,
            guests: Math.max(1, next.adults + next.kids),
          };
        }),
    })),

    // ---- dates & price breakdown ------------------------------------------
    dateChips,
    ciLabel: "Aug " + DAYS[s.ci],
    coLabel: "Aug " + DAYS[s.co],
    tripDates,
    dateHint:
      "Check-in Aug " +
      DAYS[s.ci] +
      " → check-out Aug " +
      DAYS[s.co] +
      " · " +
      nights +
      (nights > 1 ? " nights" : " night"),
    lineNights:
      fmt(unitPrice) + " × " + nights + (nights > 1 ? " nights" : " night"),
    lineNightsTotal: fmt(subtotal),
    lineCleaning: fmt(cleaning),
    lineService: fmt(service),
    lineTotal: fmt(total),

    // ---- booking flow -----------------------------------------------------
    onBooking: s.booking,
    steps,
    stepCounter:
      "Step " +
      Math.min(s.step + 1, 5) +
      " of 5 · " +
      STEP_NAMES[Math.min(s.step, 4)],
    stepTitle: [
      "Choose your unit",
      "Select your dates",
      "Who is coming?",
      "Add optional services",
      "Secure payment",
      "Confirmed",
    ][s.step],
    stepUnit: s.step === 0,
    stepDates: s.step === 1,
    stepGuests: s.step === 2,
    stepServices: s.step === 3,
    stepPayment: s.step === 4,
    stepConfirmed: s.step === 5,
    bookingInProgress: s.step < 5,
    canGoBack: s.step > 0,
    prevStep: () => patch((st) => ({ step: Math.max(0, st.step - 1) })),
    nextLabel:
      s.step === 4
        ? "Pay " + fmt(total)
        : s.step === 0
          ? "Continue with Unit " + selectedUnit.n
          : "Continue",
    nextStep: () => {
      if (s.step < 4) {
        patch({ step: s.step + 1 });
      } else {
        patch({
          step: 5,
          trip: {
            title: sel.title + " · Unit " + selectedUnit.n,
            img: sel.img,
            dates: tripDates,
            guests: s.guests,
            total: fmt(total),
            ref: bookingRef,
            extras:
              svcDefs
                .filter(([k]) => s.extras[k])
                .map(([, label]) => label)
                .join(", ") || "None",
          },
        });
      }
    },
    openBooking: () => patch({ booking: true, step: 0 }),
    closeBooking: () => patch({ booking: false }),
    bookingRef,
    services: svcDefs.map(([key, label, sub, price]) => ({
      label,
      sub,
      priceLabel: fmt(price),
      toggle: () =>
        patch((st) => ({ extras: { ...st.extras, [key]: !st.extras[key] } })),
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 18px",
        borderRadius: "16px",
        cursor: "pointer",
        background: "#fff",
        border: s.extras[key] ? "1px solid #8A6A14" : "1px solid #E8E8E8",
        boxShadow: s.extras[key] ? "0 0 0 3px rgba(138,106,20,.10)" : "none",
        transition: "all .18s ease",
      } as CSSProperties,
      box: {
        width: "22px",
        height: "22px",
        borderRadius: "7px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        background: s.extras[key] ? "#8A6A14" : "#fff",
        color: s.extras[key] ? "#fff" : "transparent",
        border: s.extras[key] ? "1px solid #8A6A14" : "1px solid #D5D5D0",
      } as CSSProperties,
    })),
    chosenServices: svcDefs
      .filter(([k]) => s.extras[k])
      .map(([, label, , price]) => ({ label, priceLabel: fmt(price) })),
    payMethods: (
      [
        ["card", "Visa •••• 4218", "Default"],
        ["momo", "MTN Mobile Money", "+250 78•• ••42"],
        ["bank", "Bank transfer", "2–3 days to clear"],
      ] as [string, string, string][]
    ).map(([key, label, hint]) => ({
      label,
      hint,
      pick: () => patch({ pay: key }),
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 16px",
        borderRadius: "14px",
        cursor: "pointer",
        background: "#fff",
        border: s.pay === key ? "1px solid #8A6A14" : "1px solid #E8E8E8",
        boxShadow: s.pay === key ? "0 0 0 3px rgba(138,106,20,.10)" : "none",
      } as CSSProperties,
      dot: {
        width: "16px",
        height: "16px",
        borderRadius: "999px",
        border: s.pay === key ? "5px solid #8A6A14" : "2px solid #CFCFCF",
      } as CSSProperties,
    })),
    arrival: [
      {
        title: "Getting there",
        body:
          sel.location +
          " · full address and pinned map link are in your confirmation email.",
      },
      {
        title: "Door code",
        body:
          "A four-digit code is sent by SMS at 09:00 on Aug " +
          DAYS[s.ci] +
          " and works until check-out.",
      },
      {
        title: "Your guest manager",
        body: "Claudine, reachable on +250 788 000 240 and WhatsApp, 24 hours a day.",
      },
      {
        title: "On arrival",
        body: "Coffee, water and fresh linen are already in the home. Housekeeping comes daily at 10:00.",
      },
    ],
    viewBooking: () => {
      patch({
        booking: false,
        screen: "dashboard",
        dash: "Upcoming bookings",
      });
      scrollTop();
    },
    openArrival: () => patch({ booking: true, step: 5 }),
    trip: s.trip ?? {
      title: sel.title,
      img: sel.img,
      dates: tripDates,
      guests: s.guests,
      total: fmt(total),
      ref: "ING-" + (4200 + sel.id),
      extras: "None",
    },
    hasTrip: !!s.trip,
    noTrip: !s.trip,

    // ---- footer -----------------------------------------------------------
    socials: [{ label: "IG" }, { label: "X" }, { label: "in" }, { label: "YT" }],
    footerCols: (
      [
        {
          title: "Our homes",
          items: [
            ["Alita Apartments", "homes"],
            ["Artha Apartments", "homes"],
            ["All apartments", "homes"],
            ["Business travel", "homes"],
          ],
        },
        {
          title: "Destinations",
          items: [
            ["Kicukiro", "destinations"],
            ["Nyarugenge", "destinations"],
            ["Kigali city guide", "destinations"],
          ],
        },
        {
          title: "Company",
          items: [
            ["About us", "about"],
            ["Our standards", "about"],
            ["Sustainability", "about"],
            ["Careers", "about"],
          ],
        },
        {
          title: "Support",
          items: [
            ["Contact us", "contact"],
            ["FAQs", "home"],
            ["Cancellation policy", "contact"],
            ["My bookings", "dashboard"],
          ],
        },
      ] as { title: string; items: [string, Screen][] }[]
    ).map((c) => ({
      title: c.title,
      items: c.items.map(([label, key]) => ({ label, go: nav(key) })),
    })),
  };
}
