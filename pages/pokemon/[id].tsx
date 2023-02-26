import { Layout } from "../../components/layouts";
import { GetStaticProps, NextPage } from "next";
import { GetStaticPaths } from "next";
import pokeApi from "../../apis/pokeApi";
import { PokemonContent, PokemonSpecie } from "../../interfaces";
import {
  Grid,
  Button,
  Input,
  Card,
  Text,
  Progress,
  Row,
  Col,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ImgType } from "../../components/pokemons/ImgType";

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

const PokemonPage: NextPage<Props> = ({ pokemon, evolutions }) => {
  const router = useRouter();

  return (
    <Layout title={pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}>
      <>
        {/* Search/Back Container  */}
        <Grid.Container css={{ marginTop: "10px" }}>
          <Grid xs={3} lg={3}>
            <Button
              auto
              light
              color={"default"}
              onClick={() => router.push("/")}
            >
              <Image
                src="/arrowVector.svg"
                alt="arrow"
                width={20}
                height={20}
              />
            </Button>
          </Grid>
          <Grid xs={9} lg={6} justify={"center"}>
            <Input
              placeholder="Search Pokemon"
              style={{ textAlign: "center", fontSize: "16px" }}
              width="90%"
            />
          </Grid>
        </Grid.Container>
        {/* Img/Name/Evolutions Container */}
        <Grid.Container gap={2} css={{ marginTop: 10 }}>
          <Grid xs={12} lg={4}>
            <Card>
              <Card.Header css={{ p: "10px 0px 5px 10px" }}>
                <Button auto light color={"error"}>
                  <Image
                    src="/heartVector.svg"
                    alt="arrow"
                    width={25}
                    height={25}
                  />
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
            </Card>
          </Grid>
          <Grid xs={12} lg={4} css={{ justifyContent: "center" }}>
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
          <Grid
            xs={12}
            sm={4}
            css={{
              display: "flex",
              flexDirection: "column",
              p: 0,
            }}
          >
            <h3>Evolution Chain</h3>
            <Grid
              css={{
                border: "2px solid $gray100",
                borderRadius: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 0,
              }}
            >
              {evolutions.map(({ icons, name, id, types }, i) => (
                <>
                  <Grid
                    key={name}
                    css={{
                      display: "flex",
                      flexDirection: "row",
                      p: 0,
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
                    <Grid css={{ display: "flex" }}>
                      <ImgType types={types} />
                    </Grid>
                  </Grid>
                  {i +1 < evolutions.length && (
                    <Image
                      src="/downVector.svg"
                      alt="down"
                      width={30}
                      height={30}
                    />
                  )}
                </>
              ))}
            </Grid>
          </Grid>
        </Grid.Container>
        {/* Stats Container */}
        <Grid.Container>
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

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((p, i) => `${i + 1}`);

  return {
    paths: pokemons151.map((id) => ({
      params: {
        id,
      },
    })),
    // paths: [
    //   {
    //     params: {id: '1'},
    //   },
    //   {
    //     params: {id: '2'},
    //   },
    //   {
    //     params: {id: '3'},
    //   }
    // ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const { data } = await pokeApi.get<PokemonContent>(`/pokemon/${id}`);

  const { data: specie } = await pokeApi.get<PokemonSpecie>(
    `/pokemon-species/${id}`
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
      icons: data.sprites.versions?.["generation-viii"].icons.front_default || '',
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
  };
};

export default PokemonPage;
