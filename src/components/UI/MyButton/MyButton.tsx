import React from 'react';

import styles from "./MyButton.module.scss"

interface MyButtonProps {
    children: React.ReactNode;
    click?: (...args:any[])=>any;
}

const MyButton = ({children, click}:MyButtonProps) => {
    return (
        <button className={styles.button} onClick={click}>
            {children}
        </button>
    );
};

export default MyButton;