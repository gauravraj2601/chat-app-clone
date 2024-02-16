
import { Inter } from "next/font/google";
import { ChakraProvider } from '@chakra-ui/react'; 
import "./globals.css";
import { AuthProvider } from "./auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata={
  title: "Chat App",
  description: "This is a chat messenger clone",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
      </ChakraProvider>
         </body>
    </html>
  );
}
