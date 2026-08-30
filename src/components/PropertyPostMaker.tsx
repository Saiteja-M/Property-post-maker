"use client";

import { useMemo, useRef, useState } from "react";
import { BRAND, PropertyPost, SAMPLE_POST } from "@/lib/types";
import { validatePost, isValid, FormErrors } from "@/lib/validation";
import { downloadNodeAsPng, slugify } from "@/lib/download";
import PostForm from "./PostForm";
import PropertyPostCard from "./PropertyPostCard";
import { BuildingMark, DownloadIcon, ResetIcon } from "./icons";

type Status =
  | { kind: "idle" }
  | { kind: "working" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export default function PropertyPostMaker() {
  const [post, setPost] = useState<PropertyPost>(SAMPLE_POST);
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const cardRef = useRef<HTMLDivElement>(null);

  const errors: FormErrors = useMemo(() => validatePost(post), [post]);
  const valid = isValid(errors);

  function handleChange<K extends keyof PropertyPost>(key: K, value: PropertyPost[K]) {
    setPost((prev) => ({ ...prev, [key]: value }));
    if (status.kind !== "idle") setStatus({ kind: "idle" });
  }

  function handleReset() {
    setPost(SAMPLE_POST);
    setTouched(false);
    setStatus({ kind: "idle" });
  }

  async function handleDownload() {
    setTouched(true);
    if (!valid) {
      setStatus({ kind: "error", message: "Fill in the required fields before downloading." });
      return;
    }
    if (!cardRef.current) return;

    setStatus({ kind: "working" });
    try {
      const fileName = `${slugify(post.propertyTitle, "property-post")}.png`;
      await downloadNodeAsPng(cardRef.current, fileName);
      setStatus({ kind: "success" });
    } catch (err) {
      console.error(err);
      setStatus({
        kind: "error",
        message: "Couldn't generate the image. Please try again.",
      });
    }
  }

  return (
    <div className="bg-grain min-h-screen">
      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col px-5 pb-16 pt-8 sm:px-8 lg:px-12">
        {/* ---------- top bar ---------- */}
        <header className="mb-8 flex flex-col gap-5 border-b border-panel-line pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <BuildingMark className="h-9 w-9 text-brass" />
            <div>
              <h1
                className="text-[19px] font-semibold leading-tight text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Property Post Maker
              </h1>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ash">
                Listing creatives in seconds
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-full border border-panel-line bg-panel px-4 py-2.5 text-[13px] font-medium text-white/85 transition hover:border-ash-dark hover:text-white"
            >
              <ResetIcon className="h-4 w-4" />
              Reset
            </button>
            <button
              type="button"
              onClick={handleDownload}
              disabled={status.kind === "working"}
              className="inline-flex items-center gap-2 rounded-full bg-brass px-5 py-2.5 text-[13px] font-semibold text-ink shadow-[0_8px_20px_-8px_rgba(193,154,73,0.7)] transition hover:bg-brass-soft disabled:cursor-wait disabled:opacity-70"
            >
              <DownloadIcon className="h-4 w-4" />
              {status.kind === "working" ? "Preparing…" : "Download Post"}
            </button>
          </div>
        </header>

        {/* ---------- status banner ---------- */}
        {status.kind === "error" && (
          <div className="mb-6 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-[13px] font-medium text-rose-300">
            {status.message}
          </div>
        )}
        {status.kind === "success" && (
          <div className="mb-6 rounded-xl border border-emerald-soft/50 bg-emerald-soft/10 px-4 py-3 text-[13px] font-medium text-emerald-soft">
            Downloaded — check your device&apos;s downloads folder.
          </div>
        )}

        {/* ---------- two-column workspace ---------- */}
        <main className="grid grid-cols-1 gap-8 lg:grid-cols-[420px_1fr] lg:items-start lg:gap-10">
          <section aria-labelledby="form-heading" className="order-2 lg:order-1">
            <h2 id="form-heading" className="sr-only">
              Property details form
            </h2>
            <PostForm post={post} errors={errors} touched={touched} onChange={handleChange} />

            <p className="mt-5 px-1 text-[12px] leading-relaxed text-ash">
              The brand mark, your name, and contact details below are added to
              every post automatically — no need to re-enter them.
            </p>
          </section>

          <section
            aria-labelledby="preview-heading"
            className="order-1 flex flex-col items-center lg:order-2 lg:sticky lg:top-8"
          >
            <h2 id="preview-heading" className="sr-only">
              Live property post preview
            </h2>
            <div className="w-full max-w-[420px]">
              <PropertyPostCard ref={cardRef} post={post} brand={BRAND} />
            </div>
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-ash">
              Live preview · updates as you type · 1080 × 1350 export
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
