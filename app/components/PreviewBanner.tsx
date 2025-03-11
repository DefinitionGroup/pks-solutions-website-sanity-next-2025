import Link from "next/link";

export default function PreviewBanner() {
  return (
    <div className="bg-yellow-300 p-4 text-center">
      <p className="text-sm font-semibold">
        You are in preview mode.{" "}
        <Link href="/api/draft-mode/disable" className="underline">
          Exit Preview Mode
        </Link>
      </p>
    </div>
  );
}
