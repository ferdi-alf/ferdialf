/* eslint-disable @typescript-eslint/no-explicit-any */
export const aboutSchema = {
  name: "about",
  title: "About",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      name: "journey",
      title: "Journey Checklist",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "text",
              title: "Text",
              type: "string",
              validation: (R: any) => R.required(),
            },
            {
              name: "done",
              title: "Done?",
              type: "boolean",
              initialValue: false,
            },
          ],
          preview: { select: { title: "text", subtitle: "done" } },
        },
      ],
    },
    {
      name: "socials",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              validation: (R: any) => R.required(),
            },
            {
              name: "href",
              title: "URL",
              type: "url",
              validation: (R: any) => R.required(),
            },
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    },
    {
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "value",
              title: "Value",
              type: "string",
              validation: (R: any) => R.required(),
            },
            {
              name: "unit",
              title: "Unit",
              type: "string",
              validation: (R: any) => R.required(),
            },
            { name: "sub", title: "Subtitle", type: "string" },
          ],
          preview: { select: { title: "value", subtitle: "unit" } },
        },
      ],
    },
  ],
};
