import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "شيّك - CHECK | شيّك قبل تروح",
  description: "تطبيق شيّك يساعدك على معرفة حالة الكوفيهات والمطاعم قبل الذهاب - تحديثات فورية كل دقيقتين",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet" />
        {/* Disable notification prompts */}
        <meta name="notification" content="disabled" />
      </head>
      <body className="font-sans antialiased" style={{ position: 'relative', zIndex: 0 }}>
        {children}
      </body>
    </html>
  );
}
