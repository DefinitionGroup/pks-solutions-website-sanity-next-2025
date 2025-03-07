import { type SchemaTypeDefinition } from "sanity";
import page from "./page";
import ComponentsElements from "./components";
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [page, ...ComponentsElements],
};
