import { getServerSession } from "@/lib/session";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const session = await getServerSession();

  if (!session) {
    const loginUrl = new URL("/login", process.env.BETTER_AUTH_URL || "http://localhost:3000");
    loginUrl.searchParams.set("redirect", "/study");
    return NextResponse.redirect(loginUrl);
  }

  // Read the study HTML file
  const filePath = path.join(process.cwd(), "study.html");
  let html: string;
  try {
    html = fs.readFileSync(filePath, "utf-8");
  } catch {
    return new NextResponse("Study content not found", { status: 404 });
  }

  // Inject a banner indicating the user is authenticated
  const banner = `
    <div style="
      position: fixed; top: 0; left: 0; right: 0; z-index: 9999;
      background: hsl(142 76% 36%); color: white;
      text-align: center; padding: 0.375rem 1rem;
      font-size: 0.75rem; font-family: 'Instrument Sans', system-ui, sans-serif;
    ">
      Signed in as ${session.user.email || session.user.name || "user"}
      — <a href="/dashboard" style="color:white;text-decoration:underline;">Dashboard</a>
    </div>
  `;

  // Insert banner after <body> (data-theme="blue")
  html = html.replace('<body>', `<body data-theme="blue">\n${banner}`);

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
