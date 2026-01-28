import Image from "next/image";
import { FC } from "react";
import Button2 from "../Button2";
import { GridHero2 as gridHero2Props } from "@/types/types";
import { resolveSanityLink } from "@/utils/linkResolver";


const GridHero2: FC<gridHero2Props & { locale?: string }> = (props) => {
  const { leftTitle, middle, right, _key, locale } = props;
  return (
    <div className="z-10 border-gray-200 dark:border-white/20 md:grid grid-cols- grid-rows-1 container mx-auto border-t border-r border-b border-l">
      <div
        className="md:grid grid-cols-12 col-start-1 row-start-1 w-full"
        key={_key}
      >
        <h2 className="col-span-3  col-start-1 p-8 text-3xl md:text-4xl text-gray-900 dark:text-white">
          {leftTitle}
        </h2>
        <div className="col-span-4 col-start-5">
          <p className="p-8 text-lg md:text-xl lg:text-2xl text-gray-900 dark:text-white">{middle?.description1}</p>

          <p className="border-gray-200 dark:border-white/20 p-8 text-sm md:text-base text-gray-600 dark:text-white">
            {middle?.description2}
          </p>
        </div>
        <div className="z-10 place-content-start grid grid-cols-2 col-span-4 col-start-10 row-start-1">
          <p className="border-gray-200 dark:border-white/20 col-span-2 col-start-1 row-start-1 p-8 border-t text-gray-600 dark:text-white text-xs md:text-sm">
            {right?.logoTitle}
          </p>
          {(right?.logos ?? []).map((logo, index) => (
            <div
              key={`${_key}-logo-${index}`}
              className="flex justify-center items-center border-gray-200 dark:border-white/20 bg-gray-100 dark:bg-slate-900/50 hover:bg-gray-200 dark:hover:bg-slate-900/70 opacity-50 hover:opacity-100 border h-20 transition duration-300"
            >
              <Image
                aria-hidden
                src={logo?.secure_url || "/images/placeholder.jpg"}
                alt="Window icon"
                width={164}
                height={164}
                className="block place-content-center p-4 w-1/1 self-stretch"
              />
            </div>
          ))}

          <div className="align-items-start grid col-span-2 col-start-1 text-base text-gray-900 dark:text-white">
            <Button2
              text={right?.ctaButton?.name}
              href={resolveSanityLink(right?.ctaButton?.link, locale)}
            ></Button2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 col-start-1 row-start-1 divide-x divide-gray-200 dark:divide-white/20 w-full min-h-[20rem]">
        <div className="col-span-4"></div>
        <div className="col-span-5"></div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
};

export default GridHero2;
