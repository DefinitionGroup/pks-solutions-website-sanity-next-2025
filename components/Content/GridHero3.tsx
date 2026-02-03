import Button2 from "../Button2";
import { CardDemo3 } from "../CardDemo3";
import { FC } from "react";
import AnimationWrapper from "../ui/anim/AnimationWrapper";
import { GridHero3 as gridHero3Props } from "@/types/types";
import { resolveSanityLink } from "@/utils/linkResolver";


const GridHero3: FC<gridHero3Props & { locale?: string }> = (props) => {
  const { leftSection, middleSection, rightSection, locale } = props;
  return (
    <>
      <div className="border-gray-200 dark:border-white/20  bg-white dark:bg-transparent mx-auto container md:grid grid-cols-1 grid-rows-1 border min-h-[20rem] ">
        <div className="place-content-start md:grid   grid-cols-12 container mx-auto col-span-2 col-start-1 row-start-1 w-full  min-h-[20rem]">
          <div className="flex flex-col col-span-4 col-start-1  min-h-[20rem]">
         
            <AnimationWrapper transition={{ duration: 0.6, delay: 0.1 }}>
              <h2 className="px-8 pt-12 text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-900 dark:text-white">
                {leftSection.title}
              </h2>
            </AnimationWrapper>   <AnimationWrapper transition={{ duration: 0.6, delay: 0.1 }}>
              <h4 className="px-8 pt-2 text-lg  md:text-lg lg:text-lg text-red-500  text-gray-900 dark:text-white">
                {leftSection.subtitle}
              </h4>
            </AnimationWrapper>
          </div>
          <AnimationWrapper
            transition={{ duration: 0.6, delay: 0.4 }}
            className="col-span-4 col-start-1 p-8 text-sm md:text-base  text-gray-600 dark:text-white"
          >
            <p>{leftSection.quoteLeft}</p>
          </AnimationWrapper>
          <AnimationWrapper
            className="justify-start items-start place-content-start col-span-5  col-start-5 row-span-2 row-start-1 text-base text-gray-900 dark:text-white min-h-[24rem]"
            transition={{ duration: 0.6, delay: 0.7 }}
          >
          
              <CardDemo3
                media={middleSection.videoCloudinary}
                title={middleSection.title}
                subtitle={middleSection.subtitle}
              />
          
          </AnimationWrapper>
          <div className="align-items-start grid col-span-3 col-start-10 row-start-1 pt-12 text-base text-gray-900 dark:text-white">
            <AnimationWrapper
              transition={{ duration: 0.6, delay: 0.4 }}
              className="px-8 text-sm md:text-base  text-gray-600 dark:text-white"
            >
              <p>{rightSection.quoteRight}</p>
            </AnimationWrapper>

          
              <Button2
       
                text={rightSection?.ctaButton?.name}
                href={resolveSanityLink(rightSection?.ctaButton?.link, locale)}
              ></Button2>
          
          </div>
        </div>

      </div>
    </>
  );
};

export default GridHero3;
