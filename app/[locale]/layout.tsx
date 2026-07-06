import type { Metadata } from "next";
import "./globals.css";
import { getMessages } from "next-intl/server";
import { geistSans, geistMono, arabicFont, urduFont, dmSans, spaceGrotesk } from "@/lib/fonts/fonts";
import { NextIntlClientProvider } from "next-intl";
import { SmoothScrollProvider } from "./components/useLenis";

export const metadata: Metadata = {
  title: "Samurai Systems",
  description: "Your Trusted Partner inDigital Resilience & Innovation.",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  let messages: Record<string, unknown> = {};
  try {
    messages = await getMessages({ locale });
  } catch (e) {
    messages = {};
  }

  const isRtl = locale === "ur" || locale === "ar";

  // arabic ya urdu font ka taayun karna locale ki bunyaad par
  const rtlFont = locale === "ar" ? arabicFont : urduFont;

  const bodyClasses = isRtl
    ? `${locale === "ar" ? "font-arabic" : "font-urdu"} ${rtlFont.variable} ${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${dmSans.variable} antialiased`
    : `font-sans ${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${dmSans.variable} ${arabicFont.variable} antialiased`;


  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${dmSans.variable} ${arabicFont.variable} ${urduFont.variable} h-full antialiased`}
    >
      <body className={`${bodyClasses} min-h-full flex flex-col`}>
        <NextIntlClientProvider messages={messages}>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
