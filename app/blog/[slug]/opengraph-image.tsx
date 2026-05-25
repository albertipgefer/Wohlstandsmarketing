import { ImageResponse } from "next/og";
import { getPost } from "@/content/blog";

export const runtime = "edge";
export const alt = "Wohlstandsmarketing Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.meta.title ?? "Wohlstandsmarketing Blog";
  const category = post?.meta.category ?? "Insights";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #fafafa 0%, #ffffff 60%, #eef4ff 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "#1663de",
                color: "white",
                fontSize: 26,
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              W
            </div>
            <span
              style={{ fontSize: 20, fontWeight: 600, color: "#0a0a0a" }}
            >
              Wohlstandsmarketing Blog
            </span>
          </div>
          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#1663de",
              background: "rgba(22,99,222,0.08)",
              padding: "10px 20px",
              borderRadius: 999,
              border: "1px solid rgba(22,99,222,0.25)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {category}
          </span>
        </div>

        <div
          style={{
            fontSize: title.length > 80 ? 54 : 64,
            fontWeight: 900,
            color: "#0a0a0a",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            maxWidth: 1056,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 22, color: "#52525b" }}>
            Albert Ipgefer · wohlstandsmarketing.de
          </span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#1663de",
            }}
          >
            wohlstandsmarketing.de/blog
          </span>
        </div>
      </div>
    ),
    size
  );
}
