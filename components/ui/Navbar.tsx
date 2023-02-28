import { Link ,useTheme, Button, Switch } from "@nextui-org/react";
import { HeartIcon } from "../../public/HeartIcon";
import Image from "next/image";
import { useTheme as useNextTheme } from "next-themes";
import { SunIcon } from "../../public/SunIcon";
import { MoonIcon } from "../../public/MoonIcon";
import NextLink from 'next/link';

export const Navbar = () => {
  const { theme, isDark } = useTheme();
  const { setTheme } = useNextTheme();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0px 20px",
        backgroundColor: theme?.colors.gray100.value,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <NextLink href='/' passHref>
          {/* <Link> */}
            <Image
              src="/logoPokemon.svg"
              alt="Pokemon"
              width={120}
              height={50}
              style={{margin: 10}}
            />
          {/* </Link> */}
        </NextLink>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: 120,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <NextLink href='/favorites'>
          <Button
            auto
            css={{
              backgroundColor: '$errorBorderHover'
            }}
            icon={<HeartIcon fill="currentColor" filled />}
          />
        </NextLink>
        <Switch
          checked={isDark}
          // shadow
          size={"lg"}
          color="warning"
          iconOff={<SunIcon filled />}
          iconOn={<MoonIcon filled />}
          onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
        />
      </div>
    </div>
  );
};
