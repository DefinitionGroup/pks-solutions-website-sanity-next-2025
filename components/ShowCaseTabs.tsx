"use client";

import React from "react";
import { Tabs } from "./ui/tabs";
import { CloudinaryAsset } from "@/types/types";
import { CardDemo3 } from "./CardDemo3";
// Module types: extend this union as you add more module schemas
type Module = {
  _type: "card3";
  title: string;
  subtitle: string;
  video: CloudinaryAsset;
};
// future modules:

interface TabItem {
  title: string;
  value: string;
  modules: Module[];
}

export interface ShowcaseTabsProps {
  className?: string;
  tabs: TabItem[];
}

export function ShowcaseTabs({ className, tabs }: ShowcaseTabsProps) {
  // Build the tabs data for the UI component
  const items = tabs.map((tab) => ({
    title: tab.title,
    value: tab.value,
    content: (
      <div className="relative bg-gradient-to-br from-gray-700 to-gray-800 p-10 w-full h-full font-bold text-white text-xl md:text-4xl overflow-hidden">
        {tab.modules.map((module, idx) => {
          switch (module._type) {
            case "card3":
              return (
                <CardDemo3
                  key={idx}
                  title={module.title}
                  subtitle={module.subtitle}
                  video={module.video}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    ),
  }));

  return (
    <div
      className={`${className} h-[20rem] md:h-[50rem] [perspective:1000px] relative z-30 flex flex-col justify-start items-start mx-auto my-40 w-full max-w-5xl`}
    >
      <Tabs tabs={items} />
    </div>
  );
}
