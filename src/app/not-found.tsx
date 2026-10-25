'use client';

import Error from 'next/error';

// Renders for requests that don't match the proxy and therefore don't have
// a locale associated with them.
export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  );
}
