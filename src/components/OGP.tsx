import Head from "next/head";
import React from "react";

type OGPProps = {
  title: string;
  description: string;
  imgUrl?: string;
};

export const OGP = ({
  title,
  description,
  imgUrl = "https://beta.berally.io/thumbnail.png",
}: OGPProps) => {
  return (
    <Head>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imgUrl} />
      <meta name="twitter:creator" content="@berally_io" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={title} />
      <meta property="og:image" content={imgUrl} />
    </Head>
  );
};
