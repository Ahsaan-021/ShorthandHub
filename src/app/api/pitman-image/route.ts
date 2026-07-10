import { NextResponse } from "next/server";

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
    });

    const html = await res.text();

    // Extract tempdir from the HTML: value="21443"> in <INPUT NAME="TEMPDIR"
    const tempdirMatch = html.match(/<INPUT\s+NAME="TEMPDIR"\s+(?:TYPE="HIDDEN"\s+)?SIZE="\d+"\s+VALUE="(\d+)">/i);
    if (!tempdirMatch) {
      return NextResponse.json({ error: "Could not extract tempdir from steno server response" }, { status: 502 });
    }

    const tempdir = tempdirMatch[1];

    // The GIF URL pattern: catgif.php?FN=/temp/Suetterlin/{tempdir}/BODY.1.gif
    const gifUrl = `https://steno.tu-clausthal.de/catgif.php?FN=/temp/Suetterlin/${tempdir}/BODY.1.gif`;

    // Fetch the GIF and return it
    const gifRes = await fetch(gifUrl);
    if (!gifRes.ok) {
      return NextResponse.json({ error: `Failed to fetch GIF: ${gifRes.status}` }, { status: 502 });
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
