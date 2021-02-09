import React, { useState } from 'react';

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
  const openings = [
    {
      title: "Paradise Lost",
      author: "John Milton",
      opening: "This First Book proposes, first in brief, the whole subject--Man's disobedience, and the loss thereupon of Paradise, wherein he was placed: then touches the prime cause of his fall--the Serpent, or rather Satan in the Serpent; who, revolting from God, and drawing to his side many legions of Angeles, was, by the command of God, driven out of Heaven, with all his crew, into the great Deep."
    },
    {
      title: "Wuthering Heights",
      author: "Emily Bronte",
      opening: "1801--I have just returned from a visit to my landlord--the solitary neighbour that I shall be troubled with."
    }, 
    {
      title: "Jane Eyre",
      author: "Charlotte Bronte",
      opening: "There was no possibility of taking a walk that day."
    },
    {
      title: "Great Expectations",
      author: "Charles Dickens",
      opening: "My father's family name being Pirrip, and my christian name Phillip, my infant tongue could make of both names nothing longer or more explicit than Pip."
    },
    {
      title: "Pride & Prejudice",
      author: "Jane Austen",
      opening: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife."
    },
    {
      title: "Sense and Sensibility",
      author: "Jane Austen",
      opening: "The family of Dashwood had been long settled in Sussex."
    },
    {
      title: "Persuasion",
      author: "Jane Austen",
      opening: "Sir Walter Elliot, of Kellynch-hall, in Somersetshire, was a man who, for his own amusement, never took up any book but the Baronetage; there he found occupation for an idle hour, and consolation in a distressed one; there his faculties were roused into admiration and respect, by contemplating the limiting remnant of the earliest patents; there any unwelcome sensations, arising from domestic affairs, changed naturally into pity and contempt, as he turned over the almost endless creations of the last century - and there, if every other leaf were powerless, he could read his own history with an interest which never failed - this was the page at which the favourite volume always opened: ELLIOT of KELLYNCH-HALL."
    },
    {
      title: "The Scarlet Letter",
      author: "Nathaniel Hawthorne",
      opening: "A throng of bearded men, in sad-colored garments, and gray, steeple-crowned hats, intermixed with women, some wearing hoods and others bareheaded, was assembled in front of a wooden edifice, the door of which was heavily timbered with oak, and studded with iron spikes."
    },
    {
      title: "Moby Dick",
      author: "Herman Melville",
      opening: "Call me Ishmael."
    },
    {
      title: "Tlön, Uqbar, Orbis Tertius",
      author: "Jorge Luis Borges",
      opening: "Debo a la conjunción de un espejo y de una enciclopedia el descubrimiento de Uqbar."
    },
    {
      title: "The Iliad",
      author: "Homer",
      opening: `μῆνιν ἄειδε θεὰ Πηληϊάδεω Ἀχιλῆος
      οὐλομένην, ἣ μυρί᾽ Ἀχαιοῖς ἄλγε᾽ ἔθηκε,
      πολλὰς δ᾽ ἰφθίμους ψυχὰς Ἄϊδι προΐαψεν
      ἡρώων, αὐτοὺς δὲ ἑλώρια τεῦχε κύνεσσιν
      οἰωνοῖσί τε πᾶσι, Διὸς δ᾽ ἐτελείετο βουλή,
      ἐξ οὗ δὴ τὰ πρῶτα διαστήτην ἐρίσαντε
      Ἀτρεΐδης τε ἄναξ ἀνδρῶν καὶ δῖος Ἀχιλλεύς.`
    }
  ]



  function refreshPage() {
    window.location.reload(false);
  }

  const randomNum = Math.floor(Math.random() * openings.length);

  const [choice, setChoice] = useState('');
  const [work, setWork] = useState(openings[randomNum]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const updatedChoice = event.target.value;
    setChoice(updatedChoice);
  } 

  // const datalist = openings.map(book => {
  //   return <option value={book.title} key={book.title} />
  // })

  const comboboxOptions = openings.map(book => {
    return <ComboboxOption key={book.title} value={`${book.title} - ${book.author}`}></ComboboxOption>
  })

  let answer = null;
  if (isSubmitted) {
    let correct = choice === `${work.title} - ${work.author}`;
    answer = (correct ? <p>Correct!</p> : <p>Incorrect.</p>)
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
        <ComboboxInput style={{width: "300px"}} />
        <ComboboxPopover>
          <ComboboxList>
            {comboboxOptions}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
      <br />

      <button onClick={() => setIsSubmitted(true)}>Submit</button>
      <br />
      <hr />
      { answer }
      <button onClick={refreshPage}>Refresh Page</button>
    </div>
  );
}

export default App;
