import { Head } from "./head";
import React from "react";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col h-screen">
      <Head />
      <main className="light container mx-auto max-w-7xl px-6 flex-grow">{children}</main>
      <footer className="w-full flex items-center justify-center py-3"></footer>
    </div>
  );
}
