import { Metadata } from "next";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Main Layout",
  description: "Main section of the application",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Sidebar />
      <main className="flex-1 container mx-auto py-8 px-4">{children}</main>
    </div>
  );
}
