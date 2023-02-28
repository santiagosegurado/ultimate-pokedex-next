import { Layout } from "@/components/layouts";
import React, { useEffect } from "react";
import { Grid, Text, Card, Container } from '@nextui-org/react';
import Image from "next/image";
import { useState } from "react";
import { favoritePokemons } from "../../utils";
import { useRouter } from 'next/router';

const FavoritesPage = () => {
  const [pokemonFavorites, setPokemonFavorites] = useState<number[]>([]);

  const router = useRouter()

  useEffect(() => {
    setPokemonFavorites(favoritePokemons);
  }, []);

  return (
    <Layout title="Favorites">
      {!pokemonFavorites.length ? (
        <Grid.Container
          css={{
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            mt: 100,
          }}
        >
          <Grid xs={12} sm={6} md={4} justify="center">
            <Image
              src="/magikarpFavs.svg"
              alt="Margikarp Favorites"
              height={300}
              width={300}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            md={4}
            css={{
              textAlign: "center",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
            justify="center"
          >
            <Text h4>No has marcado ningún Pokémon como favorito. :( </Text>
            <Text span>
              Pulsa sobre el icono del corazón de tus pokemon favoritos y
              aparecerán aquí.
            </Text>
          </Grid>
        </Grid.Container>
      ) : (
        <>
          <Container>
            <h1>Favorites</h1>
          </Container>
          <Grid.Container gap={2} direction={'row'}>
            {
              pokemonFavorites.map(id => (
                <Grid key={id} xs={6} sm={4} md={3} >
                  <Card isPressable isHoverable onClick={() => router.push(`/pokemon/${id}`)}>
                    <Card.Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}/>
                  </Card>
                </Grid>
              ))
            }
          </Grid.Container>
        </>
      )}
    </Layout>
  );
};

export default FavoritesPage;
