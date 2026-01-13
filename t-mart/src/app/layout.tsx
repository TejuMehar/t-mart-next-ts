import type { Metadata } from "next";
import "./globals.css";
import Provider from "./Provider";

export const metadata: Metadata = {
  title: "T-Mart | 10 min grocery Delivery App",
  description: "10 min grocery Delivery App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-full min-h-screen bg-gradient-to-b from-green-300 to-white">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
