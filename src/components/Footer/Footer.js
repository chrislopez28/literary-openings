import React from "react";

import styles from "./Footer.module.css";

export default function Footer(props) {
  return (
    <div className={styles.Footer}>
      <p style={{ textAlign: "center" }}>
        <div>
          <p>
            <p>There are {props.numBooks} literary works in the library.</p>
          </p>
          <a
            className={styles.Link}
            href="https://github.com/chrislopez28/literary-openings"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          {" | "}
          <a
            className={styles.Link}
            href="https://chrislopez.page"
            target="_blank"
            rel="noopener noreferrer"
          >
            2021 Chris Lopez
          </a>
        </div>
      </p>
    </div>
  );
}
