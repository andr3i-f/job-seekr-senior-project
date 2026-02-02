import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar/NavBar";
import { Box } from "@mui/material";
import { getUserInfo } from "@/lib/auth/actions";
import { UserProvider } from "@/components/providers/UserProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "jobseekr.",
  description: "Job locating service",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserInfo();

  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider clientId="804210602803-b2stb0611i3443i5cenjji597tc9dd3a.apps.googleusercontent.com">
          <UserProvider value={user}>
            <Box
              sx={{ background: "linear-gradient(180deg, #2C1D68, #5638CE)" }}
            >
              <NavBar />
              {children}
            </Box>
          </UserProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
