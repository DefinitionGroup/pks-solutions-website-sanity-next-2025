import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

// Read the content from a JSON file
const pagesData = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "app/pages.json"), "utf8")
);
console.log("pagesData", pagesData);
export const generateStaticParams = () => {
  return pagesData.map((page) => ({ slug: page.slug }));
};

export default async function Page(props) {
  const params = await props.params;
  const page = pagesData.find((p) => p.slug === params.slug);

  if (!page) {
    notFound();
  }

  return (
    <div>
      <h1>{page.title}</h1>
      <h2>{page.subtitle}</h2>
      <img src={page.image} alt={page.title} />
      <p>{page.content}</p>
    </div>
  );
}
