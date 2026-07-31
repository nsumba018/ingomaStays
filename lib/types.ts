export type Currency = "USD" | "RWF";

export type Screen =
  | "home"
  | "homes"
  | "destinations"
  | "experiences"
  | "about"
  | "contact"
  | "saved"
  | "dashboard"
  | "detail";

export type UnitType = "1 bedroom" | "2 bedrooms" | "3 bedrooms";

/** A single apartment within a building. `booked` holds [checkIn, checkOut) day-index ranges. */
export interface Unit {
  n: number;
  type: UnitType;
  price: number;
  sleeps: number;
  booked: [number, number][];
}

/** A unit with occupancy resolved against the currently selected dates. */
export interface ResolvedUnit extends Unit {
  occupied: boolean;
}

export interface GalleryShot {
  src: string;
  alt: string;
}

export interface Review {
  name: string;
  img: string;
  when: string;
  text: string;
}

export interface BedroomTier {
  name: string;
  bed: string;
  img: string;
}

/** One of the two apartment buildings. */
export interface Building {
  id: number;
  title: string;
  location: string;
  collection: string;
  price: number;
  rating: string;
  reviews: number;
  sleeps: number;
  beds: number;
  baths: number;
  cat: string[];
  units: Unit[];
  am: string;
  mx: number;
  my: number;
  dist: string;
  desc: string;
  img: string;
  gallery: GalleryShot[];
  bedrooms: BedroomTier[];
  revs: Review[];
  specs: string;
}

/** A building with per-unit occupancy resolved for the selected dates. */
export interface ResolvedBuilding extends Omit<Building, "units"> {
  units: ResolvedUnit[];
  availCount: number;
}

export interface Trip {
  title: string;
  img: string;
  dates: string;
  guests: number;
  total: string;
  ref: string;
  extras: string;
}

export interface State {
  screen: Screen;
  selId: number;
  cat: string;
  query: string;
  curOverride: Currency | null;
  wish: Record<number, boolean>;
  hoverId: number | null;
  unitSel: Record<number, number>;
  priceCap: number;
  booking: boolean;
  step: number;
  guests: number;
  adults: number;
  kids: number;
  infants: number;
  ci: number;
  co: number;
  trip: Trip | null;
  pay: string;
  extras: Record<string, boolean>;
  faq: number;
  dash: string;
  gallery: boolean;
}
