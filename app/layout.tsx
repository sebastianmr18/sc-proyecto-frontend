import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import styles from "@/styles/layout.module.css";

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
        <div className={styles.container}>
          <Header />
          <main className={styles.content}>{children}</main>
          <Footer/>
        </div>
      </body>
    </html>
  );
}
