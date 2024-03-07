import { Metadata } from 'next';
import { Html, Head, Main, NextScript } from 'next/document'

export const metadata: Metadata = {
  title: "PWA with Next 13",
  description: "PWA application with Next 13",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs13", "next13", "pwa", "next-pwa"],
  themeColor: "#fff",
  authors: [
    { name: "Rajesh Prajapati" },
    {
      name: "Rajesh Prajapati",
      url: "https://www.linkedin.com/in/raazeshp96/",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
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
