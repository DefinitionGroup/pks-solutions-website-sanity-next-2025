import React from "react";
import { cn } from "@/app/lib/utils";

function Button2({ text, className }) {
  return (
    <div
      className={`relative ml-[1px] border-white/20 border-t border-b h-14 text-sm overflow-hidden group/btn `}
    >
      <a
        className={cn(
          "pointer-events-auto bg-black absolute top-0 left-0  font-bold   w-full p-4 hover:cursor-pointer tracking-wider group-hover/btn:-top-12 transition-all duration-250 ease-in-out",
          className
        )}
      >
        {text} 1
      </a>
      <a
        className={cn(
          "pointer-events-auto border bg-slate-100 absolute font-bold   top-0 left-[100%] w-full group-hover/btn:left-0 text-slate-900 inline-block transition-all duration-250 ease-in-out p-4 hover:cursor-pointer tracking-wider",
          className
        )}
      >
        {text} 2
      </a>
    </div>
  );
}
export default Button2;
