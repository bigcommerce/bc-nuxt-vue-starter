export const getBrowserLocales = (options = { languageCodeOnly: true }) => {
  const defaultOptions = {
    languageCodeOnly: false
  };

  const opt = {
    ...defaultOptions,
    ...options
  };

  if (typeof window === 'undefined') {
    return undefined;
  }

  const browserLocales =
    navigator.languages === undefined
      ? [navigator.language]
      : navigator.languages;

  if (!browserLocales) {
    return undefined;
  }

  return browserLocales.map((locale) => {
    const trimmedLocale = locale.trim();

    return opt.languageCodeOnly ? trimmedLocale.split(/-|_/)[0] : trimmedLocale;
  });
};
export default require('./sample_data.json');
