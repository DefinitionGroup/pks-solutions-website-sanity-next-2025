import Button2 from "@/app/components/Button2";
import { DirectionAwareHover } from "@/app/components/ui/direction-aware-hover";
import imgL1 from "@/public/img/pks1-v.svg";
import imgL2 from "@/public/img/pks2-v.svg";
import imgL3 from "@/public/img/pks3av-v.svg";
import Image from "next/image";
import imgBack2 from "public/img/mainframe_ai_german_northseacoast_beach_with_polestar_3_electri_a81296f4-8931-4f10-b9a5-152686f8e27b-gigapixel-standard-scale-6_00x.jpg";
import imgBack1 from "public/img/mainframe_ai_polestar_3_black_car_on_lanzarote_desert_an_sunset_020c936a-6ebc-4315-84f2-4f506b1f0586-gigapixel-standard-scale-6_00x.jpg";

export default function TripleHero(props: { strings: string[] }) {
  return (
    <div className="relative flex justify-center items-center gap-4 w-full h-[40rem]">
      <DirectionAwareHover
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
    </div>
  );
}
