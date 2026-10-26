import Link from "next/link";
import { isCustomerPreview } from '@/lib/customer-preview';

export default function PreviewBanner() {
  // The customer preview has one persistent, German-language bar in its layout.
  if (isCustomerPreview()) return null;
  return (
    <div className="bg-yellow-600 p-4 text-center">
      <p className="text-sm font-semibold">
        You are in preview mode.{" "}
        <Link href="/api/draft-mode/disable" className="underline">
          Exit Preview Mode
        </Link>
      </p>
    </div>
  );
}
