/**
 * Minimal footer. No navigation.
 * Legal links only — intentionally low-contrast so they don't compete
 * with the primary conversion zone.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-forest/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-forest/60 sm:flex-row sm:px-8">
        <p>© {year} Clarity Peaks Social</p>
        <nav aria-label="Legal" className="flex items-center gap-5">
          <a href="#" className="transition-colors hover:text-forest/80">
            Privacy
          </a>
          <a href="#" className="transition-colors hover:text-forest/80">
            Terms
          </a>
        </nav>
      </div>
    </footer>
  );
}
