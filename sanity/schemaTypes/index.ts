import { type SchemaTypeDefinition } from "sanity";
import page from "./page";
import ComponentsElements from "./components";
import BlogElements from "./Blog";
import AVTRComponentsElements from "./AvatrComponents";
import ClientsElements from "./Clients";
import { Objects } from "./Objects";
import user from "./Users/user";
import userGroup from "./Users/userGroup";
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    page as SchemaTypeDefinition,
    ...(ComponentsElements as SchemaTypeDefinition[]),
    ...(BlogElements as SchemaTypeDefinition[]),
    ...(AVTRComponentsElements as SchemaTypeDefinition[]),
    ...(ClientsElements as SchemaTypeDefinition[]),
    ...(Objects as SchemaTypeDefinition[]),
    user as SchemaTypeDefinition,
    userGroup as SchemaTypeDefinition,
  ],
};
