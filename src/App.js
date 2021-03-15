import React, { useState } from "react";
import { matchSorter } from "match-sorter";
import { useThrottle } from "react-use";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import "./App.css";
import styles from "./App.module.css";

import Answer from "./components/Answer/Answer";
import BookSelector from "./components/BookSelector/BookSelector";
import Button from "./components/UI/Button/Button";
import Quote from "./components/Quote/Quote";

function App({ openings }) {
  function refreshPage() {
    window.location.reload(false);
    window.scrollTo(0, 0);
  }

  const [randomNum, setRandomNum] = useState(
    Math.floor(Math.random() * openings.length)
  );
  const [choice, setChoice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [work, setWork] = useState(openings[randomNum]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const results = useBookMatch(searchTerm);

  const handleChange = (event) => {
    const updatedTerm = event.target.value;
    setSearchTerm(updatedTerm);
  };

  function useBookMatch(searchTerm) {
    const throttledTerm = useThrottle(searchTerm, 100);
    return React.useMemo(
      () =>
        searchTerm.trim() === ""
          ? null
          : matchSorter(openings, searchTerm, {
              keys: [(opening) => `${opening.title}, ${opening.author}`],
            }),
      [throttledTerm]
    );
  }

  const handleSelector = (event) => {
    let newRandomNum = event.target.value;
    setRandomNum(newRandomNum);
    setWork(openings[newRandomNum]);
  };

  const submitHandler = () => {
    setIsSubmitted(true);
    // document.getElementById("answer").scrollIntoView({ behavior: 'smooth' });
    window.scrollTo(0, 0);
  };

  let answer = null;
  if (isSubmitted) {
    answer = (
      <Answer
        work={work}
        isCorrect={choice === `${work.title} by ${work.author}`}
        refreshPage={refreshPage}
      />
    );
  }

  function AnswerPage() {
    return (
      <div className={styles.App}>
        <a href="" style={{ textDecoration: "none", color: "black" }}>
          <h1>Literary Openings</h1>
        </a>
        <div id="answer">{answer}</div>
      </div>
    );
  }

  return !isSubmitted ? (
    <div className={styles.App}>
      <a href="" style={{ textDecoration: "none", color: "black" }}>
        <h1>Literary Openings</h1>
      </a>
      <div className={styles.Center}>
        <p className={styles.Center}>
          Below are the opening line(s) of a{" "}
          <span
            style={{ color: "brown" }}
            title="Could be fiction or non-fiction. Types of works include novels, plays, treatises, or poems."
          >
            literary work
          </span>
          . Can you name where it's from?
        </p>
      </div>

      <BookSelector
        onChange={handleSelector}
        defaultValue={randomNum}
        openings={openings}
      />

      <Quote work={work}>{work.opening}</Quote>

      <br />
      <hr />
      <h3 className={styles.Center}>Type in and select your answer below:</h3>

      <div className={styles.ComboboxContainer}>
        <Combobox
          aria-label="choose a literary work"
          openOnFocus
          onSelect={(value) => setChoice(value)}
        >
          <ComboboxInput disabled={isSubmitted} onChange={handleChange} />
          {results && (
            <ComboboxPopover>
              {results.length > 0 ? (
                <ComboboxList>
                  {results.slice(0, 10).map((result, index) => (
                    <ComboboxOption
                      key={index}
                      value={`${result.title} by ${result.author}`}
                    />
                  ))}
                </ComboboxList>
              ) : (
                <p
                  style={{
                    margin: 0,
                    color: "#454545",
                    padding: "0.25rem 1rem 0.75rem 1rem",
                    fontStyle: "italic",
                  }}
                >
                  No results :(
                </p>
              )}
            </ComboboxPopover>
          )}
        </Combobox>
      </div>
      <br />
      <div className={styles.Center}>
        <Button disabled={!choice} onClick={submitHandler}>
          Submit
        </Button>
      </div>
    </div>
  ) : (
    <AnswerPage />
  );
}

export default App;
