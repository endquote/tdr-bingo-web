import { Provider } from "jotai";
import type { AppProps } from "next/app";
import { Analytics } from "../components/Analytics";
import { SiteHead } from "../components/SiteHead";
import "../styles/globals.css";
import styles from "../styles/Home.module.css";
import { useWindowSize } from "../util/useWindowSize";

export default function App({ Component, pageProps }: AppProps) {
  // filling the window cross browser and on mobile with just css is basically impossible
  const size = useWindowSize();

  return (
    <Provider>
      <SiteHead />
      <div
        className={styles.container}
        style={{ width: size.width, height: size.height }}
      >
        <main className={styles.main}>
          <Component {...pageProps} />
        </main>
      </div>
      <Analytics />
    </Provider>
  );
}
