import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "UV-Indekset.dk",
  description: "Se UV-indeks nær dig i dag og i morgen",
};

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description}></meta>
        <script 
          async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1501562642966955"
          crossorigin="anonymous"
        ></script>
      </Head>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
