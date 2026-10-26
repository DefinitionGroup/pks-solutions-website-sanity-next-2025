import { VisualEditing } from "next-sanity/visual-editing";
import { getContentPreview as draftMode } from '@/lib/content-preview';
import "../../globals.css";
import PreviewBanner from "@/components/PreviewBanner";
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
