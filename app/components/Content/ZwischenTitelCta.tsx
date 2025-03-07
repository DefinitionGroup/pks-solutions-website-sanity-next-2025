import React from "react";
import Button2 from "../Button2";
import { FC, ReactNode } from "react";
import { ZwischenTitelCta as zwisProps } from "@/types/types";
const ZwischenTitelCta: FC<zwisProps> = (props) => {
  const { integrationTitle, headline, subHeadline, buttonText } = props;
  return (
    <div className="mx-auto py-64 max-w-2xl text-center">
      <h2 className="font-semibold text-base/7 text-red-500">
        {integrationTitle}
      </h2>
      <p className="mt-2 font-semibold text-4xl text-balance text-white sm:text-5xl tracking-tight">
        {headline}
      </p>
      <p className="mx-auto mt-6 max-w-xl text-gray-400 text-lg/8 text-pretty">
        {subHeadline}
      </p>
      <div className="flex justify-center">
        <div className="flex justify-center mt-8 w-64 text-white">
          <Button2
            text={buttonText}
            className="border-white/20 border-r border-l"
          />
        </div>
      </div>
    </div>
  );
};

export default ZwischenTitelCta;
