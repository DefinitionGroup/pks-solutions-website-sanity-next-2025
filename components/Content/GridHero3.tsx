import Button2 from "../Button2";
import { CardDemo3 } from "../CardDemo3";
import { FC, ReactNode } from "react";
import AnimationWrapper from "../ui/anim/AnimationWrapper";
import { GridHero3 as gridHero3Props } from "@/types/types";
const GridHero3: FC<gridHero3Props> = (props) => {
  const { leftSection, middleSection, rightSection } = props;
  return (
    <>
      <div className="border-white/20 grid grid-cols-1 grid-rows-1 border-t border-r border-b border-l">
        <div className="place-content-start grid grid-cols-12 col-span-2 col-start-1 row-start-1 w-full">
          <div className="flex flex-col col-span-4 col-start-1">
            <AnimationWrapper transition={{ duration: 0.6, delay: 0.1 }}>
              <h4 className="px-8 pt-8 text-2xl text-white">
                {leftSection.subtitle}
              </h4>
            </AnimationWrapper>
            <AnimationWrapper transition={{ duration: 0.6, delay: 0.1 }}>
              <h2 className="px-8 pb-8 text-6xl text-white">
                {leftSection.title}
              </h2>
            </AnimationWrapper>
          </div>
          <AnimationWrapper
            transition={{ duration: 0.6, delay: 0.4 }}
            className="col-span-3 col-start-1 p-8 text-md text-white"
          >
            <h2>{leftSection.quoteLeft}</h2>
          </AnimationWrapper>
          <AnimationWrapper
            className="justify-start items-start place-content-start col-span-6 col-start-5 row-span-2 row-start-1 p-2 h-100 text-md text-white"
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <CardDemo3
              video={middleSection.videoCloudinary}
              title={middleSection.title}
              subtitle={middleSection.subtitle}
            />
          </AnimationWrapper>
          <div className="align-items-start grid col-span-2 col-start-11 row-start-1 pt-8 text-md text-white">
            <AnimationWrapper
              transition={{ duration: 0.6, delay: 0.4 }}
              className="px-8 text-md text-white"
            >
              <h2>{rightSection.quoteRight}</h2>
            </AnimationWrapper>

            <Button2
              text={rightSection?.ctaButton.name}
              href={
                rightSection?.ctaButton?.link?.linkType === "external"
                  ? rightSection?.ctaButton?.link?.externalUrl
                  : rightSection?.ctaButton?.link?.internalReference?._ref
              }
            ></Button2>
          </div>
        </div>

        <div className="grid grid-cols-12 col-start-1 row-start-1 divide-x divide-white/20 dark:divide-white/10 w-full min-h-[20rem]">
          <div className="col-span-4"></div>
          <div className="col-span-6"></div>
          <div className="col-span-2"></div>
        </div>
      </div>
    </>
  );
};

export default GridHero3;
