import LeftSideHeader from "@/components/LeftSideHeader";
import TopHeader from "@/components/TopHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white pb-16">
      <TopHeader />
      <div className="flex">
        <div className="w-1/6" >
          <LeftSideHeader />
        </div>
        <div className="w-5/6">{children}</div>
      </div>
    </div>
  );
}
