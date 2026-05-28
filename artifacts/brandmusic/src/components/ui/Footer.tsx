export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-subtle)] bg-[var(--color-background)]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center gap-2">
          <span className="font-display text-[15px] font-semibold tracking-tight text-[var(--color-text-primary)]">
            SONAR
          </span>
          <span className="text-[13px] text-[var(--color-text-tertiary)]">
            AI-powered music licensing.
          </span>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--color-border-subtle)] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-[12px] text-[var(--color-text-tertiary)]">
            © 2026 SONAR
          </p>
          <p className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
            v0.1 — Beta
          </p>
        </div>
      </div>
    </footer>
  )
}
