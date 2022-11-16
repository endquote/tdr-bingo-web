import { Provider } from "jotai";
import type { AppProps } from "next/app";
import { Analytics } from "../components/Analytics";
import { SiteHead } from "../components/SiteHead";
import "../styles/globals.css";
import styles from "../styles/Home.module.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <SiteHead />
      <div className={styles.container}>
        <main className={styles.main}>
          <Component {...pageProps} />
        </main>
      </div>
      <Analytics />
    </Provider>
  );
}
