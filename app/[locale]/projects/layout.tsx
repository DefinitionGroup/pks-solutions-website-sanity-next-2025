import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import "../../globals.css";
import PreviewBanner from "@/components/PreviewBanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default async function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();
  if (!children) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {isEnabled && (
        <>
          <VisualEditing />
          <PreviewBanner />
        </>
      )}
      {children}
    </div>
  );
}
