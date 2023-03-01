import { Types } from "../../interfaces";
import { FC } from "react";
import { Grid, Card, Row, Text } from "@nextui-org/react";
import { ImgType } from "./ImgType";
import { useRouter } from 'next/router';

interface Props {
  id: number;
  img: string;
  name: string;
  types: Types[];
}

export const CardPokemon: FC<Props> = ({ id, img, name, types }) => {

  const router = useRouter()

  const handleLink = () => {
    router.push(`/name/${name}`)
  }


  return (
    <Grid key={id} xs={12} sm={3} md={2}>
      <Card isPressable isHoverable onClick={handleLink}>
        <Card.Header css={{ justifyContent: "flex-end" }}>
          <ImgType types={types} />
        </Card.Header>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src={img}
            objectFit="contain"
            width="100%"
            height={150}
            alt={name}
          />
        </Card.Body>
        <Card.Footer
          css={{
            marginTop: 10,
          }}
        >
          <Row justify="center">
            <Grid
              css={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: "90%",
                backgroundColor: "$gray100",
                borderRadius: 5,
                padding: 3,
              }}
            >
              <Text b css={{ color: "$accents7" }}>
                #{id < 10 ? "00" : id < 100 ? "0" : ""}
                {id}
              </Text>
              <Text b transform="capitalize">
                {name}
              </Text>
            </Grid>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
