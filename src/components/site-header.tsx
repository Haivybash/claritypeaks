import Image from "next/image";

/**
 * Brand-only header. No navigation, no CTA.
 * Centered wordmark — larger per spec.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-cream/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-5 py-5 sm:px-8 sm:py-6">
        <a
          href="#top"
          className="flex items-center gap-3"
          aria-label="Clarity Peaks Social — home"
        >
          <Image
            src="/logo.png"
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 rounded-xl"
            priority
          />
          <span className="font-serif text-2xl font-medium tracking-tight text-forest sm:text-3xl">
            Clarity Peaks Social
          </span>
        </a>
      </div>
    </header>
  );
}
