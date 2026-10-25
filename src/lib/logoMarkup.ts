import { iconPaths, iconViewBox } from '@/components/site/logoPaths';

/** The Maikäfer icon as a data URL, for generated images. */
export function iconDataUrl(ink: string, wing: string) {
  const paths = iconPaths
    .map(
      (path) =>
        `<path fill="${path.role === 'wing' ? wing : ink}"${path.evenOdd ? ' fill-rule="evenodd"' : ''} d="${path.d}"/>`
    )
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${iconViewBox}">${paths}</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}
