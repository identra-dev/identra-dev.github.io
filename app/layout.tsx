import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Navbar } from "@/components/ui/Navbar";
import type { Metadata } from "next";
import { Geist, Ubuntu_Mono } from "next/font/google";
import "./globals.css";

/*
  Geist for display and body. Cluely's headline face is Forma DJR, which is a
  paid Type Network licence we can't ship, but Geist is the other sans they use
  and it's open — closest honest match.
  Ubuntu Mono stays for terminal/technical text: it's the product's own texture.
*/
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const ubuntuMono = Ubuntu_Mono({
  variable: "--font-ubuntu-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const description =
  "Identra runs every coding agent you already have — the real CLI, your config, your login — on one local desktop canvas, with a memory that compounds across agents and sessions.";

export const metadata: Metadata = {
  metadataBase: new URL("https://identra-dev.github.io"),
  title: "Identra — Your agents stop forgetting",
  description,
  openGraph: {
    title: "Identra — Your agents stop forgetting",
    description,
    url: "https://identra-dev.github.io",
    siteName: "Identra",
    images: [{ url: "/identra.png", width: 1600, height: 1600, alt: "Identra" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Identra — Your agents stop forgetting",
    description,
    images: ["/identra.png"],
  },
  icons: { icon: "/identra.svg", apple: "/identra.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Light-only site. No `dark` class, so shadcn/aceternity `dark:` variants
    // stay off and their light defaults apply; the palette comes from :root.
    <html lang="en">
      <body
        className={`${geist.variable} ${ubuntuMono.variable} antialiased bg-background text-foreground`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <Navbar />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
