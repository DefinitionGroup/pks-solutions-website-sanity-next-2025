export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <h1 className="font-bold text-black">Test PROJECTS</h1>
      <main className="mx-auto py-8 container">{children}</main>
    </div>
  );
}
