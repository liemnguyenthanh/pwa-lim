import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Lim</title>
        <meta name="description" content="Best PWA app in the world!" />

        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="mask-icon" href="/icons/mask-icon.svg" color="#FFFFFF" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/touch-icon-ipad.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/touch-icon-iphone-retina.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/icons/touch-icon-ipad-retina.png"
        />
        <link rel="manifest" href="/manifest.json" />

        {/* add the following only if you want to add a startup image for Apple devices. */}
        <link
          rel="apple-touch-startup-image"
          href="/icon-192x192.png"
          sizes="2048x2732"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icon-192x192.png"
          sizes="1668x2224"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icon-192x192.png"
          sizes="1536x2048"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icon-192x192.png"
          sizes="1125x2436"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icon-192x192.png"
          sizes="1242x2208"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icon-192x192.png"
          sizes="750x1334"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icon-192x192.png"
          sizes="640x1136"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
