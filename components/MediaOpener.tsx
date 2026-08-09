"use client";

import { useEffect, useRef } from "react";
import manifest from "@/public/media/media-manifest.json";

type MediaEntry = {
  slug: string;
  webm: string;
  mp4: string;
  poster: string;
  posterFallback: string;
  width: number;
  height: number;
  alt: string;
};

/**
 * A section opener: the clip that introduces an entry, never a background
 * behind body copy.
 *
 * Alt text is read from media-manifest.json verbatim and is never written
 * here. The manifest is imported rather than copied so there is exactly one
 * place the text can come from.
 *
 * The poster carries the section on its own: it is what shows before play,
 * under reduced motion, and when the video never arrives.
 */
export function MediaOpener({ slug }: { slug: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Reduced motion is honoured absolutely: the element is hidden in CSS, is
    // never asked to play, and — because the sources below are only attached
    // here — never downloads a byte. The poster is the whole experience.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            video.pause();
            continue;
          }
          // preload="none" only means anything if the sources are absent until
          // the clip is actually wanted; `autoplay` otherwise fetches on load.
          if (!video.dataset.sourcesAttached) {
            for (const source of Array.from(video.querySelectorAll("source"))) {
              const src = source.dataset.src;
              if (src) source.src = src;
            }
            video.dataset.sourcesAttached = "true";
            video.load();
          }
          void video.play().catch(() => {
            /* autoplay refused; the poster stands in */
          });
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const entry = (manifest as MediaEntry[]).find((m) => m.slug === slug);
  if (!entry) {
    // Fails the build rather than shipping a silently empty opener.
    throw new Error(`MediaOpener: no manifest entry for "${slug}"`);
  }

  return (
    <figure className="mb-5">
      <video
        ref={ref}
        className="w-full motion-reduce:hidden"
        width={entry.width}
        height={entry.height}
        poster={entry.poster}
        aria-label={entry.alt}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
      >
        {/* Attached by the observer above, never at load. */}
        <source data-src={entry.webm} type="video/webm" />
        <source data-src={entry.mp4} type="video/mp4" />
      </video>
      {/* Shown only under reduced motion, where the video above is hidden. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- next/image would
          re-encode through the optimiser; public/media/ is owned by
          scripts/prep-media.sh and must not be re-encoded. */}
      <img
        className="hidden w-full motion-reduce:block"
        src={entry.poster}
        width={entry.width}
        height={entry.height}
        alt={entry.alt}
      />
    </figure>
  );
}
