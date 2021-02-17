import Button from '../UI/Button/Button';
import Quote from '../Quote/Quote';

import styles from './Answer.module.css';

export default function Answer(props) {
    let result = null;
    let answerStyles = null;

    if (props.isDisplayed) {
        answerStyles = styles.di
    }

    result = (props.isCorrect ? <h2>Correct!</h2> : <h2>Incorrect</h2>)

    return (
        <div className={{}}>
            {result}
            <h3>{`${props.work.title} by ${props.work.author}`}</h3>
            <Quote work={props.work}>{props.work.opening}</Quote>
            <br />
            <hr />
            <br />
            <div style={{textAlign: 'center'}}>
                <Button onClick={props.refreshPage}>Next Quote</Button>
            </div>
        </div>
    )
}