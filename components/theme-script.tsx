const script = `
(function() {
  try {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = storedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;

    const storedAyahScale = localStorage.getItem('ayahTextScale');
    if (storedAyahScale) {
      const value = parseFloat(storedAyahScale);
      if (!Number.isNaN(value)) {
        const clamped = Math.min(1.5, Math.max(0.85, value));
        document.documentElement.style.setProperty(
          '--ayah-scale',
          clamped.toFixed(2)
        );
      }
    }
  } catch (e) {
    document.documentElement.dataset.theme = 'light';
  }
})();
`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
