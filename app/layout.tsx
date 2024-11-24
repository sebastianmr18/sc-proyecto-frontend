import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header";
import "@/public/styles/globals.css";
import styles from "@/public/styles/layout.module.css";
import { AuthProvider } from "@/app/_context/authContext";
import { RedirectProvider } from "@/app/_context/redirectContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <AuthProvider>
          <RedirectProvider>
          <div className={styles.container}>
            <Header />
            <main className={styles.content}>{children}</main>
            <Footer/>
          </div>
          </RedirectProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
