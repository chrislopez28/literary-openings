import React, { useEffect, useState } from "react";
import { matchSorter } from "match-sorter";
import { useSetState, useThrottle } from "react-use";

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

function App() {
  function refreshPage() {
    if (choice === `${book.title} by ${book.author}`) {
      setCorrectCount(correctCount + 1);
    }
    setChoice("");
    setGameCount(gameCount + 1);
    setSearchTerm("");
    setBook(null);
    setIsSubmitted(false);
    window.scrollTo(0, 0);
  }

  const [book, setBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [choice, setChoice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [gameCount, setGameCount] = useState(1);
  const [correctCount, setCorrectCount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const updatedTerm = event.target.value;
    setSearchTerm(updatedTerm);
  };

  useEffect(() => {
    fetch("http://localhost:8000/books/list")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/books/random")
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [gameCount]);

  function useBookMatch(searchTerm) {
    const throttledTerm = useThrottle(searchTerm, 100);
    return React.useMemo(
      () =>
        searchTerm.trim() === ""
          ? null
          : matchSorter(books, searchTerm, {
              keys: [(book) => `${book.title}, ${book.author}`],
            }),
      [throttledTerm]
    );
  }

  // const handleSelector = (event) => {
  //   let newRandomNum = event.target.value;
  //   setRandomNum(newRandomNum);
  //   setWork(openings[newRandomNum]);
  // };

  const submitHandler = () => {
    setIsSubmitted(true);
    // document.getElementById("answer").scrollIntoView({ behavior: 'smooth' });
    window.scrollTo(0, 0);
  };

  const results = useBookMatch(searchTerm);

  let answer = null;
  if (isSubmitted) {
    answer = (
      <Answer
        work={book}
        isCorrect={choice === `${book.title} by ${book.author}`}
        refreshPage={refreshPage}
      />
    );
  }

  function AnswerPage() {
    return (
      <div className={styles.App}>
        <a href="/" style={{ textDecoration: "none", color: "black" }}>
          <h1>Literary Openings</h1>
        </a>
        <div id="answer">{answer}</div>
      </div>
    );
  }

  return !isSubmitted ? (
    <div className={styles.App}>
      <a href="/" style={{ textDecoration: "none", color: "black" }}>
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
      <hr />

      {/* <BookSelector onChange={handleSelector} defaultValue={7} books={books} /> */}

      {book ? (
        <Quote work={book}>{book.opening}</Quote>
      ) : (
        <div className={styles.loader}>...Loading</div>
      )}

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
