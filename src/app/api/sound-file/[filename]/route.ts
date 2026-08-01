import fs from "fs";
import path from "path";
import { Readable } from "stream";
import { NextRequest } from "next/server";

const soundDir = path.join(process.cwd(), "content", "sound");

const ALLOWED_EXTENSIONS: Record<string, string> = {
  ".wav": "audio/wav",
  ".mp3": "audio/mpeg",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  // path.basename strips any directory segments; if that changes the
  // string, the input was trying to escape the sound directory.
  const safeName = path.basename(filename);
  if (safeName !== filename) {
    return new Response("Not found", { status: 404 });
  }

  const contentType = ALLOWED_EXTENSIONS[path.extname(safeName).toLowerCase()];
  if (!contentType) {
    return new Response("Not found", { status: 404 });
  }

  const filePath = path.join(soundDir, safeName);
  if (!filePath.startsWith(soundDir + path.sep) || !fs.existsSync(filePath)) {
    return new Response("Not found", { status: 404 });
  }

  const stat = fs.statSync(filePath);
  const range = request.headers.get("range");

  if (range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range);
    if (!match) {
      return new Response("Invalid range", { status: 416 });
    }

    const start = match[1] ? parseInt(match[1], 10) : 0;
    const end = match[2] ? parseInt(match[2], 10) : stat.size - 1;

    if (start > end || end >= stat.size) {
      return new Response("Invalid range", {
        status: 416,
        headers: { "Content-Range": `bytes */${stat.size}` },
      });
    }

    const stream = fs.createReadStream(filePath, { start, end });
    return new Response(Readable.toWeb(stream) as ReadableStream, {
      status: 206,
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(end - start + 1),
        "Content-Range": `bytes ${start}-${end}/${stat.size}`,
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  const stream = fs.createReadStream(filePath);
  return new Response(Readable.toWeb(stream) as ReadableStream, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Length": String(stat.size),
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
