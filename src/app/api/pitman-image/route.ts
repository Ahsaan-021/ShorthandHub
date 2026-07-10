import { NextResponse } from "next/server";

export const runtime = "nodejs";

const STENO_URL = "https://steno.tu-clausthal.de/Pitman.php";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text") ?? "";

  if (!text.trim()) {
    return NextResponse.json({ error: "text query param required" }, { status: 400 });
  }

  try {
    const body = new URLSearchParams();
    body.set("Input", text.trim());
    body.set("Proof", "7");
    body.set("DIR", "Pitman");

    const res = await fetch(STENO_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded; charset=ISO-8859-1" },
      body: body.toString(),
      cache: "no-store",
    });

    const html = await res.text();

    // Extract tempdir: <INPUT NAME="TEMPDIR" ... VALUE="12345">
    const m = html.match(/TEMPDIR[^>]+VALUE\s*=\s*"(\d+)"/i);
    if (!m) {
      return NextResponse.json({ error: "No tempdir found", snippet: html.slice(0, 2000) }, { status: 502 });
    }

    const tempdir = m[1];
    const gifUrl = `https://steno.tu-clausthal.de/catgif.php?FN=/temp/Suetterlin/${tempdir}/BODY.1.gif`;

    const gifRes = await fetch(gifUrl, { cache: "no-store" });
    if (!gifRes.ok) {
      return NextResponse.json({ error: `GIF fetch failed: ${gifRes.status}` }, { status: 502 });
    }

    const gifBuffer = await gifRes.arrayBuffer();

    return new NextResponse(gifBuffer, {
      headers: {
        "Content-Type": "image/gif",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
