import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dhaesha Myers | Full Stack Developer & Cloud Engineer",
  description:
    "Passionate Full Stack Developer and Cloud Engineer specializing in React, Node.js, Python, AWS and Kubernetes. Building scalable web applications and robust cloud infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
