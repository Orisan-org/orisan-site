/**
 * The Orisan mark: a ring with a notch cut out of the upper right. Reproduced
 * from the reference. The mask id is a prop because the mark appears twice on
 * the page and duplicate SVG ids make the second instance render from the first
 * one's mask.
 */
export function OrisanMark({ id, size = 18 }: { id: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" fill="none" aria-hidden="true">
      <defs>
        <mask id={id}>
          <rect width="512" height="512" fill="black" />
          <circle cx="256" cy="256" r="176" fill="white" />
          <circle cx="256" cy="256" r="106" fill="black" />
          <path d="M338 76 L438 125 L352 215 L306 174 Z" fill="black" />
        </mask>
      </defs>
      <circle cx="256" cy="256" r="176" className="fill-paper" mask={`url(#${id})`} />
    </svg>
  );
}
