export interface PreparedImage {
  base64: string; // no "data:" prefix
  mediaType: "image/jpeg";
  previewUrl: string; // data URL for the thumbnail
}

const MAX_SIDE = 1024;

export async function prepareImage(file: File): Promise<PreparedImage> {
  // imageOrientation applies EXIF rotation so phone photos aren't sideways
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });

  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
  return {
    base64: dataUrl.split(",")[1],
    mediaType: "image/jpeg",
    previewUrl: dataUrl,
  };
}