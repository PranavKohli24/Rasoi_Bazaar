export interface PreparedImage {
  base64: string; // no "data:" prefix
  mediaType: "image/jpeg";
  previewUrl: string; // object URL: the caller must URL.revokeObjectURL() it
}

/** An error whose message is safe to show to the user. */
export class PhotoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PhotoError";
  }
}

const MAX_SIDE = 1280;
// Best quality first; step down only if the upload would be too big.
const JPEG_QUALITIES = [0.88, 0.78, 0.65];
const MAX_UPLOAD_BYTES = 1_600_000;
const MAX_FILE_BYTES = 30 * 1024 * 1024;

const UNREADABLE = "Couldn't read that photo. Try taking a new one, or type the dish name.";

interface Decoded {
  source: CanvasImageSource;
  width: number;
  height: number;
  release: () => void;
}

// createImageBitmap is fastest, but older Safari versions reject its options,
// so fall back to a plain <img>. Both apply the photo's EXIF rotation.
async function decode(file: File): Promise<Decoded> {
  if (typeof createImageBitmap === "function") {
    try {
      const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
      return {
        source: bitmap,
        width: bitmap.width,
        height: bitmap.height,
        release: () => bitmap.close(), // safe to call more than once
      };
    } catch {
      /* fall through to <img> */
    }
  }

  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.decoding = "async";
    img.src = url;
    await img.decode();
    return {
      source: img,
      width: img.naturalWidth,
      height: img.naturalHeight,
      release: () => {
        img.src = "";
      },
    };
  } finally {
    URL.revokeObjectURL(url);
  }
}

const toBlob = (canvas: HTMLCanvasElement, quality: number): Promise<Blob> =>
  new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("encode failed"))),
      "image/jpeg",
      quality
    )
  );

const blobToBase64 = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });

export async function prepareImage(file: File): Promise<PreparedImage> {
  if (!file.type.startsWith("image/")) {
    throw new PhotoError("That file isn't a photo. Please pick an image.");
  }
  if (file.size > MAX_FILE_BYTES) {
    throw new PhotoError("That photo is too large. Try a smaller one.");
  }

  let decoded: Decoded | null = null;
  const canvas = document.createElement("canvas");

  try {
    try {
      decoded = await decode(file);
    } catch {
      // Most often a HEIC photo the browser can't open
      throw new PhotoError(UNREADABLE);
    }

    const longSide = Math.max(decoded.width, decoded.height);
    if (!longSide) throw new PhotoError(UNREADABLE);

    const scale = Math.min(1, MAX_SIDE / longSide);
    canvas.width = Math.max(1, Math.round(decoded.width * scale));
    canvas.height = Math.max(1, Math.round(decoded.height * scale));

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new PhotoError(UNREADABLE);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high"; // less jagged and blurry when shrinking big photos
    ctx.drawImage(decoded.source, 0, 0, canvas.width, canvas.height);

    // Free the full-size pixels now, before the (async) encoding below
    decoded.release();

    let blob = await toBlob(canvas, JPEG_QUALITIES[0]);
    for (const quality of JPEG_QUALITIES.slice(1)) {
      if (blob.size <= MAX_UPLOAD_BYTES) break;
      blob = await toBlob(canvas, quality);
    }

    const base64 = await blobToBase64(blob);
    if (!base64) throw new PhotoError(UNREADABLE);

    return {
      base64,
      mediaType: "image/jpeg",
      previewUrl: URL.createObjectURL(blob),
    };
  } catch (error) {
    throw error instanceof PhotoError ? error : new PhotoError(UNREADABLE);
  } finally {
    decoded?.release();
    // iOS Safari keeps a canvas's memory until it is shrunk to nothing
    canvas.width = 0;
    canvas.height = 0;
  }
}