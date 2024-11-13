import React from "react";
import { cn } from "@/app/lib/utils";

const variants = {
  primary:
    "relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 ring-1 ring-white/10 hover:ring-white/20 px-8 md:py-4 md:text-sm tracking-loose hover:bg-black transition duration-300 ease-in-out hover:scale-105",
  secondary:
    "relative flex space-x-2 items-center z-10 rounded-full bg-indigo-800 py-2 ring-1 ring-white/10 px-8 md:py-4 md:text-xl",
  green:
    "relative flex space-x-2 items-center z-10 rounded-full bg-green-500 py-2 ring-1 ring-white/10 px-8 md:py-4 md:text-xl",
  4: "relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 ring-1 ring-white/10 px-8 md:py-4 md:text-xl",
  5: "relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 ring-1 ring-white/10 px-8 md:py-4 md:text-xl",
  6: "relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 ring-1 ring-white/10 px-8 md:py-4 md:text-xl",
  7: "relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 ring-1 ring-white/10 px-8 md:py-4 md:text-xl",
  8: "relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 ring-1 ring-white/10 px-8 md:py-4 md:text-xl",
  9: "relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 ring-1 ring-white/10 px-8 md:py-4 md:text-xl",
  10: "border-white hover:border-gray-500 px-16 py-4 border rounded-none text-sm text-white transition duration-300 hover:cursor-pointer ease-in-out",
};
function Button({
  text,
  variant = 10,
  className,
}: {
  text: string;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <a
      className={cn(
        "pointer-events-auto hover:cursor-pointer tracking-wider",
        variants[variant],
        className
      )}
    >
      {text}
    </a>
  );
}
export default Button;
