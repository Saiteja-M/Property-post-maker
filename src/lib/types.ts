export type PropertyKind =
  | "Apartment"
  | "Villa"
  | "Independent House"
  | "Plot / Land"
  | "Commercial Space"
  | "Farmhouse";

export interface PropertyPost {
  /** e.g. "3 BHK Luxury Apartment" */
  propertyTitle: string;
  propertyType: PropertyKind;
  location: string;
  price: string;
  /** raw multiline text, split into a checklist */
  highlights: string;
}

export interface BrandInfo {
  brandName: string;
  contactName: string;
  phone: string;
  email: string;
}

export const PROPERTY_KINDS: PropertyKind[] = [
  "Apartment",
  "Villa",
  "Independent House",
  "Plot / Land",
  "Commercial Space",
  "Farmhouse",
];

export const SAMPLE_POST: PropertyPost = {
  propertyTitle: "Skyline Residency — 3 BHK Luxury Apartment",
  propertyType: "Apartment",
  location: "Financial District, Gachibowli, Hyderabad",
  price: "1.85 Cr",
  highlights:
    "1,850 sq.ft. carpet area\nEast-facing corner unit, flood-lit interiors\nModular kitchen with premium fittings\nClubhouse, infinity pool & gym access\nGated community with 24x7 security\nReady to move · OC & RERA approved",
};

export const BRAND: BrandInfo = {
  brandName: "Property Post Maker",
  contactName: "Saiteja Mathamala",
  // NOTE: placeholder contact details — replace with the real ones
  // in src/lib/types.ts before publishing.
  phone: "+91 90000 00000",
  email: "saiteja.mathamala@propertypostmaker.com",
};
