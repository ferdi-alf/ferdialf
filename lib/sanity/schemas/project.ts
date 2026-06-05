/* eslint-disable @typescript-eslint/no-explicit-any */

export const projectSchema = {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "order",
      title: "Display Order",
      type: "number",
      validation: (R: any) => R.required().min(0),
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (R: any) => R.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (R: any) => R.required(),
    },
    {
      name: "image",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    },
    {
      name: "isOpenSource",
      title: "Open Source?",
      type: "boolean",
      initialValue: true,
    },
    { name: "githubUrl", title: "GitHub URL", type: "url" },
    { name: "liveUrl", title: "Live URL", type: "url" },
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
};
