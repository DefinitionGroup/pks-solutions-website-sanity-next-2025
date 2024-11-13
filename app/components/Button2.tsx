import React from "react";
import { cn } from "@/app/lib/utils";
import { ArrowRight } from "@phosphor-icons/react";
interface Button2Props {
  text?: string;
  className?: string;
}

function Button2({ text, className }: Button2Props) {
  return (
    <div
      className={`inline-block relative top-0 left-0  w-96 ml-[1px] border-white/20 border-t border-b h-14 text-sm overflow-hidden group/btn min-h-6 `}
    >
      <a
        className={cn(
          "pointer-events-auto bg-black absolute top-0 left-0  justify-between font-bold flex w-full p-4 hover:cursor-pointer tracking-wider group-hover/btn:-top-12 transition-all duration-250 ease-in-out",
          className
        )}
      >
        <div className="flex justify-between items-center w-full">
          <span>{text}</span>
          <ArrowRight size={16} />
        </div>
      </a>
      <a
        className={cn(
          "pointer-events-auto border bg-slate-100 absolute font-bold  left-0 flex justify-between top-[100%] w-full group-hover/btn:top-0 text-slate-900  transition-all duration-250 ease-in-out p-4 hover:cursor-pointer tracking-wider",
          className
        )}
      >
        <div className="flex justify-between items-center w-full">
          <span>{text}</span>
          <ArrowRight className="rotate-45" size={16} />
        </div>
      </a>
    </div>
  );
}
export default Button2;
