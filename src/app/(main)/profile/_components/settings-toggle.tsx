export function SettingsToggle({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-3xl bg-muted/50 p-3">
      <span className="text-sm">{label}</span>
      <button
        aria-pressed={false}
        className="relative h-6 w-11 rounded-full bg-input transition"
        type="button"
      >
        <span className="absolute left-1 top-1 size-4 rounded-full bg-white transition" />
      </button>
    </div>
  );
}
