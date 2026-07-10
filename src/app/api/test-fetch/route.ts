export const runtime = "nodejs";

export async function GET() {
  try {
    const res = await fetch("https://steno.tu-clausthal.de/Pitman.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "Input=hello+world&Proof=7&DIR=Pitman",
      signal: AbortSignal.timeout(15000),
    });
    const text = await res.text();
    const m = text.match(/TEMPDIR[^>]+VALUE\s*=\s*"(\d+)"/i);
    return Response.json({
      status: res.status,
      tempdir: m ? m[1] : "not found",
      html_len: text.length,
      snippet: text.substring(0, 500),
    });
  } catch (e) {
    return Response.json({ error: String(e), name: (e as any).name }, { status: 500 });
  }
}
