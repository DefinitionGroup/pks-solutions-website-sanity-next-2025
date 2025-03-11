"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export function DisableDraftMode() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const disable = () =>
    startTransition(async () => {
      await fetch("/api/draft-mode/disable");
      router.refresh();
    });

  return (
    <div>
      {pending ? (
        "Disabling draft mode..."
      ) : (
        <button type="button" onClick={disable}>
          Disable draft mode
        </button>
      )}
    </div>
  );
}
