import classNames from "classnames";
import { useAtom } from "jotai";
import styles from "./Overlay.module.css";
import { selectedAtom } from "./state";

export const Overlay = () => {
  const [selected, setSelected] = useAtom(selectedAtom);

  return (
    <div className={classNames(styles.overlay, selected ? styles.open : "")}>
      <button onClick={() => setSelected(false)} value="close">
        close
      </button>
    </div>
  );
};
