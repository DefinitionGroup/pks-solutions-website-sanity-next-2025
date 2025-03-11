import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import "../globals.css";
import PreviewBanner from "../components/PreviewBanner";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();
  if (!children) {
    return null;
  }

  return (
    <main className="flex flex-col min-h-screen">
      {isEnabled && (
        <>
          <VisualEditing />
          <PreviewBanner />
        </>
      )}
      {children}
    </main>
  );
}
