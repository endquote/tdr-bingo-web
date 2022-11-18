import Head from "next/head";

export const SiteHead = () => {
  return (
    <Head>
      <title>TDRBingo® community site</title>
      <meta name="title" property="og:title" content="TDRBingo® data"></meta>
      <meta
        name="description"
        property="og:description"
        content="a visualization of the TDRBingo® NFT collection"
      />
      <meta name="image" property="og:image" content="/favicon/og.png" />
      <meta name="twitter:image" content="/favicon/og.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@TDRBingo" />
      <meta name="twitter:title" content="TDRBingo® data" />
      <meta
        name="twitter:description"
        content="a visualization of the TDRBingo® NFT collection"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      ></link>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      ></link>
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      ></link>
      <link rel="manifest" href="/favicon/site.webmanifest"></link>
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#f400d4"
      ></link>
      <link rel="shortcut icon" href="/favicon/favicon.ico"></link>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
    </Head>
  );
};
