import {
  Geist,
  Geist_Mono,
  Noto_Nastaliq_Urdu,
  Noto_Naskh_Arabic,
  Space_Grotesk,
  DM_Sans,
} from "next/font/google";
// English fonts (existing using next/font/google)

export const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans-next",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono-next",
});


// Space Grotesk
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk-next",
  display: "swap",
});

// DM Sans
export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans-next",
  display: "swap",
});


// Urdu font - Noto Nastaliq Urdu for Urdu language
export const urduFont = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-urdu-next",
  display: "swap",
});

// Arabic font - Noto Naskh Arabic for Arabic language
export const arabicFont = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic-next",
  display: "swap",
});
