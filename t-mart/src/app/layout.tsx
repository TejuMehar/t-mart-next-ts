import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "T-Mart | 10 min grocery Delivary App",
  description: " 10 min grocery Delivary App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full min-h-screen bg-gradient-to-b from-green-300 to-white">
        {children}
      </body>
    </html>
  );
}
