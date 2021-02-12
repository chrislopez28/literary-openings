import React, { useState } from 'react';
import { matchSorter } from 'match-sorter';
import { useThrottle } from 'react-use';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import './App.css';
import styles from './App.module.css';

import Footer from './components/Footer/Footer';
import Quote from './components/Quote/Quote';

function App() {
  let openings = require("./books.json");

  function refreshPage() {
    window.location.reload(false);
  }

  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * openings.length));
  const [choice, setChoice] = useState('');
  const [term, setTerm] = useState('');
  const [work, setWork] = useState(openings[randomNum]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const results = useBookMatch(term);

  const handleChange = (event) => {
    const updatedTerm = event.target.value;
    setTerm(updatedTerm);
  }

  function useBookMatch(term) {
    const throttledTerm = useThrottle(term, 100);
    return React.useMemo(
      () =>
        term.trim() === ""
          ? null
          : matchSorter(openings, term, {
            keys: [(opening) => `${opening.title}, ${opening.author}`],
          }),
      [throttledTerm]
    );
  }

  let selectorArr = openings.map((book, index) => {
    return <option value={index} key={index}>{book.title}</option>
  })
  const handleSelector = (event) => {
    let newRandomNum = event.target.value;
    setWork(openings[newRandomNum])
  }



  let answer = null;
  if (isSubmitted) {
    let correct = choice === `${work.title} by ${work.author}`;
    answer = (correct ? <h2>Correct!</h2> : <h2>Incorrect.</h2>)
  }

  console.log(work)

  return (
    <div className={styles.App}>
      <h1>Literary Openings</h1>
      <div className={styles.Center}>
        <p className={styles.Center}>
          Below are the opening line(s) of a literary work. Can you name where it's from?
            </p>
        <button onClick={refreshPage}>Refresh Quote</button>
      </div>

      {/* <div className={styles.Center}>
        <select onChange={handleSelector} defaultValue={randomNum}>
          {selectorArr}
        </select>
      </div> */}

      <Quote work={work}>
        {work.opening}
      </Quote>

      <br /><hr />
      <h3 className={styles.Center}>Type in and select your answer below:</h3>

      <div className={styles.ComboboxContainer}>
        <Combobox aria-label="choose a literary work" openOnFocus onSelect={(value) => setChoice(value)}>
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
        <button onClick={() => {
          setIsSubmitted(true);
          window.location.replace("/#answer")
        }
        }>Submit</button>
        <br />
        <div id="answer">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default App;
