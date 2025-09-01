import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import {HeaderComponent} from "@/components/header/HeaderComponent.tsx";

export const metadata: Metadata = {
  title: "KinoLand"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <div className="root">
              <HeaderComponent/>
              <main>
                  {children}
              </main>
          </div>
      </body>
    </html>
  );
}
