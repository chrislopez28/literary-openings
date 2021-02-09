import React from 'react';

import styles from './Quote.module.css'

import Frame from '../UI/Frame/Frame';

function Quote(props) {
    return (
        <div className={styles.Quote}>
            <Frame>
                <p>
                    <i>
                        {props.children}
                    </i>
                </p>
            </Frame>
        </div>
    )
}

export default Quote;