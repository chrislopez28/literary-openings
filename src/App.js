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

import Quote from './components/Quote/Quote';

function App() {
  let openings = require("./books.json");

  function refreshPage() {
    window.location.reload(false);
  }

  const randomNum = Math.floor(Math.random() * openings.length);

  const [choice, setChoice] = useState('');
  const [term, setTerm] = useState('');
  const [work, setWork] = useState(openings[randomNum]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const results = useBookMatch(term);

  const handleChange = (event) => {
    const updatedTerm = event.target.value;
    setTerm(updatedTerm);
  }

  // const datalist = openings.map(book => {
  //   return <option value={book.title} key={book.title} />
  // })

  const comboboxOptions = openings.map(book => {
    return <ComboboxOption key={book.title} value={`${book.title} - ${book.author}`}></ComboboxOption>
  })

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

  let answer = null;
  if (isSubmitted) {
    let correct = choice === `${work.title} - ${work.author}`;
    answer = (correct ? <h2>Correct!</h2> : <h2>Incorrect.</h2>)
  }

  return (
    <div className="App">
      <h1>Literary Openings</h1>
      <p>
        Below is the opening line of a literary work. Can you name where it's from?
      </p>
      <Quote>
        {work.opening}
      </Quote>

      {/* <div>
        <label htmlFor="answer">Answer:</label><br />
        <input list="answers" name="answers" id="answer" />
        <datalist id="answers">
          {datalist}
        </datalist>
      </div>
      <br /> */}

      <Combobox aria-label="choose a fruit" openOnFocus onSelect={(value) => setChoice(value)}>
        <ComboboxInput onChange={handleChange} style={{ width: "300px" }} />
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
                <span style={{ display: "block", margin: 8 }}>
                  No results found
                </span>
              )}
          </ComboboxPopover>
        )}
      </Combobox>
      <br />

      {/* <p>
        Result: {results}
      </p> */}

      <button onClick={() => setIsSubmitted(true)}>Submit</button>
      <br />
      <hr />
      { answer}
      <button onClick={refreshPage}>Refresh Page</button>
    </div>
  );
}

export default App;
