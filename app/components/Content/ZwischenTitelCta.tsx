import React from "react";
import Button2 from "../Button2";
function ZwischenTitelCta() {
  return (
    <div className="mx-auto py-64 max-w-2xl text-center">
      <h2 className="font-semibold text-base/7 text-red-500">Get started</h2>
      <p className="mt-2 font-semibold text-4xl text-balance text-white sm:text-5xl tracking-tight">
        Boost your productivity. Start using our app today.
      </p>
      <p className="mx-auto mt-6 max-w-xl text-gray-400 text-lg/8 text-pretty">
        Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id
        veniam aliqua proident excepteur commodo do ea.
      </p>
      <div className="flex justify-center">
        <div className="flex justify-center mt-8 w-64 text-white">
          <Button2
            text="Get Started"
            className="border-white/20 border-r border-l"
          />
        </div>
      </div>
    </div>
  );
}

export default ZwischenTitelCta;
