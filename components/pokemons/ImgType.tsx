import { Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { FC } from "react";
import { Types } from "../../interfaces";

interface Props {
  types: Types[];
}

export const ImgType: FC<Props> = ({ types }) => {
  return (
    <>
      {types.map(({ type }) => (
        <Tooltip
          key={type.name[0].toUpperCase() + type.name.slice(1)}
          content={type.name[0].toUpperCase() + type.name.slice(1)}
          color={'invert'}
          placement={'bottom'}
        >
          <Image
            src={`/tipos/${type.name}.svg`}
            alt={type.name}
            width={50}
            height={50}
            />
        </Tooltip>
      ))}
    </>
  );
};
