import { forwardRef } from "react";
import { BrandInfo, PropertyPost } from "@/lib/types";
import { formatPrice, highlightList } from "@/lib/validation";
import { BuildingMark, CheckIcon, MailIcon, PhoneIcon, PinIcon } from "./icons";

interface Props {
  post: PropertyPost;
  brand: BrandInfo;
}

/**
 * This is the exact node that gets rasterised into the downloadable PNG,
 * so every visual detail lives here — no external images, fully
 * self-contained markup + inline SVG.
 */
const PropertyPostCard = forwardRef<HTMLDivElement, Props>(function PropertyPostCard(
  { post, brand },
  ref
) {
  const highlights = highlightList(post.highlights);
  const price = formatPrice(post.price);
  const title = post.propertyTitle.trim() || "Your Property Name Goes Here";
  const location = post.location.trim() || "Add a location";

  return (
    <div
      ref={ref}
      className="relative flex aspect-[4/5] w-full flex-col overflow-hidden rounded-[28px] border border-brass/30 bg-paper text-charcoal shadow-card"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* inner hairline frame — the "printed flyer" signature */}
      <div className="pointer-events-none absolute inset-[10px] z-20 rounded-[20px] border border-brass/45" />

      {/* ---------- brand bar ---------- */}
      <div className="relative z-10 flex items-center justify-between px-7 pt-6 pb-4">
        <div className="flex items-center gap-2.5">
          <BuildingMark className="h-8 w-8 text-emerald-soft" />
          <div className="leading-tight">
            <p
              className="text-[13px] font-semibold tracking-tight text-charcoal"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {brand.brandName}
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ash-dark">
              Verified Listing
            </p>
          </div>
        </div>
        <span className="rounded-full bg-emerald px-3 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-brass-soft">
          For Sale
        </span>
      </div>

      {/* ---------- hero / headline band ---------- */}
      <div className="blueprint-grid relative z-10 mx-4 flex flex-1 flex-col justify-end overflow-hidden rounded-[18px] bg-emerald px-6 pb-8 pt-10">
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brass/10 blur-2xl"
          aria-hidden
        />
        <span className="mb-3 inline-flex w-fit rounded-full border border-brass-soft/40 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-brass-soft">
          {post.propertyType}
        </span>
        <h1
          className="text-[26px] font-medium leading-[1.15] text-paper sm:text-[28px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h1>
        <div className="mt-3 flex items-center gap-1.5 text-paper/85">
          <PinIcon className="h-4 w-4 shrink-0 text-brass-soft" />
          <p className="text-[13px] leading-snug">{location}</p>
        </div>

        {/* seal / signature badge */}
        <div className="absolute -bottom-8 right-5 flex h-20 w-20 items-center justify-center rounded-full border-2 border-brass bg-emerald shadow-[0_0_0_4px_rgba(247,243,234,0.9)]">
          <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full border border-brass-soft/50 text-center">
            <span
              className="text-[10px] font-semibold uppercase leading-tight tracking-wide text-brass-soft"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Prime
              <br />
              Deal
            </span>
          </div>
        </div>
      </div>

      {/* ---------- price + highlights ---------- */}
      <div className="relative z-10 px-7 pb-5 pt-9">
        <div className="flex items-baseline justify-between border-b border-paper-dim pb-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ash-dark">
              Price
            </p>
            <p
              className="text-[30px] font-semibold leading-tight text-emerald"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {price || "—"}
            </p>
          </div>
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ash-dark">
            All-inclusive
          </p>
        </div>

        <p className="mb-2.5 mt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-ash-dark">
          Key Highlights
        </p>
        <ul className="grid grid-cols-1 gap-2">
          {highlights.length > 0 ? (
            highlights.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-[13px] leading-snug text-charcoal/90">
                <CheckIcon className="mt-[1px] h-4 w-4 shrink-0 text-emerald-soft" />
                <span>{item}</span>
              </li>
            ))
          ) : (
            <li className="text-[13px] italic text-ash-dark">
              Add highlights to showcase this property…
            </li>
          )}
        </ul>
      </div>

      {/* ---------- contact footer ---------- */}
      <div className="relative z-10 mt-auto flex items-center justify-between gap-3 border-t border-paper-dim bg-paper-dim/50 px-7 py-4">
        <div>
          <p className="text-[13px] font-semibold text-charcoal">{brand.contactName}</p>
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ash-dark">
            Listing Agent
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 text-[11px] text-charcoal/80">
          <span className="flex items-center gap-1.5">
            {brand.phone}
            <PhoneIcon className="h-3.5 w-3.5 text-emerald-soft" />
          </span>
          <span className="flex items-center gap-1.5">
            {brand.email}
            <MailIcon className="h-3.5 w-3.5 text-emerald-soft" />
          </span>
        </div>
      </div>
    </div>
  );
});

export default PropertyPostCard;
