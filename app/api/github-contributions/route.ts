const GITHUB_USERNAME = "frgnc-subash";
const UPSTREAM_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;
const REVALIDATE_SECONDS = 3600;

export const revalidate = REVALIDATE_SECONDS;

export async function GET() {
  try {
    const upstream = await fetch(UPSTREAM_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!upstream.ok) {
      return Response.json(
        { error: "Failed to load GitHub activity." },
        { status: 502 },
      );
    }

    const data = await upstream.json();

    return Response.json(data, {
      headers: {
        "Cache-Control": `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=86400`,
      },
    });
  } catch {
    return Response.json(
      { error: "Failed to load GitHub activity." },
      { status: 502 },
    );
  }
}
