import Image from "next/image";
import { cn } from "@/app/lib/utils";

// Official PKS Solutions wordmark (140 × 23): black on light surfaces, white in dark mode
export default function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <span className={cn("inline-flex", className)}>
      <Image src="/img/logo-pks-black.svg" alt="PKS Solutions" width={140} height={23} priority={priority} className="block h-full w-auto dark:hidden" />
      <Image src="/img/logo-pks-white.svg" alt="PKS Solutions" width={140} height={23} priority={priority} className="hidden h-full w-auto dark:block" />
    </span>
  );
}
