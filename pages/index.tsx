import dynamic from "next/dynamic";
import { SiteHead } from "../components/SiteHead";
import styles from "../styles/Home.module.css";

const Pyramid = dynamic(() => import("../components/Pyramid"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className={styles.container}>
      <SiteHead />
      <main className={styles.main}>
        <Pyramid onMapClick={(c) => console.log(c)} />
      </main>
    </div>
  );
}
