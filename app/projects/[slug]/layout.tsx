export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <h1 className="text-black">Test</h1>
      <main className="mx-auto py-8 container">{children}</main>
    </div>
  );
}
