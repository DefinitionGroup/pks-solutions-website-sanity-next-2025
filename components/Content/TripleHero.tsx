import Button2 from "@/components/Button2";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { FC, ReactNode } from "react";
import Image from "next/image";
import { TripleHero as trupleHeroProps } from "@/types/types";

const TripleHero: FC<trupleHeroProps> = (props) => {
  const { items } = props;
  return (
    <div className="relative flex justify-center items-center gap-4 w-full h-[40rem]">
      {items.map((item, index) => (
        <DirectionAwareHover
          imageUrl={item.hoverBackgroundCloudinary?.secure_url}
          key={index}
          className="bg-black text-white"
          fixedContent={
            <>
              <Image
                className="py-3 w-1/4 h-1/4 object-cover"
                aria-hidden
                src={item.fixedIconCloudinary?.secure_url || ""}
                alt="Window icon"
                width={64}
                height={64}
              />
              <p className="font-bold text-5xl">{item.fixedTitle}</p>
            </>
          }
        >
          <p className="font-bold text-xl">{item.hoverTitle}</p>
          <p className="font-normal text-sm">{item.hoverDescription}</p>

          <div className="px-4 py-12">
            <Button2
              text={item.buttonText}
              className={"border-x max-w-fit border-white/20"}
            ></Button2>
          </div>
        </DirectionAwareHover>
      ))}
    </div>
  );
};

export default TripleHero;

/**
 * <DirectionAwareHover
        imageUrl={imgBack1}
        className="bg-black text-white"
        fixedContent={
          <>
            <p className="font-bold text-5xl">PSYSTEM</p>
            <Image
              className="py-3 w-1/4 h-1/4 object-cover"
              aria-hidden
              src={imgL1}
              alt="Window icon"
              width={64}
              height={64}
            />
          </>
        }
      >
        <p className="font-bold text-xl">AI Analyse</p>
        <p className="font-normal text-sm">
          Machine Learning basierte
          <br /> Analysefunktionen um Schwachpunkte in Ihren Workflows
          aufzudecken.
        </p>

        <div className="px-4 py-12">
          <Button2
            text="www.AVATR.com"
            className={"border-x max-w-fit border-white/20"}
          ></Button2>
        </div>
      </DirectionAwareHover>

      <DirectionAwareHover
        className="bg-black text-white"
        imageUrl={imgBack2}
        fixedContent={
          <>
            {" "}
            <Image
              className="py-3 w-1/4 h-1/4 object-cover"
              aria-hidden
              src={imgL2}
              alt="Window icon"
              width={64}
              height={64}
            />
            <p className="font-bold text-5xl">PMOBILE</p>
          </>
        }
      >
        <p className="font-bold text-xl">AI Analyse</p>
        <p className="font-normal text-sm">
          Machine Learning basierte
          <br /> Analysefunktionen um Schwachpunkte in Ihren Workflows
          aufzudecken.
        </p>

        <div className="px-4 py-12">
          <Button2
            text="PMOBILE"
            className={"border-x max-w-fit border-white/20"}
          ></Button2>
        </div>
      </DirectionAwareHover>

      <DirectionAwareHover
        className="bg-black text-white"
        imageUrl={props.strings[2]}
        fixedContent={
          <>
            <Image
              className="py-3 w-1/4 h-1/4 object-cover"
              aria-hidden
              src={imgL3}
              alt="Window icon"
              width={96}
              height={96}
            />

            <p className="font-bold text-5xl">AVATR</p>
          </>
        }
      >
        <p className="font-bold text-xl">AI Analyse</p>
        <p className="font-normal text-sm">
          Machine Learning basierte
          <br /> Analysefunktionen um Schwachpunkte in Ihren Workflows
          aufzudecken.
        </p>
        <div className="px-4 py-12">
          <Button2
            text="AVATR"
            className={"border-x max-w-fit border-white/20"}
          ></Button2>
        </div>
      </DirectionAwareHover>
 */
