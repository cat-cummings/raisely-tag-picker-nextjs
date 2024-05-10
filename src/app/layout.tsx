import './globals.css'

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>This is a coding assessment for a frontend tagpicker</title>
      <body>{children}</body>
    </html>
  );
}
