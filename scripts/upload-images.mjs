// scripts/upload-images.mjs
import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-06-06",
  token: process.env.SANITY_API_TOKEN, // perlu token dengan role Editor
  useCdn: false,
});

const PROJECT_IMAGE_MAP = {
  "1.png": "project-1",
  "2.png": "project-2",
  "3.png": "project-3",
  "4.png": "project-4",
  "5.png": "project-5",
  "6.png": "project-6",
  "7.png": "project-7",
  "8.png": "project-8",
  "9.png": "project-9",
  "10.png": "project-10",
  "11.png": "project-11",
  "12.png": "project-12",
  "13.png": "project-13",
};

const CERTIFICATE_IMAGE_MAP = {
  "1.png": "certificate-1",
  "2.PNG": "certificate-2",
  "3.png": "certificate-3",
  "4.png": "certificate-4",
  "5.png": "certificate-5",
  "6.png": "certificate-6",
  "7.png": "certificate-7",
  "8.png": "certificate-8",
  "9.png": "certificate-9",
  "10.png": "certificate-10",
  "11.png": "certificate-11",
};

async function uploadImage(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const filename = path.basename(filePath);
  const ext = path.extname(filename).toLowerCase().replace(".", "");
  const mimeType = ext === "png" ? "image/png" : "image/jpeg";

  console.log(`  Uploading: ${filename}...`);

  const asset = await client.assets.upload("image", fileBuffer, {
    filename,
    contentType: mimeType,
  });

  return asset._id;
}

async function patchDocument(docId, assetId) {
  await client
    .patch(docId)
    .set({
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: assetId,
        },
      },
    })
    .commit();

  console.log(`  ✔ Patched document: ${docId}`);
}

async function processFolder(folderName, imageMap) {
  const folderPath = path.join(__dirname, "..", "public", "images", folderName);

  if (!fs.existsSync(folderPath)) {
    console.warn(`  ⚠ Folder not found: ${folderPath}`);
    return;
  }

  const files = fs.readdirSync(folderPath);

  for (const filename of files) {
    const docId = imageMap[filename];

    if (!docId) {
      console.warn(`  ⚠ No mapping found for: ${filename} — skipped`);
      continue;
    }

    const filePath = path.join(folderPath, filename);

    try {
      const assetId = await uploadImage(filePath);
      await patchDocument(docId, assetId);
    } catch (err) {
      console.error(`  ✖ Failed for ${filename}:`, err.message);
    }
  }
}

async function main() {
  console.log("=== Uploading project images ===");
  await processFolder("projects", PROJECT_IMAGE_MAP);

  console.log("\n=== Uploading certificate images ===");
  await processFolder("certificates", CERTIFICATE_IMAGE_MAP);

  console.log("\n✅ Done! All images uploaded and linked.");
}

main().catch(console.error);
