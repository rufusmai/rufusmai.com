// The html and body live in `[locale]/layout.tsx`; this root layout only
// passes through so every page gets its locale from the URL.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
