import { FC, PropsWithChildren } from "react";
import Head from "next/head";
import { Navbar } from "../ui";

interface Props {
  children: JSX.Element;
  title?: string;
  desc?: string;
  favicon?: string;
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin

export const Layout: FC<Props> = ({ children, title, desc, favicon }) => {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href={favicon}/>
        <title>{title || "Pokemon App"}</title>
        <meta name="author" content="Santiago Segurado" />
        <meta name="description" content={`Information of pokemon: ${title}`} />
        <meta name="keywords" content={`pokemon, ${title}, pokedex`} />
        <meta
          property="og:title"
          content={`Content of pokemon: ${title}`}
        />
        <meta
          property="og:description"
          content={desc}
        />
        <meta
          property="og:image"
          content={`${origin}/banner.png`}
        />
      </Head>
      {/* Navbar */}
      <Navbar />
      <main
        style={{
          padding: "0px 20px",
        }}
      >
        {children}
      </main>
    </>
  );
};
