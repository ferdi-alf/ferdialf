/* eslint-disable @typescript-eslint/no-explicit-any */
export const journeyEventSchema = {
  name: "journeyEvent",
  title: "Journey Event",
  type: "document",
  fields: [
    {
      name: "id",
      title: "ID (Slug)",
      type: "slug",
      options: { source: "title" },
      validation: (R: any) => R.required(),
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      validation: (R: any) => R.required().min(0),
    },
    {
      name: "year",
      title: "Year / Period",
      type: "string",
      description: 'e.g. "2023 - 2026" or "Oct 2023 - Present"',
      validation: (R: any) => R.required(),
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (R: any) => R.required(),
    },
    {
      name: "subtitle",
      title: "Subtitle / Institution",
      type: "string",
      validation: (R: any) => R.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (R: any) => R.required(),
    },
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
};
