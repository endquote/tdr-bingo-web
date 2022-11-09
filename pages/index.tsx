import dynamic from "next/dynamic";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Pyramid = dynamic(() => import("../components/Pyramid"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>tdrbingo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Pyramid onMapClick={(c) => console.log(c)} />
      </main>
    </div>
  );
}
