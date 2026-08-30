# Property Post Maker

Turn four property details into a polished, share-ready listing creative —
instantly, in the browser, with no backend and no external AI API.

Built for **Saiteja Mathamala**.

---

## 1. What it does

1. You fill in **Property & Type**, **Location**, **Price**, and **Highlights**.
2. The right-hand panel renders a live, professionally styled property post
   as you type.
3. The brand mark, "Verified Listing" badge, agent name, and contact details
   are added automatically — you never re-type them.
4. **Download Post** rasterises that exact preview into a high-resolution
   PNG (3x pixel density, ~1080×1350 export) and saves it to your device,
   ready to post on Instagram/Facebook/WhatsApp.
5. **Reset** restores the bundled sample listing.

## 2. Tech stack

| Layer       | Choice                                   |
|-------------|-------------------------------------------|
| Framework   | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling     | Tailwind CSS v4 (CSS-first theme, no config file needed) |
| Image export| [`html-to-image`](https://github.com/bubkoo/html-to-image) — client-side DOM → PNG, no server round trip |
| Fonts       | System font stacks (serif display / sans body / mono labels) — no external font requests, so it also builds correctly offline |
| Backend     | **None.** This is a static, fully client-side app. |

## 3. "Backend" — how it actually works

There is intentionally no server/API for this tool — everything runs in the
visitor's browser:

- **State**: `PropertyPostMaker.tsx` holds the form state in React
  `useState` (`post`), derives validation errors with `useMemo`, and passes
  both down to the form and the preview. Every keystroke re-renders the
  preview — that's the "live preview" behaviour.
- **Validation**: `src/lib/validation.ts` checks that Property title,
  Location, Price, and at least one Highlight line are non-empty. Errors
  only display after the user's first submit/download attempt (`touched`
  state) so the form doesn't yell at someone who just opened the page.
- **Auto-added fields**: brand name, agent name, phone, and email live in
  `src/lib/types.ts` (`BRAND` constant) and are injected into the card by
  `PropertyPostCard.tsx` — they are never part of the editable form.
- **Image export**: `src/lib/download.ts` takes a `ref` to the actual
  preview DOM node and calls `html-to-image`'s `toPng()`, which serialises
  that node (including all Tailwind-computed styles) into a PNG data URL
  at 3x resolution, then triggers a normal `<a download>` click. No image
  is ever uploaded anywhere.
- **Routing**: a single route (`/`) — `src/app/page.tsx` — since the whole
  product is one screen.

Because there's no database or API route, there's nothing to configure,
no environment variables to set, and nothing that can go down except the
static hosting itself.

## 4. Project structure

```
src/
  app/
    layout.tsx        Root layout + <head> metadata
    page.tsx           Renders <PropertyPostMaker />
    globals.css         Design tokens (colors, fonts, textures) via @theme
  components/
    PropertyPostMaker.tsx   Top-level state, layout, Download/Reset actions
    PostForm.tsx             The 4 input fields + validation display
    PropertyPostCard.tsx     The exportable listing creative
    Field.tsx                 Labeled field wrapper w/ error message
    icons.tsx                 Small inline SVG icon set (no icon package)
  lib/
    types.ts             PropertyPost / BrandInfo types + sample data
    validation.ts          Required-field checks + price/highlight helpers
    download.ts             DOM → PNG export helper
```

## 5. Run it locally

Requires Node.js 18.18+ (Node 20 LTS recommended).

```bash
npm install
npm run dev
```

Open http://localhost:3000. Edit any field — the preview updates instantly.

Other scripts:

```bash
npm run build   # production build (also type-checks + lints via TS/ESLint)
npm run start   # serve the production build locally
npm run lint    # ESLint only
```

## 6. Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to vercel.com → **Add New Project** → import the repo.
3. Framework preset is auto-detected as **Next.js** — no config needed.
4. Click **Deploy**. No environment variables are required.

(Or run `npx vercel` from this folder if you use the Vercel CLI.)

## 7. Customize your contact details

Open `src/lib/types.ts` and edit the `BRAND` object:

```ts
export const BRAND: BrandInfo = {
  brandName: "Property Post Maker",
  contactName: "Saiteja Mathamala",
  phone: "+91 90000 00000",   // <-- put your real number here
  email: "saiteja.mathamala@propertypostmaker.com", // <-- your real email
};
```

These placeholders are intentionally obvious — replace them before sharing
any post publicly.

## 8. Manual test pass performed before delivery

- ✅ `npm run build` — compiles clean, zero TypeScript errors.
- ✅ `npm run lint` — zero ESLint warnings/errors.
- ✅ Server-rendered HTML verified to contain: property title, type,
  location, formatted price (₹ auto-prefixed), every highlight line, and
  the auto-added brand/agent/contact footer.
- ✅ Validation logic reviewed for all 4 required fields (empty submit is
  blocked, inline error copy shown per field).
- ✅ Reset restores the bundled sample listing exactly.
- ✅ Responsive layout: two-column grid (`420px` form + fluid preview) on
  `lg:` breakpoints and up; single stacked column (preview first, form
  second) below that, so mobile visitors see the result before the inputs.
- ⚠️ The PNG download itself (`html-to-image` → canvas → `<a download>`)
  uses standard browser Canvas APIs and could not be executed inside this
  sandboxed build environment (no GUI browser available here). It's a
  well-established, widely used pattern — please do a quick click-test
  after `npm run dev` on your machine to confirm the exact PNG output
  looks right on your target browser before using it for real listings.
"# Property-post-maker" 
