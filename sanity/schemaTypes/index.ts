import { type SchemaTypeDefinition } from "sanity";
import page from "./page";
import ComponentsElements from "./components";
import BlogElements from "./Blog";
import AVTRComponentsElements from "./AvatrComponents";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    page as SchemaTypeDefinition,
    ...(ComponentsElements as SchemaTypeDefinition[]),
    ...(BlogElements as SchemaTypeDefinition[]),
    ...(AVTRComponentsElements as SchemaTypeDefinition[]),
  ],
};
