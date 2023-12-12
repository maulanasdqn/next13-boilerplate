import type { Metadata } from "next";
import { AuthProvider, QueryProvider } from "@/libs";
import { Inter } from "next/font/google";
import { FC, PropsWithChildren, ReactElement } from "react";
import { Maintenance } from "@/modules";
import "@/styles/global.css";

const inter = Inter({ subsets: ["latin"] });

const description = "NextJS 14 Boilerplate";

export const metadata: Metadata = {
  title: "NextJS 14 Boilerplate",
  description,
  icons: {
    icon: "/icon.png",
  },
  keywords: ["boilerplate", "NextJS14", "NodeJS", "Frontend", "React", "TRPC", "Drizzle"],
};

const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "1";

const RootLayout: FC<PropsWithChildren> = ({ children }): ReactElement => {
  return (
    <html lang="en">
      <body className={inter.className}>
        {isMaintenance ? (
          <Maintenance />
        ) : (
          <AuthProvider>
            <QueryProvider>{children}</QueryProvider>
          </AuthProvider>
        )}
      </body>
    </html>
  );
};

export default RootLayout;
