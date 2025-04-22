import React from "react";
import Button2 from "../Button2";
function ZwischenTitelAboutUs() {
  return (
    <div className="mx-auto py-64 max-w-2xl text-center">
      <h2 className="font-semibold text-base/7 text-red-500">INTEGRATION</h2>
      <p className="mt-2 font-semibold text-4xl text-balance text-white sm:text-5xl tracking-tight">
        Passen Sie sich nicht an Ihre Software.
      </p>
      <p className="mx-auto mt-6 max-w-xl text-gray-400 text-lg/8 text-pretty">
        Lassen Sie Ihre Software für Sie arbeiten.
      </p>
      <div className="flex justify-center">
        <div className="flex justify-center mt-8 w-64 text-white">
          <Button2
            text="Kontakt aufnehmen."
            className="border-white/20 border-r border-l"
          />
        </div>
      </div>
    </div>
  );
}

export default ZwischenTitelAboutUs;
