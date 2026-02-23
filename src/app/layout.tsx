import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { defaultMetadata } from "@/lib/metadata";
import { localBusinessSchema, organizationSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  ...defaultMetadata,
  verification: {
    google: 'hfZXnccNAuZ35Uev96WgtaeTW5Asusu9T9fN5rRLV_U',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StructuredData data={[localBusinessSchema, organizationSchema]} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
