import { FC, PropsWithChildren } from "react";
import Head from "next/head";
import { Navbar } from '../ui';

interface Props {
  children: JSX.Element;
  title?: string;
}

export const Layout: FC<Props> = ({ children, title}) => {
  return (
    <>
      <Head>
        <title>{title || "Pokemon App"}</title>
        <meta name="author" content="Santiago Segurado" />
        <meta name="description" content="Information of pokemon: XXXX" />
        <meta name="keywords" content="pokemon, XXXX, pokedex" />
      </Head>
      {/* Navbar */}
      <Navbar/>
      <main style={{
        padding: '0px 20px'
      }}>
        {children}
      </main>
    </>
  );
};
