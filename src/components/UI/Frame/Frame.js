import React from 'react';

import styles from './Frame.module.css';

function Frame(props) {
    return <div className={styles.Frame}>{props.children}</div>
}

export default Frame;