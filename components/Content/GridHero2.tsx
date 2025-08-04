import Image from "next/image";
import { FC, ReactNode } from "react";
import Button2 from "../Button2";
import { GridHero2 as gridHero2Props } from "@/types/types";
import { resolveSanityLink } from "@/utils/linkResolver";

const GridHero2: FC<gridHero2Props> = (props) => {
  const { leftTitle, middle, right, _key } = props;
  return (
    <div className="z-10 border-white/20 grid grid-cols-1 grid-rows-1 border-t border-r border-b border-l">
      <div
        className="grid grid-cols-12 col-start-1 row-start-1 w-full"
        key={_key}
      >
        <h2 className="col-span-4 col-start-1 p-8 text-6xl text-white">
          {leftTitle}
        </h2>
        <div className="col-span-4 col-start-6">
          <h2 className="p-8 text-2xl text-white">{middle?.description1}</h2>

          <h4 className="border-white/20 p-8 text-md text-white">
            {middle?.description2}
          </h4>
        </div>
        <div className="z-10 place-content-start grid grid-cols-2 col-span-4 col-start-10 row-start-1">
          <h2 className="border-white/20 col-span-2 col-start-1 row-start-1 p-8 border-t text-white text-xs">
            {right?.logoTitle}
          </h2>
          {right?.logos.map((logo, index) => (
            <div
              key={`${_key}-logo-${index}`}
              className="flex justify-center items-center border-white/20 bg-slate-900/50 hover:bg-slate-900/70 opacity-50 hover:opacity-100 border h-20 transition duration-300"
            >
              <Image
                aria-hidden
                src={logo.secure_url}
                alt="Window icon"
                width={164}
                height={164}
                className="block place-content-center p-4 w-1/1 self-stretch"
              />
            </div>
          ))}

          <div className="align-items-start grid col-span-2 col-start-1 text-md text-white">
            <Button2
              text={right?.ctaButton.name}
              href={resolveSanityLink(right?.ctaButton.link)}
            ></Button2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 col-start-1 row-start-1 divide-x divide-white/20 dark:divide-white/10 w-full min-h-[20rem]">
        <div className="col-span-5"></div>
        <div className="col-span-4"></div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
};

export default GridHero2;
