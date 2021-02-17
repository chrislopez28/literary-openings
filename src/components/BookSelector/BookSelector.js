import React from 'react';
import styles from './BookSelector.module.css';

export default function BookSelector(props) {
    let selectorArr = props.openings.map((book, index) => {
      return <option value={index} key={index}>{book.title}</option>
    })

    return (
      <div className={styles.BookSelector}>
        <select onChange={props.onChange} defaultValue={props.defaultValue}>
          {selectorArr}
        </select>
      </div>
    )
  }