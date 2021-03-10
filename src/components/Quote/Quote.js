import React, { useState } from "react";

import styles from "./Quote.module.css";

import Frame from "../UI/Frame/Frame";

function Quote(props) {
  let translation = null;
  const [showTranslation, setShowTranslation] = useState(false);

  if (props.work.translation) {
    translation = (
      <>
        <br />
        <br />
        <button onClick={() => setShowTranslation(!showTranslation)}>
          {showTranslation ? <>Hide Translation</> : <>Show Translation</>}
        </button>
        <br />
        <br />
        {showTranslation ? <div>{props.work.translation}</div> : null}
      </>
    );
  }

  let classes = [styles.Quote];

  switch (props.work.type) {
    case "verse":
      styles.push(styles.Verse);
      break;
    default:
      break;
  }

  return (
    <div className={classes.join(" ")}>
      <Frame>
        <div>
          <blockquote>
            {props.children}
            {translation}
          </blockquote>
        </div>
      </Frame>
    </div>
  );
}

export default Quote;
