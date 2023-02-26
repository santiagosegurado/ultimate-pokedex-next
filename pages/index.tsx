import { NextPage, GetStaticProps } from "next";
import { Layout } from "../components/layouts";
import pokeApi from "../apis/pokeApi";
import { PokemonList, SmallPokemons } from "../interfaces";
import { Grid  } from "@nextui-org/react";
import { CardPokemon } from "../components/pokemons/CardPokemon";

interface Props {
  pokemons: SmallPokemons[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Pokemon List">
      <>
        <Grid.Container gap={2}>
          {pokemons.map(({ id, img, name, types }) => (
            <CardPokemon
              id={id}
              img={img}
              name={name}
              types={types}
              key={name}
            />
          ))}
        </Grid.Container>
      </>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonList>("/pokemon?limit=151");

  // const pokemons: SmallPokemons[] = data.results.map((p, i) => ({
  //   name: p.name,
  //   id: i + 1,
  //   url: p.url,
  //   img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${
  //     i + 1
  //   }.png`,
  // }));

  const pokemons = data.results.map(async (p) => {
    const resp = await fetch(p.url);
    const data = await resp.json();

    return {
      id: data.id,
      url: p.url,
      img: data.sprites.other.home.front_default,
      name: data.name,
      types: data.types,
    };
  });

  return {
    props: {
      pokemons: await Promise.all(pokemons).then((p) => {
        return p;
      }),
    },
  };
};

export default HomePage;
