// Shared motion presets for the front page sections.
// Keep keys as `hidden` / `show` so nested variants propagate cleanly
// (TimelineItem already follows this naming).

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

export const viewportOnce = { once: true, amount: 0.2 };
