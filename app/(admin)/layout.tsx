import { Geist, Geist_Mono } from "next/font/google";
import LeftSideHeader from "@/components/LeftSideHeader";
import TopHeader from "@/components/TopHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}> {/* Add pt-[70px] if needed for admin */}
        <div className="min-h-screen bg-white pb-16">
          <TopHeader />
          <div className="flex">
            <div className="w-1/6" >
              <LeftSideHeader />
            </div>
            <div className="w-5/6">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
