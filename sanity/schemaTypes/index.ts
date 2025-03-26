import { type SchemaTypeDefinition } from "sanity";
import page from "./page";
import ComponentsElements from "./components";
import BlogElements from "./Blog";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [page, ...ComponentsElements, ...BlogElements],
};
