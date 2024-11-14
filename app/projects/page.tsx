import fs from "fs";
import Link from "next/link";
import { notFound } from "next/navigation";
import path from "path";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
} from "react";

// Read the content from a JSON file
const pagesData = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "app/pages.json"), "utf8")
);
console.log("pagesData", pagesData);

export default async function Page() {
  if (!pagesData) {
    notFound();
  }

  return (
    <div>
      <h1>Archive</h1>
      <ul>
        {pagesData.map(
          (page: {
            slug: Key | null | undefined;
            title:
              | string
              | number
              | bigint
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | Promise<AwaitedReactNode>
              | null
              | undefined;
          }) => (
            <li key={page.slug}>
              <Link href={`/projects/${page.slug}`}>{page.title}</Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
