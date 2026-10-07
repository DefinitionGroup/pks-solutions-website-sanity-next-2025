import { migrateToLanguageField } from "sanity-plugin-internationalized-array/migrations";

// @sanity/document-internationalization v6 reads a translation's language from a `language`
// field instead of the array item's `_key`; run once per dataset after upgrading the plugin.
export default migrateToLanguageField(["translation.metadata"]);
