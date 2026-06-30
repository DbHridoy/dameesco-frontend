export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-subtle)] bg-[var(--color-background)]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-[12px] text-[var(--color-text-tertiary)]">
            © 2026 SUNAR
          </p>
          <p className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
            v0.1 — Beta
          </p>
        </div>
      </div>
    </footer>
  )
}
