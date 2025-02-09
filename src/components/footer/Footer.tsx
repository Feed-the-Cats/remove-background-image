import { FC, JSX } from "react";
import styles from "./footer.module.css";

const Footer: FC = (): JSX.Element => {
  return (
    <div className={styles.footer}>
      <h3 className={styles.titleH3}>Remove backround image</h3>
      <div>
        <p className={styles.paragraphe}>
          Process :{" "}
          <a
            className={styles.link}
            href="https://github.com/imgly/background-removal-js"
            target="_blank"
          >
            IMG.LY remove backround image
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
