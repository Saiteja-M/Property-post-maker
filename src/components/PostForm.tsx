import { PROPERTY_KINDS, PropertyPost } from "@/lib/types";
import { FormErrors } from "@/lib/validation";
import Field from "./Field";

interface Props {
  post: PropertyPost;
  errors: FormErrors;
  touched: boolean;
  onChange: <K extends keyof PropertyPost>(key: K, value: PropertyPost[K]) => void;
}

const inputClass =
  "w-full rounded-xl border bg-ink-soft px-3.5 py-2.5 text-[14px] text-white placeholder:text-ash/70 outline-none transition focus:ring-2 focus:ring-brass/40";

function borderClass(hasError: boolean) {
  return hasError ? "border-rose-500/70 focus:border-rose-400" : "border-panel-line focus:border-brass/60";
}

export default function PostForm({ post, errors, touched, onChange }: Props) {
  const show = (key: keyof FormErrors) => (touched ? errors[key] : undefined);

  return (
    <div className="space-y-5">
      <fieldset className="space-y-4 rounded-2xl border border-panel-line bg-panel/60 p-5">
        <legend className="px-1 font-mono text-[10px] uppercase tracking-[0.18em] text-brass-soft">
          01 · Property &amp; Type
        </legend>

        <Field label="Property name / title" htmlFor="propertyTitle" required error={show("propertyTitle")}>
          <input
            id="propertyTitle"
            type="text"
            value={post.propertyTitle}
            onChange={(e) => onChange("propertyTitle", e.target.value)}
            placeholder="e.g. Skyline Residency — 3 BHK Apartment"
            className={`${inputClass} ${borderClass(!!show("propertyTitle"))}`}
            maxLength={70}
          />
        </Field>

        <Field label="Property type" htmlFor="propertyType">
          <select
            id="propertyType"
            value={post.propertyType}
            onChange={(e) => onChange("propertyType", e.target.value as PropertyPost["propertyType"])}
            className={`${inputClass} ${borderClass(false)} appearance-none`}
          >
            {PROPERTY_KINDS.map((kind) => (
              <option key={kind} value={kind} className="bg-ink-soft">
                {kind}
              </option>
            ))}
          </select>
        </Field>
      </fieldset>

      <fieldset className="space-y-4 rounded-2xl border border-panel-line bg-panel/60 p-5">
        <legend className="px-1 font-mono text-[10px] uppercase tracking-[0.18em] text-brass-soft">
          02 · Location
        </legend>
        <Field label="Location" htmlFor="location" required error={show("location")}>
          <input
            id="location"
            type="text"
            value={post.location}
            onChange={(e) => onChange("location", e.target.value)}
            placeholder="e.g. Financial District, Gachibowli, Hyderabad"
            className={`${inputClass} ${borderClass(!!show("location"))}`}
            maxLength={90}
          />
        </Field>
      </fieldset>

      <fieldset className="space-y-4 rounded-2xl border border-panel-line bg-panel/60 p-5">
        <legend className="px-1 font-mono text-[10px] uppercase tracking-[0.18em] text-brass-soft">
          03 · Price
        </legend>
        <Field
          label="Price"
          htmlFor="price"
          required
          hint="₹ added automatically"
          error={show("price")}
        >
          <input
            id="price"
            type="text"
            value={post.price}
            onChange={(e) => onChange("price", e.target.value)}
            placeholder="e.g. 1.85 Cr or 45 Lakh"
            className={`${inputClass} ${borderClass(!!show("price"))}`}
            maxLength={30}
          />
        </Field>
      </fieldset>

      <fieldset className="space-y-4 rounded-2xl border border-panel-line bg-panel/60 p-5">
        <legend className="px-1 font-mono text-[10px] uppercase tracking-[0.18em] text-brass-soft">
          04 · Highlights
        </legend>
        <Field
          label="Highlights"
          htmlFor="highlights"
          required
          hint="one per line"
          error={show("highlights")}
        >
          <textarea
            id="highlights"
            value={post.highlights}
            onChange={(e) => onChange("highlights", e.target.value)}
            placeholder={"e.g.\n1,850 sq.ft. carpet area\nClubhouse & pool access\nReady to move"}
            rows={6}
            className={`${inputClass} ${borderClass(!!show("highlights"))} resize-none leading-relaxed`}
          />
        </Field>
      </fieldset>
    </div>
  );
}
