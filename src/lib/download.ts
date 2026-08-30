import { toPng } from "html-to-image";

/**
 * Renders the given DOM node to a high-resolution PNG and triggers a
 * browser download. Runs entirely client-side — no external service
 * or API call is involved.
 */
export async function downloadNodeAsPng(node: HTMLElement, fileName: string) {
  // Render a couple of times: web fonts / layout can shift on the very
  // first paint right after fonts finish loading, so we warm it up once
  // before producing the final capture.
  const options = {
    pixelRatio: 3,
    cacheBust: true,
    backgroundColor: undefined,
    style: {
      // avoid any transform/scale inherited from responsive sizing
      transform: "none",
    },
  } as const;

  await toPng(node, options);
  const dataUrl = await toPng(node, options);

  const link = document.createElement("a");
  link.download = fileName;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function slugify(value: string, fallback: string) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  return slug.length > 0 ? slug : fallback;
}
