import "./globals.css";
import { Toaster } from "react-hot-toast";
import  AuthProvider from "./context/authContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
