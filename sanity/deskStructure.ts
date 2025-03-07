import type { StructureResolver } from "@/sanity/deskStructure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list().title("Content").items(S.documentTypeListItems());
