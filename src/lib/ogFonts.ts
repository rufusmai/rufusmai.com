type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 800;
  style: 'normal' | 'italic';
};

/** Fetches a Google Font as TTF, subset to the given text. */
async function loadGoogleFont(family: string, text: string) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`
  ).then((response) => response.text());
  const url = /src: url\((.+?)\) format\('(opentype|truetype)'\)/.exec(
    css
  )?.[1];
  if (!url) throw new Error(`No font file found for ${family}`);
  return fetch(url).then((response) => response.arrayBuffer());
}

/**
 * The site's fonts for generated images, each subset to the text it renders.
 * Falls back to the default font if Google Fonts can't be reached, so the
 * build never fails because of it.
 */
export async function loadOgFonts(text: {
  body: string;
  heading: string;
  serif: string;
}): Promise<OgFont[]> {
  try {
    const [instrumentSans, bricolage, instrumentSerif] = await Promise.all([
      loadGoogleFont('Instrument+Sans:wght@400', text.body),
      loadGoogleFont('Bricolage+Grotesque:opsz,wght@96,800', text.heading),
      loadGoogleFont('Instrument+Serif:ital@1', text.serif),
    ]);
    return [
      // The first font is the default for text without a font family
      {
        name: 'Instrument Sans',
        data: instrumentSans,
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Bricolage Grotesque',
        data: bricolage,
        weight: 800,
        style: 'normal',
      },
      {
        name: 'Instrument Serif',
        data: instrumentSerif,
        weight: 400,
        style: 'italic',
      },
    ];
  } catch (error) {
    console.warn('OG image: headline fonts unavailable, using default', error);
    return [];
  }
}
