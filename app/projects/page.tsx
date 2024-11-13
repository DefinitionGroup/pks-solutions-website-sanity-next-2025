import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";

// Read the content from a JSON file
const pagesData = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "app/pages.json"), "utf8")
);
console.log("pagesData", pagesData);

export default async function Page(props) {
  if (!pagesData) {
    notFound();
  }

  return (
    <div>
      <h1>Archive</h1>
      <ul>
        {pagesData.map((page) => (
          <li key={page.slug}>
            <Link href={`/projects/${page.slug}`}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
