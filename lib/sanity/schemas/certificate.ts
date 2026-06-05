/* eslint-disable @typescript-eslint/no-explicit-any */
export const certificateSchema = {
  name: "certificate",
  title: "Certificate",
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
      name: "issuer",
      title: "Issuer",
      type: "string",
      validation: (R: any) => R.required(),
    },
    {
      name: "credentialId",
      title: "Credential ID",
      type: "string",
    },
    {
      name: "image",
      title: "Certificate Image",
      type: "image",
      options: { hotspot: true },
    },
    { name: "redirectUrl", title: "Redirect URL", type: "url" },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Certification", value: "certification" },
          { title: "Award", value: "award" },
          { title: "Participation", value: "participation" },
        ],
        layout: "radio",
      },
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
