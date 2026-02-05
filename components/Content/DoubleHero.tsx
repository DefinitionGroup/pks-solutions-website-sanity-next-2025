"use client";

import Button2 from "@/components/Button2";
import { FC } from "react";
import Image from "next/image";
import { DoubleHero as DoubleHeroProps } from "@/types/types";
import { resolveSanityLink } from "@/utils/linkResolver";

const DoubleHero: FC<DoubleHeroProps & { locale?: string }> = (props) => {
  const { items, locale } = props;

  return (
    <div className="relative lg:flex  justify-start items-start   h-full gap-4 w-full px-8 ">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white dark:bg-black flex  justify-start flex-col mt-4 text-black dark:text-white w-full h-full mb-16"
        >
          <Image
            className=" w-1/1 mb-2 object-contain relative"
            aria-hidden
            src={item.fixedIconCloudinary?.secure_url || ""}
            alt="Window icon"
            width={60}
            height={60}

          />
          <p className="text-2xl sm:text-2xl  md:text-3xl lg:text-3xl">
            {item.fixedTitle}
          </p>

          <p className=" text-sm md:text-lg">
            {item.hoverTitle}
          </p>
          <p className="font-normal w-3/4 mt-8 text-base leading-relaxed md:text-base">
            {item.hoverDescription}
          </p>
          <Button2
            className="mt-8"
            text={item?.ctaButton?.name}
            href={resolveSanityLink(item?.ctaButton?.link, locale)}
          ></Button2>
        </div>
      ))}
    </div>
  );
};

export default DoubleHero;
