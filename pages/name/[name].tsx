import { useState } from "react";
import { FC } from "react";

import { GetStaticPaths } from "next";
import { GetStaticProps } from "next";
import Image from "next/image";
import NextLink from "next/link";

import {
  Grid,
  Button,
  Input,
  Card,
  Text,
  Progress,
  Link,
  Container,
} from "@nextui-org/react";

import confetti from "canvas-confetti";

import { Layout } from "../../components/layouts";
import pokeApi from "../../apis/pokeApi";
import { PokemonContent, PokemonSpecie } from "../../interfaces";
import { ImgType } from "../../components/pokemons/ImgType";
import { toggleFavorites, pokemonInStorage } from "../../utils";

interface Props {
  pokemon: PokemonContent;
  specie: PokemonSpecie;
  evolutions: Pokevolution[];
}

interface Pokevolution {
  icons: string;
  name: string;
  id: number;
  types: any;
}

const PokemonByNamePage: FC<Props> = ({ pokemon, specie, evolutions }) => {
  const [isFavorite, setIsFavorite] = useState(pokemonInStorage(pokemon.id));

  const onToggleFavorites = () => {
    toggleFavorites(pokemon.id);
    setIsFavorite(!isFavorite);

    if (isFavorite) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 0,
        y: 0,
      },
    });
  };

  return (
    <Layout
      title={pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}
      desc={specie.flavor_text_entries[0]?.flavor_text || ""}
      favicon={pokemon.sprites.front_default}
    >
      <>
        {/* Search/Back Container  */}
        <Grid.Container css={{ marginTop: "10px" }}>
          <Grid xs={3} lg={3} alignItems="center">
            <NextLink href="/">
              <Link css={{ p: 10 }}>
                <Image
                  src="/arrowVector.svg"
                  alt="arrow"
                  width={25}
                  height={25}
                />
              </Link>
            </NextLink>
          </Grid>
          <Grid xs={9} lg={6} justify={"center"}>
            <Input
              placeholder="Search Pokemon"
              style={{ textAlign: "center", fontSize: "16px" }}
              width="90%"
            />
          </Grid>
        </Grid.Container>
        {/* Img/Name/Desc Container */}
        <Grid.Container gap={2} css={{ marginTop: 10 }}>
          <Grid xs={12} md={6} lg={4}>
            <Card>
              <Card.Header css={{ p: "10px 0px 5px 10px" }}>
                <Button auto light color={"error"} onClick={onToggleFavorites}>
                  {isFavorite ? (
                    <Image
                      src="/heartActiveVector.svg"
                      alt="heart"
                      width={25}
                      height={25}
                    />
                  ) : (
                    <Image
                      src="/heartVector.svg"
                      alt="heart"
                      width={25}
                      height={25}
                    />
                  )}
                </Button>
              </Card.Header>
              <Card.Body css={{ alignItems: "center" }}>
                <Image
                  src={pokemon.sprites.other?.home.front_default || ""}
                  alt={pokemon.name}
                  width={250}
                  height={250}
                />
              </Card.Body>
              <Card.Footer css={{ textAlign: "center" }}>
                <Text h3>
                  {specie.flavor_text_entries[0]?.flavor_text || ""}
                </Text>
              </Card.Footer>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={3} css={{ justifyContent: "center" }}>
            <Grid>
              <Text h1>
                {pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}
              </Text>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 20,
                  padding: "20px 0px",
                }}
              >
                <Text span size={30}>
                  #{pokemon.id < 10 ? "00" : pokemon.id < 100 ? "0" : ""}
                  {pokemon.id}
                </Text>
                <div style={{ display: "flex" }}>
                  <ImgType types={pokemon.types} />
                </div>
              </div>
              <Card>
                <Card.Header css={{ p: "5px 0px 0px 10px" }}>
                  <Text h4>Shiny Version </Text>
                </Card.Header>
                <Card.Divider />
                <Card.Body css={{ display: "flex", flexDirection: "row" }}>
                  <Image
                    src={pokemon.sprites.front_shiny || ""}
                    alt={pokemon.name}
                    width={150}
                    height={150}
                  />
                  <Image
                    src={pokemon.sprites.back_shiny || ""}
                    alt={pokemon.name}
                    width={150}
                    height={150}
                  />
                </Card.Body>
              </Card>
            </Grid>
          </Grid>
          <Grid xs={12} sm={6} md={5}>
            <Container>
              <Grid>
                <Text h4 color="$gray500">
                  Weight
                </Text>
                <Grid
                  css={{
                    border: "2px solid $gray100",
                    padding: "2px 25px",
                    m: 0,
                    borderRadius: 15,
                    textAlign: "center",
                  }}
                >
                  <Text h4>{`${pokemon.weight * 0.1} Kg.`}</Text>
                </Grid>
              </Grid>
              <Grid>
                <Text h4 color="$gray500">
                  Height
                </Text>
                <Grid
                  css={{
                    border: "2px solid $gray100",
                    padding: "2px 25px",
                    m: 0,
                    borderRadius: 15,
                    textAlign: "center",
                  }}
                >
                  <Text h4>{`${pokemon.height * 0.1}`.substring(0, 3)} M.</Text>
                </Grid>
              </Grid>
            </Container>
            <Container>
              <Grid>
                <Text h4 color="$gray500">
                  Category
                </Text>
                <Grid
                  css={{
                    border: "2px solid $gray100",
                    padding: "2px 25px",
                    m: 0,
                    borderRadius: 15,
                    textAlign: "center",
                  }}
                >
                  <Text h4>{specie.genera[4].genus}</Text>
                </Grid>
              </Grid>
              <Grid>
                <Text h4 color="$gray500">
                  Ability
                </Text>
                <Grid
                  css={{
                    border: "2px solid $gray100",
                    padding: "2px 25px",
                    m: 0,
                    borderRadius: 15,
                    textAlign: "center",
                  }}
                >
                  <Text h4 transform="capitalize">
                    {pokemon.abilities[0].ability.name}
                  </Text>
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Grid.Container>
        {/* Stats/Evolution Container */}
        <Grid.Container css={{ mb: 40, justifyContent: "space-around" }}>
          <Grid
            xs={12}
            sm={4}
            md={4}
            css={{
              display: "flex",
              flexDirection: "column",
              p: 0,
            }}
          >
            <h3>Evolution Chain</h3>
            <Card
              css={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 0,
              }}
            >
              {evolutions.map(({ icons, name, id, types }, i) => (
                <Card.Body key={name}>
                  <Grid
                    css={{
                      display: "flex",
                      flexDirection: "row",
                      p: 0,
                      alignItems: "center",
                    }}
                  >
                    <Grid css={{ display: "flex", alignItems: "center" }}>
                      <Image src={icons} alt={name} width={100} height={100} />
                    </Grid>
                    <Grid
                      css={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Text transform="capitalize" h5>
                        {name}
                      </Text>
                      <Text b css={{ color: "$accents7" }}>
                        #{id < 10 ? "00" : id < 100 ? "0" : ""}
                        {id}
                      </Text>
                    </Grid>
                    <Grid css={{ display: "flex", flexDirection: "column" }}>
                      <ImgType types={types} />
                    </Grid>
                  </Grid>
                  {i + 1 < evolutions.length && (
                    <Image
                      src="/downVector.svg"
                      alt="down"
                      width={30}
                      height={30}
                    />
                  )}
                </Card.Body>
              ))}
            </Card>
          </Grid>
          <Grid
            xs={12}
            lg={4}
            css={{
              display: "flex !important",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Grid css={{ p: 5 }}>
              <Text transform="capitalize" h4 color="primary">
                {pokemon.stats[0].stat.name} - {pokemon.stats[0].base_stat}
              </Text>
              <Progress
                value={pokemon.stats[0].base_stat}
                color="primary"
                status={"primary"}
              />
            </Grid>
            <Grid css={{ p: 5 }}>
              <Text transform="capitalize" h4 color="secondary">
                {pokemon.stats[1].stat.name} - {pokemon.stats[1].base_stat}
              </Text>
              <Progress
                value={pokemon.stats[1].base_stat}
                color="secondary"
                status={"secondary"}
              />
            </Grid>
            <Grid css={{ p: 5 }}>
              <Text transform="capitalize" h4 color="success">
                {pokemon.stats[2].stat.name} - {pokemon.stats[2].base_stat}
              </Text>
              <Progress
                value={pokemon.stats[2].base_stat}
                color="success"
                status={"success"}
              />
            </Grid>
            <Grid css={{ p: 5 }}>
              <Text transform="capitalize" h4 color="warning">
                {pokemon.stats[3].stat.name} - {pokemon.stats[3].base_stat}
              </Text>
              <Progress
                value={pokemon.stats[3].base_stat}
                color="warning"
                status={"warning"}
              />
            </Grid>
            <Grid css={{ p: 5 }}>
              <Text transform="capitalize" h4 color="error">
                {pokemon.stats[4].stat.name} - {pokemon.stats[4].base_stat}
              </Text>
              <Progress
                value={pokemon.stats[4].base_stat}
                color="error"
                status={"error"}
              />
            </Grid>
            <Grid css={{ p: 5 }}>
              <Text transform="capitalize" h4>
                {pokemon.stats[5].stat.name} - {pokemon.stats[5].base_stat}
              </Text>
              <Progress value={pokemon.stats[5].base_stat} color="gradient" />
            </Grid>
          </Grid>
        </Grid.Container>
      </>
    </Layout>
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get(`/pokemon?limit=151`);

  return {
    paths: data.results.map(({ name }: any) => ({
      params: {
        name: name,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  const { data } = await pokeApi.get<PokemonContent>(`/pokemon/${name}`);

  const { data: specie } = await pokeApi.get<PokemonSpecie>(
    `/pokemon-species/${name}`
  );

  const { data: evolve_chain } = await pokeApi.get(specie.evolution_chain.url);

  const evolves_names: string[] = [evolve_chain.chain.species.name];

  if (evolve_chain.chain.evolves_to.length > 0) {
    evolves_names.push(evolve_chain.chain.evolves_to[0].species.name);

    if (evolve_chain.chain.evolves_to[0].evolves_to.length > 0) {
      evolves_names.push(
        evolve_chain.chain.evolves_to[0].evolves_to[0].species.name
      );
    }
  }

  const iconPromise = evolves_names.map(async (name: string) => {
    const { data } = await pokeApi.get<PokemonContent>(`/pokemon/${name}`);

    return {
      icons:
        data.sprites.versions?.["generation-viii"].icons.front_default || "",
      name: data.name,
      id: data.id,
      types: data.types,
    };
  });

  return {
    props: {
      pokemon: data,
      specie,
      evolutions: await Promise.all(iconPromise).then((i) => {
        return i;
      }),
    },
    revalidate: 86400
  };
};

export default PokemonByNamePage;
