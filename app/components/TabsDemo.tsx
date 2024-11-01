"use client";

import Image from "next/image";
import { Tabs } from "./ui/tabs";

export function TabsDemo() {
  const tabs = [
    {
      title: "Product",
      value: "product",
      content: (
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-950 p-10 rounded-2xl w-full h-full font-bold text-white text-xl md:text-4xl overflow-hidden">
          <p>Product Tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Services",
      value: "services",
      content: (
        <div className="relative bg-gradient-to-br from-slate-700 to-slate-900 p-10 rounded-2xl w-full h-full font-bold text-white text-xl md:text-4xl overflow-hidden">
          <p>Services tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Playground",
      value: "playground",
      content: (
        <div className="relative bg-gradient-to-br from-slate-700 to-slate-900 p-10 rounded-2xl w-full h-full font-bold text-white text-xl md:text-4xl overflow-hidden">
          <p>Playground tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Content",
      value: "content",
      content: (
        <div className="relative bg-gradient-to-br from-slate-700 to-slate-900 p-10 rounded-2xl w-full h-full font-bold text-white text-xl md:text-4xl overflow-hidden">
          <p>Content tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Random",
      value: "random",
      content: (
        <div className="relative bg-gradient-to-br from-slate-700 to-slate-900 p-10 rounded-2xl w-full h-full font-bold text-white text-xl md:text-4xl overflow-hidden">
          <p>Random tab</p>
          <DummyContent />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative z-30 flex flex-col justify-start items-start mx-auto my-40 w-full max-w-5xl">
      <Tabs tabs={tabs} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <Image
      src="/img/mainframe_ai_gran_canaria_landscape_with_sundown_and_lights_on__90d99f6b-17b9-43f2-b771-b91a948cf5fd (1)-gigapixel-standard-scale-6_00x.jpg"
      alt="dummy image"
      width="1000"
      height="1000"
      className="-bottom-10 object-left-top absolute inset-x-0 mx-auto rounded-xl w-[90%] h-[60%] md:h-[90%] object-cover"
    />
  );
};
