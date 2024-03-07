import { Metadata } from 'next';
import { Html, Head, Main, NextScript } from 'next/document'

export const metadata: Metadata = {
  title: "Chorer",
  description: "Chorer",
  generator: "Next.js",
  manifest: "/manifest.json",
  themeColor: "#fff",
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
};

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
