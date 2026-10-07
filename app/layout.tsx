import type { Metadata, Viewport } from "next";
import { Cinzel, Dancing_Script, EB_Garamond } from "next/font/google";
import localFont from "next/font/local";
import { continut } from "./continut";
import "./globals.css";

// Font în stil Disney — fără ă/ș/ț, de aceea titlurile din intro nu au diacritice
const disney = localFont({
  src: "./fonts/waltograph.woff2",
  variable: "--f-disney",
  display: "block",
});

// Scrisul de mână romantic din titluri — ales să fie ușor de citit
const script = Dancing_Script({
  subsets: ["latin", "latin-ext"],
  variable: "--f-script",
});

const serif = EB_Garamond({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--f-serif",
});

const caps = Cinzel({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  variable: "--f-caps",
});

export const metadata: Metadata = {
  title: `Pentru ${continut.ea} ❤`,
  description: "A fost odată ca niciodată... o poveste scrisă doar pentru tine.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050f36",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ro"
      className={`${disney.variable} ${script.variable} ${serif.variable} ${caps.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
