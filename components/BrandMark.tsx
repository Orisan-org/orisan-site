import Link from "next/link";
import Image from "next/image";

type BrandMarkProps = {
  tone?: "dark" | "light";
  size?: "sm" | "md";
};

export function BrandMark({ tone = "dark", size = "md" }: BrandMarkProps) {
  const dimensions = size === "sm" ? "h-9 w-[144px]" : "h-10 w-[160px]";
  const src = tone === "light" ? "/logo-lockup-orisan.svg" : "/logo-lockup-orisan-dark.svg";

  return (
    <Link
      href="/"
      className="inline-flex items-center"
      aria-label="Orisan home"
    >
      <Image
        src={src}
        alt="Orisan"
        width={size === "sm" ? 144 : 160}
        height={size === "sm" ? 36 : 40}
        priority
        unoptimized
        className={`${dimensions} object-contain`}
      />
    </Link>
  );
}
