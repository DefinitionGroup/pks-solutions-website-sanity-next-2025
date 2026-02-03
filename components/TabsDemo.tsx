"use client";

import { CardDemo3 } from "./CardDemo3";
import { Tabs } from "./ui/tabs";

interface TabsDemoProps {
  className?: string;
}

export function TabsDemo({ className }: TabsDemoProps) {
  const tabs = [
    {
      title: "Workflow",
      value: "product",
      content: (
        <div className="relative bg-gradient-to-br from-gray-700 to-gray-800 p-10 w-full h-full font-bold text-white text-xl md:text-4xl overflow-hidden">
          <p>Workflow</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Services",
      value: "services",
      content: (
        <div className="relative bg-gradient-to-br from-gray-700 to-gray-800 p-10 w-full h-full font-bold text-white text-xl md:text-4xl overflow-hidden">
          <p>Services tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Playground",
      value: "playground",
      content: (
        <div className="relative bg-gradient-to-br from-gray-700 to-gray-800 p-10 w-full h-full font-bold text-white text-xl md:text-4xl overflow-hidden">
          <p>Playground tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Content",
      value: "content",
      content: (
        <div className="relative bg-gradient-to-br from-gray-700 to-gray-800 p-10 w-full h-full font-bold text-white text-xl md:text-4xl overflow-hidden">
          <p>Content tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Random",
      value: "random",
      content: (
        <div className="relative bg-gradient-to-br from-gray-700 to-gray-800 p-10 w-full h-full font-bold text-white text-xl md:text-4xl overflow-hidden">
          <p>Random tab</p>
          <DummyContent />
        </div>
      ),
    },
  ];

  return (
    <div
      className={`${className} h-[20rem] md:h-[50rem] [perspective:1000px] relative z-30 flex flex-col justify-start items-start mx-auto my-40 w-full max-w-5xl`}
    >
      <Tabs tabs={tabs} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <CardDemo3
      title={""}
      subtitle={""}
      media={{
        _type: "cloudinary.asset",
        secure_url:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        public_id: "test",
      }}
    />
  );
};
