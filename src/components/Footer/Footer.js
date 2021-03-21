import React, { useEffect, useState } from "react";

import styles from "./Footer.module.css";

export default function Footer() {
  const [numBooks, setNumBooks] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8000/books/count")
      .then((res) => res.json())
      .then((data) => {
        setNumBooks(data["numBooks"]);
      })
      .catch((err) => console.log(err));
  });

  return (
    <div className={styles.Footer}>
      <p style={{ textAlign: "center" }}>
        <div>
          <p>
            <p>There are {numBooks} books in the library.</p>
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
